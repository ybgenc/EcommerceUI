import { Component, OnInit } from '@angular/core';
import { NgxSpinner, } from 'ngx-spinner';
import { Create_Product } from 'src/app/contract/create-product';
import { ProductService } from 'src/app/services/common/models/product.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertifyService, AlertType, Position } from 'src/app/services/admin/alertify.service';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  constructor(private spinner : NgxSpinnerService , private productService : ProductService, private alertify : AlertifyService) {}

  ngOnInit( ): void {

  }
  Create(name:HTMLInputElement,stock:HTMLInputElement,price:HTMLInputElement){

    this.spinner.show()
    const create_product : Create_Product = new Create_Product();
    create_product.name = name.value;
    create_product.stock = parseInt(stock.value);
    create_product.price = parseFloat(price.value);

    this.productService.Create(create_product, () => {this.spinner.hide(); this.alertify.message("Product created successfully",{
      alertType :AlertType.Success,
      dissmissOther : true,
      position : Position.TopRight
    });
    });

  }


}
