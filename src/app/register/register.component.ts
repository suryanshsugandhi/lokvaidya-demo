import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service'
import { Router } from '@angular/router'
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private _auth: AuthService, private _router: Router) { }

  ngOnInit() {
  }

  registerUser(registerForm){
    // console.log(registerForm)
    let body = {
      'username': registerForm.form.value.username,
      'password': registerForm.form.value.password,
      'age': registerForm.form.value.age,
      'name': registerForm.form.value.name,
      'email' : registerForm.form.value.email
    }
    this._auth.registerUser(body).subscribe(res => {
      // console.log(res)
      localStorage.setItem('token', res.token)
      this._router.navigate(['/home'])

    }, err => {
      console.error(err)
    })
  }

}
