import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

constructor() { }

  authUser(user: any){
    let UserArray = [];
    if(localStorage.getItem('Users')){
      UserArray = JSON.parse(localStorage.getItem('Users'));
    }
    return UserArray.find((p: { username: string; password: string; })=> p.username === user.username
                                                                      && p.password === user.password);
  }

}
