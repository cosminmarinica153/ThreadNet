import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { IThread } from '../interfaces/IThread';

@Injectable({
  providedIn: 'root'
})
export class ThreadsService {

  constructor(private http : HttpClient) { }

  getAllThreads(): Observable<IThread[]>{
    return this.http.get(`data/threads.json`).pipe(
      map(data => {
        const threadsArray: Array<IThread> = [];
        for(const id in data){
          if(data.hasOwnProperty(id)){
            threadsArray.push(data[id]);
          }
        }
        return threadsArray;
      })
    );
  }
}
