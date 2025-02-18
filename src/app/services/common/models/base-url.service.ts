import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { firstValueFrom, Observable } from 'rxjs';
import { BaseStorageUrl } from 'src/app/contract/BaseStorageUrl';

@Injectable({
  providedIn: 'root'
})
export class BaseUrlService {

  constructor(private httpClientService : HttpClientService) { }

  async getBaseStorageUrl(): Promise<BaseStorageUrl> {
    const getObservable: Observable<BaseStorageUrl> = this.httpClientService.Get<BaseStorageUrl>({
      controller: "Files",
      action: "getBaseUrl"
    });
    return await firstValueFrom(getObservable);
  }
}
