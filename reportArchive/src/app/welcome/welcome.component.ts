import { Component } from '@angular/core';
import { ReportService } from '../report.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {
  imgUrl="./../../assets/NCT.png"
  title = 'Night Crusade Titans (NCT)';
  constructor(private service:ReportService){
    this.service.get()
  }

}
