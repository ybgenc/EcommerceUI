import { Injectable } from '@angular/core';
declare var alertify: any;

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }
    // message(message : string, alertType : AlertType, delay : number = 3, dismissOthers : boolean = false ,position : Position = Position.TopRight){
    message(message:string, options : Partial<AlertifyOptions>){
    alertify.set('notifier','delay', options.delay);
    alertify.set('notifier','position',options.position);
    const alertMesseage = alertify[options.alertType](message);
    if(options.dismissOther) 
      alertMesseage.dismissOther();
  }

  dissmiss(){

    alertify.dissmissAll();
  }
}

export class AlertifyOptions {
  alertType:AlertType = AlertType.Success;
  position:Position = Position.TopRight;
  delay:number = 3;
  dismissOther:boolean = false;

}

export enum AlertType{
  Error = 'error',
  Message = 'message',
  Notify = 'notify',
  Success = 'success',
  Warning = 'warning'

}
export enum Position{
  TopRight ="top-right",
  TopCenter ="top-center",
  TopLeft ="top-left",
  BottomRight ="bottom-right",
  BottomCenter ="bottom-center",
  BottomLeft ="bottom-left"
}