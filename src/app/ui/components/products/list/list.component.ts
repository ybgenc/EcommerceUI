import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { error } from 'console';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseStorageUrl } from 'src/app/contract/BaseStorageUrl';
import { Add_Basket_Item } from 'src/app/contract/basket/add-basket-item';
import { List_Product } from 'src/app/contract/product/list-product';
import { AlertType } from 'src/app/services/admin/alertify.service';
import { BaseUrlService } from 'src/app/services/common/models/base-url.service';
import { BasketService } from 'src/app/services/common/models/basket.service';
import { ProductService } from 'src/app/services/common/models/product.service';
import {
  ToasterAlertType,
  ToasterCustomService,
  ToasterPosition,
} from 'src/app/services/ui/toaster-custom.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private spinner: NgxSpinnerService,
    private toasterService: ToasterCustomService,
    private baseUrlService: BaseUrlService,
    private basketService : BasketService
  ) {}

  products?: List_Product[];
  baseStorageUrl: BaseStorageUrl;
  baseUrl : string;

  async ngOnInit() {
    this.baseStorageUrl = await this.baseUrlService.getBaseStorageUrl();


      const ProductList: List_Product[] = await this.productService.Get(
        () => {},
        (errorMessage) => {
          this.spinner.hide();
          this.toasterService.message(errorMessage, 'Error', {
            toasterAlertType: ToasterAlertType.Error,
            position: ToasterPosition.TopRight,
          });
        }
      );

      this.products = ProductList;

      this.products = this.products.map<List_Product>(p => {
        const listProduct: List_Product = {
          id: p.id,
          createdDate: p.createdDate,
          imagePath: p.productImageFiles?.length ? p.productImageFiles.find(img => img.showCase)?.path || "" : "",
          name: p.name,
          price: p.price,
          stock: p.stock,
          updatedDate: p.updatedDate,
          productImageFiles: p.productImageFiles,
          title: p.title,
          description: p.description,
        };

        return listProduct;

      });
      console.log(this.products)

      
    ;


  }
  addItemToBasket(ProductId: string, Quantity: number) {
    const item: Add_Basket_Item = {
      ProductId: ProductId,
      Quantity: Quantity
    };
  
    this.basketService.addItemToBasket(item)
      .then(() => {
        this.toasterService.message("The item is now in your basket.","",  {
          position: ToasterPosition.TopCenter,
          toasterAlertType: ToasterAlertType.Info,
        });
      })
      .catch(error => {
        this.toasterService.message("Oops! Something went wrong. Please try again.","",  {
          position: ToasterPosition.TopCenter,
          toasterAlertType: ToasterAlertType.Error,
        });
      });
  }
  
  
}
