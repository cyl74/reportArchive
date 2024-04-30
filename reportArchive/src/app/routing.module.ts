import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReportListComponent } from './report-list/report-list.component';
import { ReportAddformComponent } from './report-addform/report-addform.component';
import { ReportMoreInfoComponent } from './report-more-info/report-more-info.component';
import { WelcomeComponent } from './welcome/welcome.component';

const appRoutes:Routes = [
  { path: 'reportlist', component:ReportListComponent  },
  {path:"add",component:ReportAddformComponent},
  {path:"info/:name",component:ReportMoreInfoComponent},
  {path:"",component:WelcomeComponent}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class RoutingModule { }


