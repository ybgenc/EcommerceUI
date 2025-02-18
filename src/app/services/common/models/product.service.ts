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
     try {
       const response = await this.httpClientService
         .Get<{ products: List_Product[] }>({
           controller: 'Product',
         })
         .toPromise();
  
       successCallback();
       return response.products; 
     } 
     catch (errorResponse) {
       errorCallback(errorResponse.message);
       return []; 
     }
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
  const fullEndpoint = `https://localhost:7148/api/Product/DeleteProductImage/${id}?imageId=${(imageId)}`; // todo => Fix it

  const deleteObservable = this.httpClientService.Delete(
    {
      fullEndpoint: fullEndpoint, 
    },
    id
  );
  
  return await firstValueFrom(deleteObservable);
}


async showCaseImage(imageId: string, productId: string, successCallback?: () => void) : Promise<any>{
  console.log("ps image", imageId,"ps product", productId)
  const fullEndpoint = `https://localhost:7148/api/Product/selectShowcaseImage?imageId=${imageId}&productId=${productId}`

  const showCaseObservable: Observable<any> = this.httpClientService.Get(
      { 
        fullEndpoint : fullEndpoint
      });

      await firstValueFrom(showCaseObservable);
     successCallback(); 
  } 
}









