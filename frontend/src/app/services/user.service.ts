import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/IUser';
import { IInteraction } from '../interfaces/IInteraction';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getAllUsersApi(): Observable<string[]> {
    return this.http.get<string[]>(this.baseUrl + 'User/getAll');
  }

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

    const array: Array<number> = [];

    const interaction: IInteraction = {
      user_id: user.id,
      liked_threads: array,
      disliked_threads: array,
      liked_comments: array,
      disliked_comments: array,
      liked_replies: array,
      disliked_replies: array,
      favourite_threads: array,
      favourite_categories: array,
      friends: array,
    }
    let interactions = [];
    if(localStorage.getItem('Interactions')){
      interactions = JSON.parse(localStorage.getItem('Interactions'));
      interactions = [...interactions, interaction];
    }
    else{
      interactions = [interaction];
    }
    localStorage.setItem('Interactions', JSON.stringify(interactions));
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

  getUserByUsername(username: string): IUser{
    if(!localStorage.getItem('Users')) return null;

    return this.getAllUsers().find(user => user.username === username);
  }

  getUsernameById(user_id: number): string{
    if(!localStorage.getItem('Users')) return "";

    return this.getAllUsers().find(user => user.id === user_id).username;
  }

}
