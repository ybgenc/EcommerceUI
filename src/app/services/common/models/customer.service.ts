import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Customer_List } from 'src/app/contract/customer/Customer_List';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private httpClientService: HttpClientService) {}

  async getCustomer(): Promise<Customer_List[]> {
    const response: Observable<Customer_List[]> = await this.httpClientService.Get({
      controller: 'Customer',
      action: 'GetAllCustomer'
    });    
  
    return await firstValueFrom(response) 
  }
}
