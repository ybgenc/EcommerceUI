import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Menu } from 'src/app/contract/authorization/menu';
import { first, firstValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationMenuService {

  constructor(private htppClientService : HttpClientService) { }

  async getAuthorizeDefinitonEndpoints(): Promise<Menu[]> {
    const authorizeDefinition: Observable<Menu[]> = this.htppClientService.Get<Menu[]>({
      controller: 'ApplicationServices'
    });
  
    return await firstValueFrom(authorizeDefinition);
  }
  

}
