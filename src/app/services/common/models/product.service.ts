import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Create_Product } from 'src/app/contract/create-product';
import { HttpErrorResponse } from '@angular/common/http';
import { List_Product } from 'src/app/contract/list-product';

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
      .Create(
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
}
