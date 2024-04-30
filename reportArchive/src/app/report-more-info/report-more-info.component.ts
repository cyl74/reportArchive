import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReportService } from '../report.service';
import { Report } from '../reportClass';

@Component({
  selector: 'app-report-more-info',
  templateUrl: './report-more-info.component.html',
  styleUrls: ['./report-more-info.component.css']
})
export class ReportMoreInfoComponent implements OnInit{
  MonsterName: string
  report:Report
  
  constructor(private activeedRoute: ActivatedRoute, private service: ReportService) {
    //get the parameter pass into the URL
    this.MonsterName = activeedRoute.snapshot.params['name']
    this.report=new Report("","",0,0,"","",0,"");
    //assume monster name cannot be repeated
  }
  ngOnInit(): void {
    this.service.getReports().subscribe((data: Report[]) => {
        console.log('Data received in component:', this.report);
        console.log("ONITIN REPORTLIST");
        this.report=this.service.searchMonster(this.MonsterName);
    });
    this.report=this.service.searchMonster(this.MonsterName);
}
}
