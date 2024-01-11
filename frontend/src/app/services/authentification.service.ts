import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../interfaces/TableInterfaces/IUser';
import { ICreateUserDto } from '../interfaces/Dto/ICreateUserDto';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

constructor(private userService: UserService, private http: HttpClient) { }

  authUser(username: string, password: string): IUser{
    var user: IUser;
    this.userService.getAll().subscribe(data => {
      user = data.find(u => u.username == username && u.password == password);
    });
    return user;
  }

  login(user: IUser): boolean{
    if(!user) return false;
    localStorage.setItem('token', user.authToken);
    return true;
  }

  logout(){
    if(localStorage.getItem('token'))
      localStorage.removeItem('token');
  }

  isLoggedIn(): boolean{
    if(localStorage.getItem('token')) return true;
    else return false;
  }

  getUserId(): number{
    if(!localStorage.getItem('token')) return null;

    var users: IUser[];

    this.userService.getAll().subscribe(
      data =>{
        users = data;
    });

    const userId: number = users.find(user => user.authToken === localStorage.getItem('token')).id;
    return userId;
  }

  generateUniqueToken(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let token = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charactersLength);
      token += characters.charAt(randomIndex);
    }

    const timestamp = Date.now().toString(36);
    token += timestamp;

    return token;
  }

}
