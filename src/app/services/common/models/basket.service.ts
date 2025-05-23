import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { firstValueFrom, Observable } from 'rxjs';
import { Basket_Item_List } from 'src/app/contract/basket/basket-item-list';
import { Add_Basket_Item } from 'src/app/contract/basket/add-basket-item';
import { Update_Basket_Item } from 'src/app/contract/basket/update-basket-item';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  constructor(private httpClientService: HttpClientService) {}

  async getBasketItems(): Promise<Basket_Item_List[]> {
    const basketItems: Observable<Basket_Item_List[]> =
      this.httpClientService.Get({
        controller: 'Basket',
      });

    return await firstValueFrom(basketItems);
  }

  async addItemToBasket(item: Add_Basket_Item) {
    const addedItem: Observable<Add_Basket_Item> = this.httpClientService.Post(
      {
        controller: 'Basket',
        action: 'AddItemToBasket',
      },
      item
    );
    await firstValueFrom(addedItem);
  }

  async updateItemQuantity(item: Update_Basket_Item) {
    const updateQuantity: Observable<Update_Basket_Item> =
      this.httpClientService.Update(
        {
          controller: 'Basket',
          action: 'UpdateItemQuantity',
        },
        item
      );
    await firstValueFrom(updateQuantity);
  }

  async deleteBasketItem(BasketItemId: string, callBackFunction?: () => void) {
    const deleteItem: Observable<any> = this.httpClientService.Delete<any>(
      {
        controller: 'Basket'
      },
      BasketItemId
    );

    await firstValueFrom(deleteItem);
    callBackFunction();
  }
}
