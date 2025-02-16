import { Component, OnInit } from '@angular/core';
import { hubUrls } from 'src/app/constant/hub-urls';
import { ReceiveFunctions } from 'src/app/constant/receive-functions';
import { SignalRService } from 'src/app/services/common/signal-r.service';
import {
  ToasterAlertType,
  ToasterCustomService,
  ToasterPosition,
} from 'src/app/services/ui/toaster-custom.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private toasterService: ToasterCustomService,
    private signalRService: SignalRService
  ) {
    signalRService.start(hubUrls.ProductHub);
  }

  ngOnInit(): void {
    this.signalRService.on(
      ReceiveFunctions.ProductAddedMessage,
      (message: string) => {
        this.toasterService.message(message, 'Product Added', {
          toasterAlertType: ToasterAlertType.Info,
          position: ToasterPosition.TopRight,
        });
      }
    );
  }
}
