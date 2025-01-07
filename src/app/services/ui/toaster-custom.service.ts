import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToasterCustomService {

  constructor(private toastr : ToastrService) { }
  message(message : string, title : string, toasterOptions : Partial<ToasterOptions> ){
    this.toastr[toasterOptions.toasterAlertType](message, title, {positionClass : toasterOptions.position});
  }
}

export class ToasterOptions{
  toasterAlertType : ToasterAlertType = ToasterAlertType.Success;
  position : ToasterPosition = ToasterPosition.TopLeft;

}

export enum ToasterAlertType{
  Success = 'success',
  Info = 'info',
  Warning = 'warning',
  Error = 'error'
}

export enum ToasterPosition{
  TopRight = 'toast-top-right',
  BottomRight = 'toast-bottom-right',
  BottomLeft = 'toast-bottom-left',
  TopLeft = 'toast-top-left',
  TopFullWidth = 'toast-top-full-width',
  BottomFullWidth = 'toast-bottom-full-width',
  TopCenter = 'toast-top-center',
  BottomCenter = 'toast-bottom-center',
}