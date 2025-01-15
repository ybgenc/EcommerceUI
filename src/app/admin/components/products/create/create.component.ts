import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgxSpinner } from 'ngx-spinner';
import { Create_Product } from 'src/app/contract/create-product';
import { ProductService } from 'src/app/services/common/models/product.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FileUploadComponent, FileUploadOptions } from 'src/app/services/common/file-upload/file-upload.component';
import {
  AlertifyService,
  AlertType,
  Position,
} from 'src/app/services/admin/alertify.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  constructor(
    private spinner: NgxSpinnerService,
    private productService: ProductService,
    private alertify: AlertifyService
  ) {}

  ngOnInit(): void {}

  @Output() createdProduct : EventEmitter<Create_Product> = new EventEmitter();
  @Output() fileUploadOptions : Partial<FileUploadOptions> = {
    action : "upload",
    controller : "Product",
    description : "Drag or Drop files",
    isAdminPage : true,
    accept :".png, .jpg, .jpeg, .json, .pdf"
  }

  Create(
    name: HTMLInputElement,
    stock: HTMLInputElement,
    price: HTMLInputElement
  ) {
 
    const create_product: Create_Product = new Create_Product();
    create_product.name = name.value;
    create_product.stock = parseInt(stock.value);
    create_product.price = parseFloat(price.value);

    
    this.productService.Create(create_product, () => {
      this.spinner.hide();
      this.alertify.message('Product created successfully', {
        alertType: AlertType.Success,
        dismissOther: true,
        position: Position.TopRight,
      });
      this.createdProduct.emit(create_product);
    },errorMessage => {
      this.spinner.hide();
      this.alertify.message(errorMessage,{
        alertType: AlertType.Error,
        dismissOther: true,
        position : Position.TopRight
      })
    });
  }
}
