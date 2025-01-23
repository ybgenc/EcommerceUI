import { Component, Inject, OnInit, Output } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FileUploadOptions } from 'src/app/services/common/file-upload/file-upload.component';
import { ProductService } from 'src/app/services/common/models/product.service';
import { List_Product_Image } from 'src/app/contract/list-product-image';
import { privateDecrypt } from 'crypto';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-product-image-upload-dialog',
  templateUrl: './product-image-upload-dialog.component.html',
  styleUrls: ['./product-image-upload-dialog.component.scss'],
})
export class ProductImageUploadDialogComponent extends BaseDialog<ProductImageUploadDialogComponent>  implements OnInit{
  constructor(
    dialogRef: MatDialogRef<ProductImageUploadDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string | ProductImageUploadState,
    private productService : ProductService,
    private spinner : NgxSpinnerService
  ) {
    super(dialogRef);
  }


  @Output() options: Partial<FileUploadOptions> = {
    accept: ".png, .jpg, .jpeg, .gif",
    action: "Upload", 
    controller: "Product", 
    isAdminPage: true,
    queryString: `id=${this.data}` 
  };

  images : List_Product_Image[]
  async ngOnInit() {
    this.images = await this.productService.getImages(this.data as string)
  }

  async deleteProductImage(imageId : string ){
    await this.productService.DeleteImage(this.data as string, imageId)

  }
  
  
}

export enum ProductImageUploadState {
  Close,
}
