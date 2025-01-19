import { Component, Inject, Output, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Create_Product } from 'src/app/contract/create-product';
import { ProductService } from 'src/app/services/common/models/product.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertifyService, AlertType, Position } from 'src/app/services/admin/alertify.service';

@Component({
  selector: 'app-create-dialog',
  templateUrl: './create-dialog.component.html',
  styleUrls: ['./create-dialog.component.scss']
})
export class CreateDialogComponent {

  @Output() createdProduct: EventEmitter<Create_Product> = new EventEmitter();

  constructor(
    private productService: ProductService,
    private spinner: NgxSpinnerService,
    private alertify: AlertifyService,
    private dialogRef: MatDialogRef<CreateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { name: string, stock: string, price: string }
  ) {}

  close() {
    this.dialogRef.close(); 
  }

  async onCreate() {
    const create_product: Create_Product = new Create_Product();
    create_product.name = this.data.name;
    create_product.stock = parseInt(this.data.stock);
    create_product.price = parseFloat(this.data.price);

    this.spinner.show();

    this.productService.Create(create_product, () => {
      this.spinner.hide();
      this.alertify.message('Product created successfully', {
        alertType: AlertType.Success,
        dismissOther: true,
        position: Position.TopRight,
      });
      this.createdProduct.emit(create_product);  
      this.dialogRef.close(create_product);  
    }, errorMessage => {
      this.spinner.hide();
      this.alertify.message(errorMessage, {
        alertType: AlertType.Error,
        dismissOther: true,
        position: Position.TopRight,
      });
    });
  }
}
