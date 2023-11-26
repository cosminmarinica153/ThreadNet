import { Injectable } from '@angular/core';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

constructor(private userService: UserService) { }

  authUser(user: any){
    let UserArray = [];
    if(localStorage.getItem('Users')){
      UserArray = JSON.parse(localStorage.getItem('Users'));
    }
    return UserArray.find((p: { username: string; password: string; })=> p.username === user.username
                                                                      && p.password === user.password);
  }

  login(user: any): boolean{
    if(!user)
      return false;
    localStorage.setItem('token', user.auth_token);
    return true;
  }

  logout(){
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean{
    return Boolean(localStorage.getItem('token'));
  }

  getUserId(): number{
    const users = this.userService.getAllUsers();
    const userId: number = users.find(user => user.auth_token === localStorage.getItem('token')).id;
    return userId;
  }

}
