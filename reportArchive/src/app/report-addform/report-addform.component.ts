import { Component,OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators  } from '@angular/forms';
import { Router } from '@angular/router';
import { ReportService } from '../report.service';
import { Report } from '../reportClass';

@Component({
  selector: 'app-report-addform',
  templateUrl: './report-addform.component.html',
  styleUrls: ['./report-addform.component.css']
})
export class ReportAddformComponent implements OnInit{
//put a restruction that says if there is an monster with same name and it's active (open)
//put a warning to say do they want to override the old active one
//or just say villian already in data
wrong:string;
wrongLoc:string;
form: FormGroup
location:string[]
showOther:boolean
reports:Report[]
  constructor(private service: ReportService, private router: Router){
    this.reports=[]
    let formControls = {
      mName: new FormControl('',[
        Validators.required,
        Validators.minLength(1)
      ]),
      loc:new FormControl("",[Validators.required] ),
      long:new FormControl(0,[Validators.required]),
      lat:new FormControl(0,[Validators.required]),
      img:new FormControl("None"),
      rName:new FormControl("",[Validators.required,
                              Validators.minLength(1)]),
      phone:new FormControl([Validators.required,
                              Validators.minLength(10),
                              Validators.maxLength(15)]
      ),
      extra:new FormControl("")
    }
    this.form = new FormGroup(formControls)
    this.wrong=""
    this.wrongLoc=""
    this.location=[]
    this.showOther= false;
  }

  onSubmit(newReport:any) {
    //console.log(newPerson)
    if(this.showOther){
      if(this.service.existLoc(newReport.otherLocation)){
        if(this.service.exist(newReport.mName)){
          this.service.add(newReport.mName,newReport.otherLocation,newReport.long,newReport.lat, newReport.img,newReport.rName,newReport.phone,newReport.extra)
          this.service.addlocations(newReport.otherLocation)
          this.wrong=""
          this.router.navigate([""])
        }
        else{
          this.wrong="Monster Already Exist"
        }
      }
      else{
        this.wrongLoc="Location Already Exist, please select from dropdown list"
      }
    }
    else{
      if(this.service.exist(newReport.mName)){
        this.service.add(newReport.mName,newReport.loc,newReport.long,newReport.lat, newReport.img,newReport.rName,newReport.phone,newReport.extra)
        this.wrong=""
        this.router.navigate(["reportlist"])
      }
      else{
        this.wrong="Monster Already Exist"
      }
    }
    
  }
  onCancel(){
    this.router.navigate(["reportlist"])
  }

  onLocationChange(value: string) {
    if (value === 'other') {
      this.form.addControl('otherLocation', new FormControl('', [Validators.required]));
      this.showOther = true;
    } else {
      this.form.removeControl('otherLocation');
      this.showOther = false;
    }
  }

  onMapClick(){
    console.log(this.service.passLongAndLat())
    this.form.removeControl('long');
    this.form.addControl("long",new FormControl(this.service.passLongAndLat()[0],[Validators.required]))
    this.form.removeControl('lat');
    this.form.addControl("lat",new FormControl(this.service.passLongAndLat()[1],[Validators.required]))
  }

  //refactor the code for location, so it is like/similair to the report get()
  ngOnInit(): void {
    this.service.getReports2().subscribe((data: string[]) => {
    this.location = data; // Update the component's report data
      console.log('Data received in component:', this.reports);
      console.log("ONITIN REPORTLIST");
      this.location=this.service.getLocation()
  });
  this.location=this.service.getLocation()
} 

}
