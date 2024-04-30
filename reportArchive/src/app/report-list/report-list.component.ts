import { Component,OnInit } from '@angular/core';
import { Report } from '../reportClass';
import { ReportService } from '../report.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.css']
})
export class ReportListComponent implements OnInit {
  report:Report[]
  constructor(private service:ReportService,private router: Router){
    this.report=[];
  }

  //The hash function to make it so that you would
  //hash the string and see if it matched the hard coded MD5
  //(use a builted in library or hashify.net API)

  //call delete and MoreInfo here and edit status in MoreInfo
  onReportDelete(reported:Report) {
    
    //let to_be_deleted = evt['delete_report'] 
    this.report = this.service.delete(reported.monsterName);
    //emitDelete, rn it's only used to delete marker, but can be use for other stuff as well
    this.service.emitDelete(reported);
  }

  //add and Id attribute if need to be unique, otherwise, just search for the monster name
  //and mask restriction to prevent same monster name
  onMoreInfo(reported:Report){
    this.router.navigate(['/info',reported.monsterName])
  }


  //sorting list
  //location will be default
  onSortByLocation(){
    this.report.sort((a, b) => (a.location < b.location ? -1 : 1))
  }
  onSortBymName(){
    this.report.sort((a, b) => (a.monsterName < b.monsterName ? -1 : 1))
  }
  onSortByTime(){
    this.report.sort((a, b) => (a.time < b.time ? -1 : 1))
  }

  //when initailized get the data from service
  ngOnInit(): void {
    this.service.getReports().subscribe((data: Report[]) => {
    this.report = data; // Update the component's report data
      console.log('Data received in component:', this.report);
      console.log("ONITIN REPORTLIST");
      this.report=this.service.get();
      this.report.sort((a, b) => (a.location < b.location ? -1 : 1))
  });
  this.report=this.service.get();
} 
}
