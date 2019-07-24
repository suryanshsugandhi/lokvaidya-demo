import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';
import { empty } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router'
import { AuthService } from '../auth.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  users: any;
  selectedUser: User;
  detailsPanel = false;
  newUserStatus = false;
  userName: string = "default";
  userSavepoint: User = emptyUser;
  constructor(private userService: UserService, private router: Router, private  authService: AuthService) { }

  ngOnInit() {
    this.getUsers();
    this.getUserName();
  }

  // dummy data service functions 
  // =====================================================================
  getUsers(): void {
    this.userService.getUsers().subscribe(users => this.users = users,
      err => {
        if(err instanceof HttpErrorResponse){
          if(err.status == 401){
            this.router.navigate(['/login'])
          }
        }
      });
  }
  logOut(): void{
    this.authService.logoutUser();
  }
  getUserName(){
    this.userName = this.authService.userName;
  }
  // =====================================================================


  // selecting user
  // =====================================================================
  selectUser(user){
    // console.log("selecting>>", user);
    this.createSavepoint(user);
    this.selectedUser = user;
    this.detailsPanel = true;
  }
  isActive(user) {
    return this.selectedUser === user;
  };
  // =====================================================================


  // editor interaction
  // =====================================================================
  changeNewUserStatus(){
    this.newUserStatus = true;
    this.deleteSavepoint();
    this.selectUser(emptyUser);
  }
  saveUser(user){
    this.userService.updateUser(user).subscribe();
    this.closeEditor();
  }
  deleteUser(user: User): void {
    this.users = this.users.filter(u => u !== user);
    this.userService.deleteUser(user.username).subscribe();
    this.closeEditor();
  }
  closeEditor(){
    this.deleteSavepoint();
    this.selectedUser = null;
    this.detailsPanel = false;
    this.newUserStatus = false;
  }
  resetEditor(){
    // console.log("reset at");
    // console.log(this.userSavepoint)
    this.selectedUser.name = this.userSavepoint.name;
    this.selectedUser.age = this.userSavepoint.age;
    this.selectedUser.password = this.userSavepoint.password;
    this.selectedUser.email = this.userSavepoint.email;
    this.closeEditor();
  }

  // editor savepoint
  createSavepoint(user){
    let temp = user;
    this.userSavepoint.name = temp.name;
    this.userSavepoint.email = temp.email;
    this.userSavepoint.password = temp.password;
    this.userSavepoint.age = temp.age
    // console.log("Created savepoint>>", this.userSavepoint);
    
  }
  deleteSavepoint(){
    this.userSavepoint.name = null;
    this.userSavepoint.email = null;
    this.userSavepoint.password = null;
    this.userSavepoint.age = null;
    // console.log("Removed Savepoint>>", this.userSavepoint); 
  }
  // ======================================================================



  // editor validation
  // ======================================================================

  // ======================================================================

}
const emptyUser:User = {
  name: "",
  id: null,
  email: "",
  password: "",
  username: ""
}
