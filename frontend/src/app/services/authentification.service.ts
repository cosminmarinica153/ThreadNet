import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../interfaces/TableInterfaces/IUser';
import { Observable, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

constructor(private userService: UserService, private http: HttpClient) { }

  authUser(username: string, password: string): Observable<IUser>{
    return this.userService.getAll().pipe(
      map(data => data.find(u => u.username == username && u.password == password))
    )
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

  getUserId(): Observable<number>{
    if(!localStorage.getItem('token')) return of(null);

    return this.userService.getAll().pipe(
      map(data =>{
        const userId: number = data.find(user => user.authToken === localStorage.getItem('token')).id;
        return userId;
    }));
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
