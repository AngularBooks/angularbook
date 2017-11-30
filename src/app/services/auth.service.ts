import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {tokenNotExpired} from 'angular2-jwt';
import {Router} from '@angular/router';

@Injectable()
export class AuthService {
  token: string;

  constructor(private http: HttpClient, private router: Router) {}

  register (user: Object): Observable<any> {
    return this.http.post('http://angularbook.app/api/v1/register', user)
      .map((response) => response)
      .catch((error: any) => Observable.throw(error.json().error || {message: 'Server Error'}));
  }

  login (user: Object): Observable<any> {
    return this.http.post('http://angularbook.app/api/v1/login', user)
      .map((response) => {
        const token = response.token;

        console.log('Response token:' + token);

        if (token) {
          this.token = token;
          localStorage.setItem('token', this.token);
          return true;
        } else {
          return false;
        }

      })
      .catch((error: any) => Observable.throw(error.json().error || {message: 'Server Error'}));
  }

  loggedIn() {
    return tokenNotExpired();
  }

  logout(): void {
    this.token = null;
    localStorage.removeItem('token');
    console.log('you are logged out!');
    this.router.navigate(['/']);
  }
}
