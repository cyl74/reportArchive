import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Report } from '../reportClass';
import { ReportService } from '../report.service';
import { FormControl, FormGroup, Validators  } from '@angular/forms';


@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent {
  @Input() report!:Report //put a ! to say trust me bro, just add a empty check before displaying in report.list
  @Output() delete = new EventEmitter()
  wrong:string
  query: string
  buttHid:string
  buttShow:string
  hashed:string
  hashedKEY="fcab0453879a2b2281bc5073e3f5fe54"
  constructor(private router: Router,private service:ReportService){
    this.query="" 
    this.buttHid="hide"
    this.buttShow="show"
    this.wrong=""
    this.hashed=""
  }

  //swap display and no display
  onChange(){
    let temp=this.buttHid
    this.buttHid=this.buttShow
    this.buttShow=temp
  }

  onEdit(report:Report){
    this.hashed=""
    this.service.hash(this.query)
    .subscribe((response: any) => {
      this.hashed = response.Digest
      console.log(this.hashed)
       if(this.hashed=== this.hashedKEY ){
          this.service.edit(report)
          this.wrong=""
          this.onChange()
        }
        else{
          this.wrong="Wrong Password"
        }
        this.query="" 
    })
    }
    // if(this.query=== "BaggyJeans" ){
    //   this.service.edit(report)
    //   this.wrong=""
    //   this.onChange()
    // }
    // else{
    //   this.wrong="Wrong Password"
    // }
    // this.query="" 
  //}

}
//for the components work more on the html page

