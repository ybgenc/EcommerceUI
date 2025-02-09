import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { ToasterAlertType, ToasterCustomService, ToasterPosition } from '../../ui/toaster-custom.service';
import { Login_User } from 'src/app/contract/users/login-user';
import { TokenResponse } from 'src/app/contract/token/tokenResponse';
import { firstValueFrom, Observable } from 'rxjs';
import { SocialUser } from '@abacritt/angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class AuthUserService {

  constructor(    private httpClientService: HttpClientService,
      private toasterService: ToasterCustomService) { }

   async submitForm(data: Login_User, callBackFuction:() => void): Promise<any> {
      const observable: Observable<Login_User | TokenResponse> =
        await this.httpClientService.Post<Login_User | TokenResponse>(
          {
            controller: 'auth',
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
        controller: 'auth',
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
        controller : 'auth',
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
