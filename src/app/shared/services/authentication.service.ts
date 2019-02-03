import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError, of } from 'rxjs';
import { catchError, tap, map, retry } from 'rxjs/operators';

import { User } from '../models';


import { environment } from './../../../environments/environment';
import { GlobalService } from '../models/global.service';

const headers = new HttpHeaders({
  'Content-Type': 'application/json; charset=UTF-8'
  // 'Origin': '*'
  // 'Authorization': localStorage.getItem('token')
});

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  data: any;

  constructor(private globalService: GlobalService, private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(data) {
    console.log('Direccion Global:' + this.globalService.apiHost + '1/login');
    console.log('Usuario:' + data.username);
    console.log('Password:' + data.password);
    return this.http.post<any>(this.globalService.apiHost + '1/login', {
      username: data.username,
      password: data.password
    }, { headers: headers })
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        console.log('Res Status: ' + user.status);
        if (user.status = 200  && user.data.token) {
          // this.data=JSON.parse(res.data);
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          console.log('Usuario válido');
          localStorage.setItem('token', user.data.token);
          localStorage.setItem('currentUser', JSON.stringify(user.data));
          // localStorage.setItem('userName', user.user.userName);
          // localStorage.setItem('userFullName', user.user.firstName + ' ' + user.user.lastName);
          localStorage.setItem('rolesUser', 'Administrador');
          localStorage.setItem('rol', '1');
          // this.permissionsService.loadPermissions(user.user.roles);
          this.currentUserSubject.next(user);
        } else {
          console.log('Usuario CON PROBLEMAS');
        }
        return (user.data);
      }));
  }
  register(data) {
    // console.log('PostData:' + data);
    console.log('Usuario:' + data.username);
    console.log('Password:' + data.password);
    console.log('Email:' + data.email);
    return this.http.post<any>(this.globalService.apiHost + '1/register', {
      username: data.username,
      password: data.password,
      email: data.email
    }, { headers: headers })
      .pipe(map(res => {
        // login successful if there's a jwt token in the response
        console.log('Res Status: ' + res.status);
        if (res.status = 1) {
          // this.data=JSON.parse(res.data);
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          console.log('Usuario activado');
          localStorage.setItem('token', res.data.access_token);
          localStorage.setItem('currentUser', 'true');
          // localStorage.setItem('userName', user.user.userName);
          // localStorage.setItem('userFullName', user.user.firstName + ' ' + user.user.lastName);
          // localStorage.setItem('rolesUser', user.user.roles);
          // this.permissionsService.loadPermissions(user.user.roles);
          this.setSession(res.data);
        } else {
          console.log('Usuario CON PROBLEMAS');
        }
        return (res.data);
      }));
  }
  prueba() {
    // console.log('PostData:'+postData);
    return this.http.get<any>(this.globalService.apiHost + '/prueba', {
      headers: headers
    })
      .pipe(map(res => {
        // login successful if there's a jwt token in the response
        console.log('Res Status: ' + res.status);
        if (res.status = 1) {
          // this.data=JSON.parse(res.data);
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          console.log('Usuario activado');
          /* localStorage.setItem('token', res.data.access_token);
          localStorage.setItem('currentUser', 'true' ); */
          // localStorage.setItem('userName', user.user.userName);
          // localStorage.setItem('userFullName', user.user.firstName + ' ' + user.user.lastName);
          // localStorage.setItem('rolesUser', user.user.roles);
          // this.permissionsService.loadPermissions(user.user.roles);
          this.setSession(res.data);
        } else {
          console.log('Usuario CON PROBLEMAS');
        }
        return (res.data);
      }));
  }

  test() {
    return 'trabajando el Auth Service';
  }
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userName');
    localStorage.removeItem('userFullName');
    localStorage.removeItem('token');
    localStorage.removeItem('rolesUser');
    localStorage.removeItem('expires_at');
  }

  private setSession(authResult) {
    // const expireAt = moment().add(authResult.expires_at, 'second');
    // localStorage.setItem('expires_at', JSON.stringify(expireAt.valueOf()));
  }
  public isLoggedIn() {
    //  return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    // return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);

  }
}
