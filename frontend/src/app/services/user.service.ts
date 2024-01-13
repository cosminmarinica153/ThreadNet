import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NotFoundError, Observable, map } from 'rxjs';
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

  getUserComments(id: number): Observable<IUserComment[]>{
    return this.http.get<IUserComment[]>(environment.baseUrl + `User/getComents${id}`);
  }

  // POST
  postUser(user: ICreateUserDto): Observable<boolean>{
    const url = environment.baseUrl + 'User/createUser';

    return this.http.post(url, user, { responseType: 'text' }).pipe(
      map(data => {return data != null}));
  }

  postFollower(follower: IFollower): Observable<boolean>{
    const url = environment.baseUrl + 'User/createFollower';

    return this.http.post(url, follower, { responseType: 'text' }).pipe(
      map(data => {return data != null}));
  }

  postFavouriteCategory(favouriteCategory: IFavouriteCategory): Observable<boolean>{
    const url = environment.baseUrl + 'User/createFavouriteCategory';

    return this.http.post(url, favouriteCategory, { responseType: 'text' }).pipe(
      map(data => {return data != null}));
  }

  postFavouriteThread(favouriteThread: IFavouriteThread): Observable<boolean>{
    const url = environment.baseUrl + 'User/createFavouriteThread';

    return this.http.post(url, favouriteThread, { responseType: 'text' }).pipe(
      map(data => {return data != null}));
  }

  postVoteThread(voteThread: IVote): Observable<boolean>{
    const url = environment.baseUrl + 'User/createVoteThread';

    return this.http.post(url, voteThread, { responseType: 'text' }).pipe(
      map(data => {return data != null}));
  }

  postVoteComment(voteComment: IVote): Observable<boolean>{
    const url = environment.baseUrl + 'User/createVoteComment';

    return this.http.post(url, voteComment, { responseType: 'text' }).pipe(
      map(data => {return data != null}));
  }

  postVoteCommentReply(voteCommentReply: IVote): Observable<boolean>{
    const url = environment.baseUrl + 'User/createVoteCommentReply';

    return this.http.post(url, voteCommentReply, { responseType: 'text' }).pipe(
      map(data => {return data != null}));
  }

  // PUT
  putUser(user: IUser): Observable<boolean>{
    const url = environment.baseUrl + `User/updateUser`;

    return this.http.put(url, user, { responseType: 'text' }).pipe(
      map(data => {return data != null}));
  }

  putVoteThread(voteThread: IVote): Observable<boolean>{
    const url = environment.baseUrl + `User/updateVoteThread`

    return this.http.put(url, voteThread, { responseType: 'text' }).pipe(
      map(data => {return data != null}));
  }

  putVoteComment(voteComment: IVote): Observable<boolean>{
    const url = environment.baseUrl + `User/updateVoteComment`;

    return this.http.put(url, voteComment, { responseType: 'text' }).pipe(
      map(data => {return data != null}));
  }

  putVoteCommentReply(voteCommentReply: IVote): Observable<boolean>{
    const url = environment.baseUrl + `User/updateVoteCommentReply`;

    return this.http.put(url, voteCommentReply, { responseType: 'text' }).pipe(
      map(data => {return data != null}));
  }

  // DELETE

  deleteUser(id: number): Observable<boolean>{
    const url = environment.baseUrl + `User/deleteUser${id}`;

    return this.http.delete(url, { responseType: 'text' }).pipe(
      map(data => {return data != null}));
  }

  deleteFollower(follower: IFollower): Observable<boolean>{
    const url = environment.baseUrl + `User/deleteFollower`;

    return this.http.delete(url, { body: follower, responseType: 'text'}).pipe(
      map(data => {return data != null}));
  }

  deleteFollowing(following: IFollower): Observable<boolean>{
    const url = environment.baseUrl + `User/deleteFollowing`;

    return this.http.delete(url, { body: following, responseType: 'text' }).pipe(
      map(data => {return data != null}));
  }

  deleteFavouriteCategory(favouriteCategory: IFavouriteCategory): Observable<boolean>{
    const url = environment.baseUrl + `User/deleteFavouriteCategory`;

    return this.http.delete(url, { body: favouriteCategory, responseType: 'text' }).pipe(
      map(data => {return data != null}));
  }

  deleteFavouriteThread(favouriteThread: IFavouriteThread): Observable<boolean>{
    const url = environment.baseUrl + `User/deleteFavouriteThread`;

    return this.http.delete(url, { body: favouriteThread, responseType: 'text' }).pipe(
      map(data => {return data != null}));
  }

  deleteVoteThread(voteThread: IDeleteVoteDto): Observable<boolean>{
    const url = environment.baseUrl + `User/deleteVoteThread`;

    return this.http.delete(url, { body: voteThread, responseType: 'text' }).pipe(
      map(data => {return data != null}));
  }

  deleteVoteComment(voteComment: IDeleteVoteDto): Observable<boolean>{
    const url = environment.baseUrl + `User/deleteVoteComment`;

    return this.http.delete(url, { body: voteComment, responseType: 'text' }).pipe(
      map(data => {return data != null}));
  }

  deleteVoteCommentReply(voteCommentReply: IDeleteVoteDto): Observable<boolean>{
    const url = environment.baseUrl + `User/deleteVoteCommentReply`;

    return this.http.delete(url, { body: voteCommentReply, responseType: 'text' }).pipe(
      map(data => {return data != null}));
  }

  // MISC METHODS
  // User Validation Checks
  checkUniqueUsername(username: string): Observable<boolean>{
    // IMPLEMENT IN BACKEND
    throw NotFoundError;
  }

}
