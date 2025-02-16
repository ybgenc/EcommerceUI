import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import {
  HubConnection,
  HubConnectionBuilder,
  HubConnectionState,
} from '@microsoft/signalr';
import { error } from 'console';
import { get } from 'https';

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  private _connection: HubConnection;

  get connection(): HubConnection {
    return this._connection;
  }

  start(hubUrl: string) {
    if (
      !this.connection ||
      this._connection?.state == HubConnectionState.Disconnected
    ) {
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

      this._connection = connection;
    }

    this._connection.onreconnected((connectionId) =>
      console.log('reconnected')
    );
    this._connection.onreconnecting((error) => console.log('connecting'));
    this._connection.onclose((error) => console.log('connection closed'));
  }
  invoke(
    procedureName: string,
    message: any,
    successCallBack?: (value) => void,
    errorCallBack?: (error) => void
  ) {
    this.connection
      .invoke(procedureName, message)
      .then(successCallBack)
      .catch(errorCallBack);
  }

  on(procedureName: string, callBack: (...message: any) => void) {
    this.connection.on(procedureName, callBack);
  }
}
