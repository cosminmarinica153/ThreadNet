import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { IThread } from '../interfaces/TableInterfaces/IThread';
import { ICreateThreadDto } from '../interfaces/Dto/ICreateThreadDto';
import { IUpdateThreadDto } from '../interfaces/Dto/IUpdateThreadDto';
import { IThreadInteractions } from '../interfaces/MiscInterfaces/IThreadInteractions';
import { IUser } from '../interfaces/TableInterfaces/IUser';
import { IComment } from '../interfaces/TableInterfaces/IComment';

@Injectable({
  providedIn: 'root'
})
export class ThreadsService {

  constructor(private http : HttpClient) { }

  // CRUD OPERATIONS
  // GET
  getOne(id: number): Observable<IThread>{
    return this.http.get<IThread>(environment.baseUrl + `Thread/getOne${id}`);
  }

  getAll(): Observable<IThread[]>{
    return this.http.get<IThread[]>(environment.baseUrl + `Thread/getAll`);
  }

  getInteractions(id: number): Observable<IThreadInteractions>{
    return this.http.get<IThreadInteractions>(environment.baseUrl + `Thread/getInteractions${id}`);
  }

  getPopularityScore(id: number): Observable<number>{
    return this.http.get<number>(environment.baseUrl + `Thread/getPopularityScore${id}`);
  }

  getDiscussionParticipants(id: number): Observable<IUser[]>{
    return this.http.get<IUser[]>(environment.baseUrl + `Thread/getDiscussionParticipants${id}`);
  }

  getComments(id: number): Observable<IComment[]>{
    return this.http.get<IComment[]>(environment.baseUrl + `Thread/getComments${id}`);
  }

  // POST
  postThread(thread: ICreateThreadDto): boolean{
    return Boolean(this.http.post<ICreateThreadDto>(environment.baseUrl + `Thread/creadThread`, thread));
  }

  // PUT
  putThread(thread: IUpdateThreadDto): boolean{
    return Boolean(this.http.put<IUpdateThreadDto>(environment.baseUrl + `Thread/updateThread`, thread));
  }

  // DELETE
  deleteThread(id: number): boolean{
    return Boolean(this.http.delete<number>(environment.baseUrl + `Thread/deleteThread${id}`));
  }
}
