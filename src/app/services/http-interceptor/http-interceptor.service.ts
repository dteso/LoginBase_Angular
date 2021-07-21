import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { StorageService } from '../../services/storage/storage.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HttpInterceptorService implements HttpInterceptor {
  private readonly requests: HttpRequest<any>[] = [];

  constructor(private readonly storage: StorageService) {}

  removeRequest(req: HttpRequest<any>) {
    const i = this.requests.indexOf(req);
    if (i >= 0) {
      this.requests.splice(i, 1);
    }
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.storage.getItem('USER')?.token;
    if (token) {
      request = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token}`),
      });
    }
    request = request.clone({
      headers: request.headers
        .set('Cache-Control', 'no-cache')
        .set('Pragma', 'no-cache'),
    });
    request = request.clone({ headers: request.headers.set('Accept', '*/*') });
    this.requests.push(request);
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          this.removeRequest(request);
        }

        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        const message = this.manageError(error);
        if (message) {
          console.log('ERROR', message);
        }
        this.removeRequest(request);
        return throwError(error);
      })
    );
  }

  private readonly manageError = (error: HttpErrorResponse): string => {
    let message = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      message = `Error: ${error.error.message}`;
    } else if (error instanceof HttpErrorResponse) {
      if (error.url.indexOf('login') > -1) {
        message = 'Login Error';
      } else if (error.status > -1) {
        message = this.checkErrorStatus(error);
      } else {
        if (error.statusText && !error.url.includes('changePassword')) {
          message = error.statusText;
        } else if (
          error.error &&
          error.error.errors &&
          error.error.errors.length > 0
        ) {
          const arrayMessage = error.error.errors;
          arrayMessage.forEach((element) => {
            message += `${element.msg}<br/>`;
          });
        }
      }
    }
    return message;
  };

  private checkErrorStatus(e) {
    let msg: string;
    switch (e.status) {
      case 0:
        msg = 'Connection error';
        break;
      case 400:
        msg = 'Bad request';
        break;
      case 401:
        msg = 'Authentication error';
        window.location.href = '/';
        break;
      case 405:
        msg = 'Not allowed';
        break;
      case 409:
        this.manageInternalErrors(e);
        break;
      case 413:
        msg = 'Payload overflow';
        break;
      case 422:
        msg = 'Unprocessable entity';
        break;
      case 500:
        msg = 'Internl server errror';
        break;
      default:
        msg = 'Bad request';
        break;
    }
    return msg;
  }

  private manageInternalErrors(internalError) {
    console.log(internalError);
  }
}
