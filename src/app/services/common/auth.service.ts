import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClientService } from './http-client.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private jwtHelper: JwtHelperService, httpClientService : HttpClientService) {}


  checkIdentity() {
    const token: string = localStorage.getItem('accessToken');
    let isExpired: boolean;

    try {
      isExpired = this.jwtHelper.isTokenExpired(token);
    } catch {
      isExpired = true;
    }

    _isAuthenticated = token != null && !isExpired;
  }

  get isAutheticated(): boolean {
    return _isAuthenticated;
  }

}

export let _isAuthenticated: boolean;
