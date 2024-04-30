import { Injectable, OnInit } from '@angular/core';
import { Report } from './reportClass';
import { Subject,Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ReportService implements OnInit{
  //for emiting event across multiple components
  private eventSubject = new Subject<any>();
  private reportSubject = new Subject<Report[]>();
  private reportSubject2 = new Subject<string[]>();
  report:Report[];
  location:string[]
  lat:number
  long:number
  //create a blank reportList, fill it up later with the functions and the database
  //make it work locally before playing around with the database
  //This will pull info from database back into the list here and update from here
  constructor(private http: HttpClient ) {
    //create some fake data to test for now
    var response 
    this.report=[]
    this.fetch()
    this.fetchloc()
    //[
      // new Report("David", "Burnaby", -123.0076,49.2276, "none", "Peter", 123, "Chan"),
      // new Report("Shane", "Vancouver",-123.148155,49.300054,  "none", "Winnie", 123, "Chan"),
      // new Report("Anthony", "Vancouver",-122.9199, 49.2781, "none", "Edward", 123, "Not Chan"),
      // new Report("Felix", "Surrey", -123,49.2581,  "none", "David", 123, "FISH")
    //]
    //testing
    // this.report[3].status=false;
    //default value for places
    this.location=["Surrey","Vancouver","Burnaby","Richmond"]
    this.lat=0;
    this.long=0
   }
   fetch(){
    this.http.get('https://272.selfip.net/apps/kaWgmHTSzM/collections/reportData/documents/reports/')
      .subscribe((data: any) => {
        console.log(data);
        const response = data as { key: string, data: string };
        const dataString = response.data;
        this.report = JSON.parse(dataString);
        this.reportSubject.next(this.report);
        console.log(this.report);
      });
   }
   fetchloc(){
      this.http.get('https://272.selfip.net/apps/kaWgmHTSzM/collections/reportData/documents/locations/')
      .subscribe((data: any) => {
        console.log(data);
        const response2 = data as { key: string, data: string };
        const dataString2 = response2.data;
        this.location = JSON.parse(dataString2);
        this.reportSubject2.next(this.location);
        console.log(this.location);
      });
   }
   //get the data
   ngOnInit(): void {}
    // var response 
    // this.http.get('https://272.selfip.net/apps/kaWgmHTSzM/collections/reportData/documents/reports/')
    //   .subscribe((data)=>{
    //     console.log(data);
    //     response = data as { key: string, data: string };
    //     var dataString = response.data;
    //     this.report= JSON.parse(dataString);
    //     console.log(this.report);
    //   })
    // }
    

   getReports(): Subject<Report[]> {
      return this.reportSubject;
    }

    getReports2(): Subject<string[]>{
      return this.reportSubject2
    }
   get(){
    //var parsed=this.http.get('https://272.selfip.net/apps/kaWgmHTSzM/collections/reportData/documents/reports/')
    //console.log(parsed)
    return this.report
   }

   add(mName:string, loc:string, long:number, lat:number, img:string, rName:string, phone:number, extra:string){
    //create a new report object and add it to the list
    this.report.push(new Report(mName,loc,long,lat,img,rName,phone,extra))
    //stringify and update the storage
    var saving=JSON.stringify(this.report)
    this.http.put('https://272.selfip.net/apps/kaWgmHTSzM/collections/reportData/documents/reports/',{
      "key": "reports",
      "data": saving
    })
      .subscribe((data)=>{
        console.log(data);
      })

    console.log(this.report)
   }

  hash(value:string){
    var params ={value}//create a object{value:"<the arguement>"}
    return this.http.get('https://api.hashify.net/hash/md5/hex', { params  });
  }
   delete(del_mName:string){
    //look for monster name and remove it from the list
    this.report = this.report.filter((m) => m.monsterName != del_mName)
    //stringify and update the storage
    var saving=JSON.stringify(this.report)
    this.http.put('https://272.selfip.net/apps/kaWgmHTSzM/collections/reportData/documents/reports/',{
      "key": "reports",
      "data": saving
    })
      .subscribe((data)=>{
        console.log(data);
      })
    return this.report
   } 

   searchMonster(mName:string){
    //this look for the monster via name and can return to MoreInfo (can shown by time when displaying)
    return this.report.filter((m) => m.monsterName === mName)[0]
   }

   //check if a monster exist in the list already
   exist(mName:string){
    return (this.report.filter((m) => m.monsterName == mName).length==0)
    }
  existLoc(Loc:string){
    return (this.location.filter((l) =>l == Loc).length==0)
    }
 

   edit(reportSelected:Report){
      for(let i=0;i<this.report.length;i++){
        if(this.report[i]==reportSelected){
          this.report[i].status=!this.report[i].status;
        }
      }
      //stringify and update the storage
      var saving=JSON.stringify(this.report)
      this.http.put('https://272.selfip.net/apps/kaWgmHTSzM/collections/reportData/documents/reports/',{
        "key": "reports",
        "data": saving
      })
        .subscribe((data)=>{
          console.log(data);
        })
  
    return this.report
   }

   addlocations(newLocation:string){
    this.location.push(newLocation)
    //save to database
    var saving=JSON.stringify(this.location)
    this.http.put('https://272.selfip.net/apps/kaWgmHTSzM/collections/reportData/documents/locations/',{
      "key": "locations",
      "data": saving
    })
      .subscribe((data)=>{
        console.log(data);
      })
   }

   getLocation(){
    var response 
    this.http.get('https://272.selfip.net/apps/kaWgmHTSzM/collections/reportData/documents/locations/')
      .subscribe((data)=>{
        console.log(data);
        response = data as { key: string, data: string };
        var dataString = response.data;
        this.location= JSON.parse(dataString);
        console.log(this.report);
      })
    return this.location
   }

   passLongAndLat(){
    return [this.long,this.lat]
   }


    // Observable stream
  Deleted$ = this.eventSubject.asObservable();

  emitDelete(data: any) {
    // Emit the event to all subscribers
    this.eventSubject.next(data);
  }

  numberInLoc(loc:string){
    let num=0;
    for(let i=0;i<this.report.length;i++){
      if(this.report[i].location==loc){
        num++;
      }
    }
    return num;
  }
}
