import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _registerUrl = "https://serene-gorge-89634.herokuapp.com/api/register"
  private _loginUrl = "https://serene-gorge-89634.herokuapp.com/api/login"
  userName = ""
  constructor(private http: HttpClient, private router: Router) { }
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  registerUser(user) {
    return this.http.post<any>(this._registerUrl, user, this.httpOptions).pipe(
      tap((user) => console.log(user)),
    );
  }
  loginUser(user){
    return this.http.post<any>(this._loginUrl, user, this.httpOptions).pipe(
      tap((user) => {
        this.userName = user.user.name;
      }),
    );
  }
  logoutUser(){
    localStorage.removeItem('token')
    this.router.navigate(['login'])
  }
  loggedIn(){
    return !!localStorage.getItem('token')
  }
  getToken(){
    return localStorage.getItem('token')
  }

}
