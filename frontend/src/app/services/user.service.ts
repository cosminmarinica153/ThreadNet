import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { IUser } from '../interfaces/IUser';

@Injectable({
  providedIn: 'root'
})
export class UserService {

constructor(private http: HttpClient) { }

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

  getLastId(): number{
    let users = JSON.parse(localStorage.getItem('Users'));
    return +users.length + 1;
  }

  getAllUsers(): IUser[]{
    return JSON.parse(localStorage.getItem('Users'));
  }

  getUserById(user_id: number): IUser{
    let users = this.getAllUsers();
    return users.find(user => user.id === user_id);
  }

  getUsernameById(user_id: number): string{
    let users = this.getAllUsers();
    return users.find(user => user.id === user_id).username;
  }

}
