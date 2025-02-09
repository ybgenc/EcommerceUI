import { FacebookLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import {  NgxSpinnerService } from 'ngx-spinner';
import { Login_User } from 'src/app/contract/users/login-user';
import { AuthService } from 'src/app/services/common/auth.service';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { AuthUserService } from 'src/app/services/common/models/auth-user.service';
import { UserService } from 'src/app/services/common/models/user.service';
import { ToasterCustomService } from 'src/app/services/ui/toaster-custom.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authUserService: AuthUserService,
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private activateddRoute: ActivatedRoute,
    private router: Router,
    private socialAuthService: SocialAuthService
  ) {
    socialAuthService.authState.subscribe(async (user: SocialUser) => {
      this.spinner.show();
      switch (user.provider){
        case "GOOGLE":
          await authUserService.googleLogin(user, () => {
            console.log(user)
            this.authService.checkIdentity();
            this.spinner.hide();
            this.router.navigate(['admin'])
          });
          break;
        case "FACEBOOK":
          await authUserService.facebookLogin(user, () => {
            console.log(user)
            this.authService.checkIdentity();
            this.spinner.hide();
            this.router.navigate(['admin'])
          });
          break;
      }
    });
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      UsernameOrEmail: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  async submitForm(data: Login_User) {
    this.spinner.show();
    await this.authUserService.submitForm(data, () => {
      this.authService.checkIdentity();
      this.activateddRoute.queryParams.subscribe((params) => {
        const returnUrl: string = params['returnUrl'];
        if (returnUrl) {
          this.router.navigate([returnUrl]);
        }
        else
          this.router.navigate(['admin'])
      });
      this.spinner.hide();
    });
  }

  facebookLogin(){
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID)
  }
}
