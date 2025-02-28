import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Add_Basket_Item } from 'src/app/contract/basket/add-basket-item';
import { Basket_Item_List } from 'src/app/contract/basket/basket-item-list';
import { Update_Basket_Item } from 'src/app/contract/basket/update-basket-item';
import { BasketService } from 'src/app/services/common/models/basket.service';
declare var $:any
@Component({
  selector: 'app-baskets',
  templateUrl: './baskets.component.html',
  styleUrls: ['./baskets.component.scss'],
})
export class BasketsComponent implements OnInit {
  constructor(private basketService: BasketService, private router : Router) {}

  basketItem?: Basket_Item_List[];
  item : any

  async ngOnInit() {
    const basketItem: Basket_Item_List[] =
      await this.basketService.getBasketItems();
      this.basketItem = basketItem;
      this.basketItem = this.basketItem.map<Basket_Item_List>(b => {      
        const basketItemList: Basket_Item_List = {
          basketItemId: b.basketItemId,
          name: b.name,
          price: b.price,
          quantity: b.quantity,
          basketId: b.basketId
        };        
        return basketItemList;
      });


  }

  async updateBasketItemQuantity(id: string, quantity: number) {
    const item: Update_Basket_Item = {
      BasketItemId: id,
      Quantity: quantity
    }
    if(quantity > 0 && quantity != null)
      this.basketService.updateItemQuantity(item)
  }

  async deleteBasketItem(BasketItemId: string, event: Event) {
    const buttonElement = event.target as HTMLElement; 
    const tdElement = buttonElement.closest("td"); 
    await this.basketService.deleteBasketItem(BasketItemId, () => {
      if (tdElement) {
        $(tdElement.parentElement).fadeOut(1000, async () => {
          this.basketItem = this.basketItem.filter(item => item.basketItemId !== BasketItemId);
        });
      }
    });
  }
  
  getTotal() {
    if (!this.basketItem || this.basketItem.length === 0) {
      return 0; 
    }
    return this.basketItem.reduce((total, item) => total + item.price * item.quantity, 0);
  }


  
}
