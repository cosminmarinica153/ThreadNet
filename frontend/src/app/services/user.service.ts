import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from '../interfaces/TableInterfaces/IUser';
import { IUserComment } from '../interfaces/MiscInterfaces/IUserComment';
import { ICreateUserDto } from '../interfaces/Dto/ICreateUserDto';
import { IUserInteractions } from '../interfaces/MiscInterfaces/IUserInteractions';
import { IFollower } from '../interfaces/TableInterfaces/IFollower';
import { ICategory } from '../interfaces/TableInterfaces/ICategory';
import { IFavouriteCategory } from '../interfaces/TableInterfaces/IFavouriteCategory';
import { IThread } from '../interfaces/TableInterfaces/IThread';
import { IFavouriteThread } from '../interfaces/TableInterfaces/IFavouriteThread';
import { IVote } from '../interfaces/MiscInterfaces/IVote';
import { IDeleteVoteDto } from '../interfaces/Dto/IDeleteVoteDto';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  // CRUD OPERATIONS
  // GET
  getOne(id: number): Observable<IUser>{
    return this.http.get<IUser>(environment.baseUrl + `User/getOne${id}`);
  }

  getAll(): Observable<IUser[]>{
    return this.http.get<IUser[]>(environment.baseUrl + `User/getAll`);
  }

  getInteractions(id: number): Observable<IUserInteractions>{
    return this.http.get<IUserInteractions>(environment.baseUrl + `User/getInteractions${id}`);
  }

  getProfileScore(id: number): Observable<number>{
    return this.http.get<number>(environment.baseUrl + `User/getProfileScore${id}`);
  }

  getFollowers(id: number): Observable<IUser[]>{
    return this.http.get<IUser[]>(environment.baseUrl + `User/getFollowers${id}`);
  }

  getFollowing(id: number): Observable<IUser[]>{
    return this.http.get<IUser[]>(environment.baseUrl + `User/getFollowing${id}`);
  }

  getFavouriteCategories(id: number): Observable<ICategory[]>{
    return this.http.get<ICategory[]>(environment.baseUrl + `User/getFavouriteCategories${id}`);
  }

  getFavouriteThreads(id: number): Observable<IThread[]>{
    return this.http.get<IThread[]>(environment.baseUrl + `User/getFavouriteThreads${id}`);
  }

  getThreads(id: number): Observable<IThread[]>{
    return this.http.get<IThread[]>(environment.baseUrl + `User/getThreads${id}`);
  }

  getUserComments(id: number): Observable<IUserComment[]>{ // !!!!!!!!!!!!!!!!!!
    return this.http.get<IUserComment[]>(environment.baseUrl + `User/getComents${id}`);
  }

  // POST
  postUser(user: ICreateUserDto): boolean{
    return Boolean(this.http.post<IUser>(environment.baseUrl + `User/createUser`, user));
  }

  postFollower(follower: IFollower): boolean{
    return Boolean(this.http.post<IFollower>(environment.baseUrl + `User/createFollower`, follower));
  }

  postFavouriteCategory(favouriteCategory: IFavouriteCategory): boolean{
    return Boolean(this.http.post<IFavouriteCategory>(environment.baseUrl + `User/createFavouriteCategory`, favouriteCategory));
  }

  postFavouriteThread(favouriteThread: IFavouriteThread): boolean{
    return Boolean(this.http.post<IFavouriteThread>(environment.baseUrl + `User/createFavouriteThread`, favouriteThread));
  }

  postVoteThread(voteThread: IVote): boolean{
    return Boolean(this.http.post<IVote>(environment.baseUrl + `User/createVoteThread`, voteThread));
  }

  postVoteComment(voteComment: IVote): boolean{
    return Boolean(this.http.post<IVote>(environment.baseUrl + `User/createVoteComment`, voteComment));
  }

  postVoteCommentReply(voteCommentReply: IVote): boolean{
    return Boolean(this.http.post<IVote>(environment.baseUrl + `User/createVoteCommentReply`, voteCommentReply));
  }

  // PUT
  putUser(user: IUser): boolean{
    return Boolean(this.http.put<IUser>(environment.baseUrl + `User/updateUser`, user));
  }

  putVoteThread(voteThread: IVote): boolean{
    return Boolean(this.http.put<IVote>(environment.baseUrl + `User/updateVoteThread`, voteThread));
  }

  putVoteComment(voteComment: IVote): boolean{
    return Boolean(this.http.put<IVote>(environment.baseUrl + `User/updateVoteComment`, voteComment));
  }

  putVoteCommentReply(voteCommentReply: IVote): boolean{
    return Boolean(this.http.put<IVote>(environment.baseUrl + `User/updateVoteCommentReply`, voteCommentReply));
  }

  // DELETE

  deleteUser(id: number): boolean{
    return Boolean(this.http.delete<number>(environment.baseUrl + `User/deleteUser${id}`));
  }

  deleteFollower(follower: IFollower): boolean{
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
      body: follower
    }

    return Boolean(this.http.delete<IFollower>(environment.baseUrl + `User/deleteFollower`, httpOptions));
  }

  deleteFollowing(following: IFollower): boolean{
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
      body: following
    }

    return Boolean(this.http.delete<IFollower>(environment.baseUrl + `User/deleteFollowing`, httpOptions));
  }

  deleteFavouriteCategory(favouriteCategory: IFavouriteCategory): boolean{
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
      body: favouriteCategory
    }

    return Boolean(this.http.delete<IFavouriteCategory>(environment.baseUrl + `User/deleteFavouriteCategory`, httpOptions))
  }

  deleteFavouriteThread(favouriteThread: IFavouriteThread): boolean{
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
      body: favouriteThread
    }

    return Boolean(this.http.delete<IFavouriteThread>(environment.baseUrl + `User/deleteFavouriteThread`, httpOptions));
  }

  deleteVoteThread(voteThread: IDeleteVoteDto): boolean{
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
      body: voteThread
    }

    return Boolean(this.http.delete<IDeleteVoteDto>(environment.baseUrl + `User/deleteVoteThread`, httpOptions));
  }

  deleteVoteComment(voteComment: IDeleteVoteDto): boolean{
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
      body: voteComment
    }

    return Boolean(this.http.delete<IDeleteVoteDto>(environment.baseUrl + `User/deleteVoteComment`, httpOptions))
  }

  deleteVoteCommentReply(voteCommentReply: IDeleteVoteDto): boolean{
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
      body: voteCommentReply
    }

    return Boolean(this.http.delete<IDeleteVoteDto>(environment.baseUrl + `User/deleteVoteCommentReply`, httpOptions));
  }

  // MISC METHODS
  // User Validation Checks
  checkUniqueUsername(username: string): Boolean{
    // IMPLEMENT IN BACKEND
    return true;
  }

}
