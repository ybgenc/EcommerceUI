import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Create_Product } from 'src/app/contract/create-product';
import { HttpErrorResponse } from '@angular/common/http';
import { List_Product } from 'src/app/contract/list-product';
import { first, firstValueFrom, Observable } from 'rxjs';
import { List_Product_Image } from 'src/app/contract/list-product-image';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private httpClientService: HttpClientService) {}

  Create(
    product: Create_Product,
    successCallback?: () => void,
    errorCallback?: (errorMessage: string) => void
  ) {
    this.httpClientService
      .Post(
        {
          controller: 'Product',
        },
        product
      )
      .subscribe(
        (result) => {
          successCallback();
        },
        (errorResponse: HttpErrorResponse) => {
          const _error: Array<{ key: String; value: Array<String> }> =
            errorResponse.error;
          let message = '';
          _error.forEach((v, i) => {
            v.value.forEach((_v, _i) => {
              message += `${_v}<br>`;
            });
          });
          errorCallback(message);
        }
      );
  }


  async Get(
    successCallback: () => void,
    errorCallback: (errorMessage: string) => void
  ): Promise<List_Product[]> {
    const data: Promise<List_Product[]> = this.httpClientService
      .Get<List_Product[]>({
        controller: 'Product',
      })
      .toPromise();

    data
      .then((d) => successCallback())
      .catch((errorResponse: HttpErrorResponse) =>
        errorCallback(errorResponse.message)
      );

    return await data;
  }

  async Delete(id: string){
    const deleteObs : Observable<any> = this.httpClientService.Delete<any>({
      controller: 'Product',
    },id);;
    await firstValueFrom(deleteObs);
  }

  async getImages(id: string): Promise<List_Product_Image[]> {
    const getObservable: Observable<List_Product_Image[]> = this.httpClientService.Get<List_Product_Image[]>({
        action: 'GetProductImage',
        controller: 'product',
    }, id);

    return await firstValueFrom(getObservable);
}

async DeleteImage(id: string, imageId: string) {
  const deletObservable = this.httpClientService.Delete({
    action: "DeleteProductImage",
    controller: "product",
    queryString: `imageId=${imageId}`, 
  }, id);

  await firstValueFrom(deletObservable); 
}

}
