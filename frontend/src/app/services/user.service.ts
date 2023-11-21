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
      users = [user, ...users];
    }
    else{
      users = [user];
    }
    localStorage.setItem('Users', JSON.stringify(users));
  }

  getAllUsers(){
    return this.http.get('data/comments.json').pipe(
      map(data => {
        const usersArray: Array<IUser> = [];
        for(const id in data){
          if(data.hasOwnProperty(id)){
            usersArray.push(data[id]);
          }
        }
        return usersArray;
      })
    );
  }

  getUserById(user_id: number): Observable<IUser>{
    return this.http.get('data/users.json').pipe(
      map(data => {
        for(const id in data){
          if(data.hasOwnProperty(id) && data[id].id === user_id){
            return data[id];
          }
        }
      })
    )
  }

  getUsernameById(user_id: number): Observable<string>{
    return this.http.get('data/users.json').pipe(
      map(data => {
        for(const id in data){
          if(data.hasOwnProperty(id) && data[id].id === user_id){
            return data[id].username;
          }
        }
      })
    )
  }

}
