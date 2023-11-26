import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { IUser } from '../interfaces/IUser';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  // Create new User
  addUser(user: IUser){
    let users = [];
    if(localStorage.getItem('Users')){
      users = JSON.parse(localStorage.getItem('Users'));
      users = [...users, user];
    }
    else{
      users = [user];
    }
    localStorage.setItem('Users', JSON.stringify(users));
  }
  // User Validation Checks
  checkUniqueUsername(username: string): Boolean{
    if(!localStorage.getItem('Users')) return true;

    const users = this.getAllUsers();
    let isUnique = true;
    if(users.find(user => user.username === username)){
      isUnique = false;
    }
    return isUnique;
  }

  getAllUsers(): IUser[]{
    if(!localStorage.getItem('Users')) return [];

    return JSON.parse(localStorage.getItem('Users'));
  }

  getLastId(): number{
    let id: number = 1;
    if(!localStorage.getItem('Users')) return id;

    const users = this.getAllUsers();
    if(users.length === 0) return id ;

    id = users[users.length - 1].id + 1;
    return id;
  }

  getUserById(user_id: number): IUser{
    if(!localStorage.getItem('Users')) return null;

    return this.getAllUsers().find(user => user.id === user_id);
  }

  getUsernameById(user_id: number): string{
    if(!localStorage.getItem('Users')) return "";

    return this.getAllUsers().find(user => user.id === user_id).username;
  }

}
