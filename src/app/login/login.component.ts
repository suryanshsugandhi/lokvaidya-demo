import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _auth: AuthService, private _router: Router) { }

  ngOnInit() {
  }
  loginUser(loginForm){
    let username = loginForm.form.value.username, password = loginForm.form.value.password
    let body = {
      'username' : username,
      'password' : password
    }
    this._auth.loginUser(body).subscribe(res => {
      localStorage.setItem('token', res.token)
      this._router.navigate(['/home'])
    }, err => {
      console.error(err)
      let errorText = document.getElementById('error-text')
        errorText.classList.remove('hidden')
        errorText.innerText = err.error
    })
  }
  signUp(){
    this._router.navigate(['/register'])
  }
}
