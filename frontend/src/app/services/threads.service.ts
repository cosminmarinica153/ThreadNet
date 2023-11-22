import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { IThread } from '../interfaces/IThread';
import { CategoryService } from './category.service';

@Injectable({
  providedIn: 'root'
})
export class ThreadsService {

  constructor(private http : HttpClient, private categoryService: CategoryService) { }

  addThread(thread: IThread){
    let threads = [];
    if(localStorage.getItem('Threads')){
      threads = JSON.parse(localStorage.getItem('Threads'));
      threads = [...threads, thread];
    }
    else{
      threads = [thread];
    }
    localStorage.setItem('Threads', JSON.stringify(threads));
  }

  getLastId(): number{
    let threads = JSON.parse(localStorage.getItem('Threads'));
    return +threads.length + 1;
  }

  getAllThreads(): IThread[]{
    return JSON.parse(localStorage.getItem('Threads'));
  }
  getAllThreadsByCategory(category_name: string): IThread[]{
    const threadsArray: Array<IThread> = [];
    const category_id = this.categoryService.getCategoryId(category_name);
    const data = this.getAllThreads();
    data.forEach(thread => {
      if(thread.category_id === category_id)
        threadsArray.push(thread);
    })
    return threadsArray;
  }

  getThreadById(thread_id: number): IThread{
    let threads = this.getAllThreads();
    return threads.find(thread => thread.id === thread_id);
  }
}
