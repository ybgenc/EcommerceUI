import { Component } from '@angular/core';
import { ToasterCustomService,ToasterAlertType,ToasterPosition } from './services/ui/toaster-custom.service';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'EcommerceUI';

  constructor(private toastrService: ToasterCustomService){
    toastrService.message("hello"," moto!", {toasterAlertType : ToasterAlertType.Error, position :ToasterPosition.TopFullWidth});
    toastrService.message("hello"," moto!", {toasterAlertType : ToasterAlertType.Success, position :ToasterPosition.BottomFullWidth});
    toastrService.message("hello"," moto!", {toasterAlertType : ToasterAlertType.Info, position :ToasterPosition.TopCenter});


  }
}
