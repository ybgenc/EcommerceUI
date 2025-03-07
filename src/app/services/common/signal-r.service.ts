import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import {
  HubConnection,
  HubConnectionBuilder,
  HubConnectionState,
} from '@microsoft/signalr';
import { error } from 'console';
import { get } from 'https';
import { hubUrls } from 'src/app/constant/hub-urls';

@Injectable({
  providedIn: 'root',
})
export class SignalRService {


  start(hubUrl: string) {

      const builder: HubConnectionBuilder = new HubConnectionBuilder();
      const connection: HubConnection = builder
        .withUrl(hubUrl, {
          skipNegotiation: true,
          transport: signalR.HttpTransportType.WebSockets,
        })
        .withAutomaticReconnect()
        .build();

      connection
        .start()
        .then(() => {})
        .catch((error) => {
          setTimeout(() => this.start(hubUrl), 2000);
        });


        connection.onreconnected((connectionId) => console.log('reconnected'));
        connection.onreconnecting((error) => console.log('connecting'));
        connection.onclose((error) => console.log('connection closed'));

    return connection
  }
  invoke(
    procedureName: string,
    message: any,
    hubUrl:string,
    successCallBack?: (value) => void,
    errorCallBack?: (error) => void
  ) {
    this.start(hubUrl).invoke(procedureName, message)
    .then(successCallBack)
    .catch(errorCallBack);

  }

  on(hubUrl:string, procedureName: string, callBack: (...message: any) => void) {
    this.start(hubUrl).on(procedureName, callBack);
  }
}
