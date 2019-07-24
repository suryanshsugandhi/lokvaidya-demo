import { Injectable } from '@angular/core';
import {Router } from '@angular/router';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { AuthService } from './auth.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard{
    constructor(private _authService: AuthService, private _router: Router){}

    canActivate(): boolean{
      if(this._authService.loggedIn())
        return true;
      else{
        this._router.navigate(['/login'])
        return false;
      }
    }
}
