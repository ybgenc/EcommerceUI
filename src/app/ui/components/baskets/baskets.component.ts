import { Component, OnInit } from '@angular/core';
import { Add_Basket_Item } from 'src/app/contract/basket/add-basket-item';
import { Basket_Item_List } from 'src/app/contract/basket/basket-item-list';
import { BasketService } from 'src/app/services/common/models/basket.service';

@Component({
  selector: 'app-baskets',
  templateUrl: './baskets.component.html',
  styleUrls: ['./baskets.component.scss'],
})
export class BasketsComponent implements OnInit {
  constructor(private basketService: BasketService) {}

  basketItem?: Basket_Item_List[];
  item : any

  async ngOnInit() {
    const basketItem: Basket_Item_List[] =
      await this.basketService.getBasketItems();
      this.basketItem = basketItem;
      this.basketItem = this.basketItem.map<Basket_Item_List>(b => {
        console.log("before map", b); // Checking the structure of the original object
      
        const basketItemList: Basket_Item_List = {
          basketItemId: b.basketItemId,
          name: b.name,
          price: b.price,
          quantity: b.quantity
        };
        
        console.log("basket list", basketItemList); // Checking the mapped result
      
        return basketItemList;
      });
      

      console.log("list basket", this.basketItem)

      
  }

  async updateBasketItemQuantity(){

  }

  async deleteBasketItem(){

  }
  getTotal() {
    if (!this.basketItem || this.basketItem.length === 0) {
      return 0; // Return 0 if basketItem is empty or undefined
    }
    return this.basketItem.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  
}
