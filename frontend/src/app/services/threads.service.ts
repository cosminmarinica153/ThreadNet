import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IThread } from '../interfaces/IThread';
import { CategoryService } from './category.service';
import { AuthentificationService } from './authentification.service';
import { Router } from '@angular/router';
import { CommentsService } from './comments.service';
import { InteractionsService } from './interactions.service';

@Injectable({
  providedIn: 'root'
})
export class ThreadsService {

  constructor(private router: Router, private http : HttpClient, private authService: AuthentificationService,
              private categoryService: CategoryService, private commentsService: CommentsService, private interaction: InteractionsService) { }

  addThread(thread: IThread){
    let threads = [];
    if(localStorage.getItem('Threads')){
      threads = JSON.parse(localStorage.getItem('Threads'));
      threads = [...threads, thread];
    }
    else threads = [thread];

    localStorage.setItem('Threads', JSON.stringify(threads));
  }

  getAllThreads(): IThread[]{
    if(!localStorage.getItem('Threads')) return [];

    return JSON.parse(localStorage.getItem('Threads'));
  }

  getLastId(): number{
    let id: number = 1;
    if(!localStorage.getItem('Threads')) return id;

    const threads = this.getAllThreads();
    if(threads.length === 0) return id ;

    id = threads[threads.length - 1].id + 1;
    return id;
  }

  getAllThreadsByCategory(category_name: string): IThread[]{
    if(!localStorage.getItem('Threads')) return [];

    const threadsArray: Array<IThread> = [];
    const category_id = this.categoryService.getCategoryId(category_name);

    this.getAllThreads().forEach(thread => {
      if(thread.category_id === category_id)
        threadsArray.push(thread);
    })
    return threadsArray;
  }

  getThreadById(thread_id: number): IThread{
    if(!localStorage.getItem('Threads')) return null;

    return this.getAllThreads().find(thread => thread.id === thread_id);
  }

  getUserThreads(user_id: number): Array<IThread>{
    if(!localStorage.getItem('Threads')) return [];

    const threadsArray: Array<IThread> = [];
    this.getAllThreads().forEach((thread: IThread) => {
      if(thread.user_id === user_id)
        threadsArray.push(thread);
    });
    return threadsArray;
  }

  deleteThread(thread_id: number){
    const threads = this.getUserThreads(this.authService.getUserId());
    const index = threads.findIndex(thread => thread.id === thread_id);

    threads.splice(index, 1);

    localStorage.setItem('Threads', JSON.stringify(threads));

    this.commentsService.deleteThreadComments(thread_id);

    this.interaction.removeThreadInteractions(thread_id);

    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/category', "My Threads"]);
    });
  }

  editThread(newThread: IThread){
    const threads = this.getUserThreads(this.authService.getUserId());
    const index = threads.findIndex(thread => thread.id === newThread.id);

    threads[index] = newThread;

    localStorage.setItem('Threads', JSON.stringify(threads));
  }

  likeThread(thread_id: number, add: boolean){
    const threads = this.getAllThreads();
    const thread = threads.find(thread => thread.id === thread_id);

    if(add)
      thread.up_votes++;
    else
      thread.up_votes--;

    const index = threads.findIndex((thread: IThread) => thread.user_id === thread_id);

    delete threads[index];
    threads[index] = thread;

    localStorage.setItem('Threads', JSON.stringify(threads));
  }

  dislikeThread(thread_id: number, add: boolean){
    const threads = this.getAllThreads();
    const thread = threads.find(thread => thread.id === thread_id);

    if(add)
      thread.down_votes++;
    else
      thread.down_votes--;

    const index = threads.findIndex((thread: IThread) => thread.user_id === thread_id);

    delete threads[index];
    threads[index] = thread;

    localStorage.setItem('Threads', JSON.stringify(threads));
  }

}
