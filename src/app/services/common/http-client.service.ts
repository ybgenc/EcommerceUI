import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private httpClient : HttpClient, @Inject("baseUrl") private baseUrl : string) { }
  private url (requestParameter : Partial<RequestParameters>) : string {
    return `${requestParameter.baseUrl ? requestParameter.baseUrl : this.baseUrl}/${requestParameter.controller}${requestParameter.action ? `/${requestParameter.action}` : ""}`;
  }

   Get<T>(requestParameters : Partial<RequestParameters>, id? : string) : Observable<T>{

    let url:string = "";

    url = `${this.url(requestParameters)}`;

    requestParameters.fullEndpoint ? url = requestParameters.fullEndpoint : url = `${this.url(requestParameters)} ${id ? `/${id}` : ""}`;

    return this.httpClient.get<T>(url, { headers: requestParameters.header})
   }


   Create<T>(requestParameters: Partial<RequestParameters>, body : Partial<T>) : Observable<T> {

    let url : string = "";


    requestParameters.fullEndpoint ? url = requestParameters.fullEndpoint : url = `${this.url(requestParameters)}`;

    return this.httpClient.post<T>(url,body,{headers : requestParameters.header})
   }

    
    Update<T>(requestParameters : Partial<RequestParameters>, body:Partial<T>) : Observable<T> {
      let url : string = "";

      requestParameters.fullEndpoint ? url = requestParameters.fullEndpoint : url =`${this.url(requestParameters)}`;

      return this.httpClient.put<T>(url,body,{headers : requestParameters.header});
    }

    Delete<T>(requestParameters: RequestParameters,id:string) : Observable<T> {
      let url : string ="";

      requestParameters.fullEndpoint ? url = requestParameters.fullEndpoint : url =`${this.url(requestParameters)}/${id}`;

      return this.httpClient.delete<T>(url,{headers:requestParameters.header})
    }



   
}

export class RequestParameters {
  controller?: string;
  action?: string;
  queryString?: string;
  
  header?: HttpHeaders;
  baseUrl?: string;
  fullEndpoint?: string;
}
