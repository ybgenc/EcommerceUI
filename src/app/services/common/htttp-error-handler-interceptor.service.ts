import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpStatusCode,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { error } from 'console';
import { catchError, Observable, of } from 'rxjs';
import { ToasterAlertType, ToasterCustomService, ToasterPosition } from '../ui/toaster-custom.service';
import { AuthUserService } from './models/auth-user.service';

@Injectable({
  providedIn: 'root',
})
export class HtttpErrorHandlerInterceptorService
  implements HttpInterceptor {
  constructor(private toasterService: ToasterCustomService,
    private authUserService : AuthUserService,
  ) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error) => {
        switch (error.status) {
          case HttpStatusCode.BadRequest:
            this.toasterService.message(
              'Invalid request data. Please check your input and try again.', 'Bad Request',
              {
                toasterAlertType : ToasterAlertType.Warning,
                position: ToasterPosition.TopRight,
              }
            );
            break;

          case HttpStatusCode.NotFound:
            this.toasterService.message(
              'The requested resource could not be found.','Not Found',
              {
                toasterAlertType : ToasterAlertType.Warning,
                position: ToasterPosition.TopRight,
              }
            );
            break;
          case HttpStatusCode.InternalServerError:
            this.toasterService.message(
              'Something went wrong on our end. Please try again later.','Internal Server Error',
              {
                toasterAlertType : ToasterAlertType.Warning,
                position: ToasterPosition.TopRight,
              }
            );
            break;
          case HttpStatusCode.Unauthorized:
            this.toasterService.message(
              'You are not authorized to access this resource. Please log in.','Unauthorized',
              {
                toasterAlertType : ToasterAlertType.Warning,
                position: ToasterPosition.TopCenter,
              }
            );
            this.authUserService.refreshTokenLogin(localStorage.getItem('refreshToken')).then();
            break;
          default:
            this.toasterService.message(
              'An unexpected error occurred. Please try again later.','',
              {
                toasterAlertType : ToasterAlertType.Warning,
                position: ToasterPosition.TopCenter,
              }
            );
            break;
        }
        return of(error);
      })
    );
  }
}
