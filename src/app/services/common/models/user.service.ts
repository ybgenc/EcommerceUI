import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { User } from 'src/app/Entities/User';
import { Create_User } from 'src/app/contract/users/create-user';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClientService : HttpClientService) { }

  async create(user : User) : Promise<Create_User>{
    const observable : Observable<Create_User | User> = this.httpClientService.Post<Create_User | User>({
      controller : 'users',      
    },user); 

    return await firstValueFrom(observable) as Create_User;
  }
}
