import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { firstValueFrom, Observable } from 'rxjs';
import { Order_List } from 'src/app/contract/order/Order_List';
import { Create_Order } from 'src/app/contract/order/Create_Order';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private httpClientService: HttpClientService) {}

  async getOrder(): Promise<Order_List[]> {
    const response: Observable<{ order: Order_List[] }> = this.httpClientService.Get({
      controller: 'order',
      action: 'GetOrder'
    });
  
    const data = await firstValueFrom(response); // API yanıtını al
    return data.order ?? []; // `order` dizisini döndür, yoksa boş dizi ata
  }
  
  

  async completeOrder(order : Create_Order){
    const createOrder : Observable<Create_Order> = await this.httpClientService.Post({
      controller:'order',
      action:'CreateOrder'
    },order)

    await firstValueFrom(createOrder)
  }
}
