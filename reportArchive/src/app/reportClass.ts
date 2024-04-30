//just a class for importing report format
export class Report {
    monsterName:string;
    location:string;
    longtitude:number;
    latitude:number;
    imgUrl:string;
    reporterName:string;
    phoneNumber:number;
    extra:string;
    time:number;
    status:boolean;//true ==open, false==resolve

    constructor(mName:string, loc:string, long:number, lat:number, img:string, rName:string, phone:number, extra:string){
        this.monsterName=mName;
        this.location=loc;
        this.longtitude=long;
        this.latitude=lat;
        this.imgUrl=img;
        this.reporterName=rName;
        this.phoneNumber=phone;
        this.extra=extra;
        this.time=new Date().getTime();
        this.status=true;
    }

    
  }
  