import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { User } from 'src/app/Entities/User';
import { Create_User } from 'src/app/contract/users/create-user';
import { firstValueFrom, Observable } from 'rxjs';
import { Login_User } from 'src/app/contract/users/login-user';
import { Token } from 'src/app/contract/token/token';
import { ToasterAlertType, ToasterCustomService, ToasterPosition } from '../../ui/toaster-custom.service';
import { Position } from '../../admin/alertify.service';
import { TokenResponse } from 'src/app/contract/token/tokenResponse';
import { SocialUser } from '@abacritt/angularx-social-login';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private httpClientService: HttpClientService,
    private toasterService: ToasterCustomService
  ) {}

  async create(user: User): Promise<Create_User> {
    const observable: Observable<Create_User | User> =
      this.httpClientService.Post<Create_User | User>(
        {
          controller: 'users',
        },
        user
      );

    return (await firstValueFrom(observable)) as Create_User;
  }

  async submitForm(data: Login_User, callBackFuction:() => void): Promise<any> {
    const observable: Observable<Login_User | TokenResponse> =
      await this.httpClientService.Post<Login_User | TokenResponse>(
        {
          controller: 'users',
          action: 'Login',
        },
        data
      );

    const tokenResponse: TokenResponse = (await firstValueFrom(observable)) as TokenResponse;

    if (tokenResponse) 
      localStorage.setItem("accessToken" , tokenResponse.token.accessToken);
      this.toasterService.message('Login successful!','Success', {
      toasterAlertType : ToasterAlertType.Success,
      position : ToasterPosition.TopLeft

    });
    callBackFuction();
    return tokenResponse;
  }

  async googleLogin(user : SocialUser, callBackFuction? : () => void) : Promise<any>{
   const observable : Observable<SocialUser | TokenResponse> = this.httpClientService.Post<SocialUser | TokenResponse>({
      controller: 'users',
      action: 'google-login'
    },user);

    const tokenResponse : TokenResponse = await firstValueFrom(observable) as TokenResponse;

    if(tokenResponse)
      localStorage.setItem("accessToken", tokenResponse.token.accessToken)

    this.toasterService.message('Google login successful', 'Success', {
      toasterAlertType : ToasterAlertType.Success,
      position : ToasterPosition.TopLeft
    })

    callBackFuction();
  }

  async facebookLogin(user : SocialUser, callBackFuction? : ()  => void) : Promise<any>{
    const observable : Observable<SocialUser |TokenResponse> = this.httpClientService.Post<SocialUser | TokenResponse>({
      controller : 'users',
      action : 'facebook-login'
    },user);

    const tokenResponse : TokenResponse = await firstValueFrom(observable) as TokenResponse;

    if(tokenResponse)
      localStorage.setItem('accessToken', tokenResponse.token.accessToken)

    this.toasterService.message('Facebook login successful', 'Success', {
      toasterAlertType : ToasterAlertType.Success,
      position : ToasterPosition.TopLeft
    })

    callBackFuction();
  }
}
