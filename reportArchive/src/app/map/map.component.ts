import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';//need to import leaflet L is the leaflet object, think of leaflet as a wrapper around any maps API
import { Report } from '../reportClass';
import { ReportService } from '../report.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  private map!: L.Map//create a map
  report:Report[]
  lat:number
  long:number
  customIcon = L.icon({
    iconUrl: './../../assets/leafletIcon.png', // Replace with your custom marker image path
    iconSize: [20, 30],
    iconAnchor: [19, 38],
    popupAnchor: [0, -38]
  });
  markers:any[]=[]
  constructor(private service:ReportService){ 
    this.report=[]
    this.lat=0
    this.long=0
  }

  ngOnInit(): void {
    this.service.getReports().subscribe((data: Report[]) => {
      this.report = data; // Update the component's report data
        console.log('Data received in component:', this.report);
        console.log("ONITIN Map");
        this.report=this.service.get();
        this.putLabels()
    });
    // this.report=this.service.get();
    this.showMap()
    this.putLabels()
    this.showClick()
    // //to delete marker
    this.service.Deleted$.subscribe((data) => {
      // Handle the emitted event
      this.markers.forEach(marker => {
        this.map.removeLayer(marker);
      });
      this.markers = [];
      this.putLabels()
      console.log('Event received in Any Component:', data);
    });
    // console.log(this.report)
    // console.log("OnInit Map")
  }
  ngOnChanges() {
    console.log("Onchange")
  }

  showMap() {//on initialize, run show view (4 decimal value is rought where you can see the difference)
    this.map = L.map('mapid').setView([49.27, -123], 11);//the (longtitude and latitude )<--could be other way and zoom level

    const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {//use open street map (free)
      maxZoom: 19,//set max zoom to prevent lag
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> ',

    }).addTo(this.map);
  }


  //this put labels on it
  putLabels() {
    this.report=this.service.get();
    for(let i=0;i<this.report.length;i++){
      var mark=L.marker([this.report[i].latitude, this.report[i].longtitude], { icon: this.customIcon }).addTo(this.map)
      .bindPopup("<b>"+this.report[i].location+"</b>"+"<br />Monster:"+this.report[i].monsterName
      +"<br>There are "+ this.service.numberInLoc(this.report[i].location) +" nuisance(s)<br> in this location")
      //for deleting later on
      this.markers.push(mark)
      console.log("LABEL")
    }
  }

//this show where you click long and lat
  showClick(){
    this.map.on('click',(e)=>{
      alert("Lat, Lon : " + e.latlng.lat + ", " + e.latlng.lng )
      console.log(e)
      //store most recent long and lat
      this.service.long=e.latlng.lng
      this.service.lat=e.latlng.lat
    });
  }

}
