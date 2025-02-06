import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { firstValueFrom, Observable, observable } from 'rxjs';
import { Login_User } from 'src/app/contract/users/login-user';
import { AuthService } from 'src/app/services/common/auth.service';
import { HttpClientService } from 'src/app/services/common/http-client.service';
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
    private httpClientService: HttpClientService,
    private toasterService: ToasterCustomService,
    private userService: UserService,
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private activateddRoute: ActivatedRoute,
    private router: Router,
    private socialAuthService: SocialAuthService
  ) {
    socialAuthService.authState.subscribe(async (user: SocialUser) => {
      this.spinner.show();
      console.log(user);
      await userService.googleLogin(user, () => {
        this.authService.checkIdentity();
        this.spinner.hide();
        this.router.navigate(['admin'])
      });
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
    await this.userService.submitForm(data, () => {
      this.authService.checkIdentity();
      this.activateddRoute.queryParams.subscribe((params) => {
        const returnUrl: string = params['returnUrl'];
        if (returnUrl) {
          this.router.navigate([returnUrl]);
        }
      });
      this.spinner.hide();
    });
  }
}
