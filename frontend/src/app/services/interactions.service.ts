import { Injectable } from '@angular/core';
import { AuthentificationService } from './authentification.service';
import { IInteraction } from '../interfaces/IInteraction';
import { BehaviorSubject, Observable } from 'rxjs';
import { ThreadsService } from './threads.service';
import { CommentsService } from './comments.service';

@Injectable({
  providedIn: 'root'
})
export class InteractionsService {
  user_id: number;
  sortObj: Object;

  private threadEdit = new BehaviorSubject<boolean>(false);
  private commentEdit = new BehaviorSubject<boolean>(false);
  private replyEdit = new BehaviorSubject<boolean>(false);

  constructor(private authService: AuthentificationService,
              ) {
    this.user_id = authService.getUserId();
    this.sortObj = {type: 'date', order: "desc"};
  }
  getAllInteractions(): IInteraction[]{
    if(!localStorage.getItem('Interactions')) return [];
    const interactions = JSON.parse(localStorage.getItem('Interactions'));

    return interactions;
  }
  getSort(){
    return this.sortObj;
  }
  setSort(obj: Object){
    this.sortObj = obj;
  }

  // USER INTERACTIONS
  getUserInteractions(user_id: number): IInteraction{
    if(!localStorage.getItem('Interactions')) return null;

    const interactions = JSON.parse(localStorage.getItem('Interactions'));
    const interaction = interactions.find((interaction: IInteraction) => interaction.user_id === user_id);

    return interaction;
  }
  getUserInteractionsObj(user_id: number): Object{
    const interactions = this.getUserInteractions(user_id);
    if(!interactions) return {
      liked_threads: 0,
      disliked_threads: 0,
      liked_replies: 0,
      disliked_replies: 0
    };

    const likedThreads = interactions.liked_threads.length;
    const dislikedThreads = interactions.disliked_threads.length;
    const likedReplies = interactions.liked_comments.length + interactions.liked_replies.length;
    const dislikedReplies = interactions.disliked_comments.length + interactions.disliked_replies.length;

    const interactionsObject: Object = {
      liked_threads: likedThreads,
      disliked_threads: dislikedThreads,
      liked_replies: likedReplies,
      disliked_replies: dislikedReplies
    };

    return interactionsObject;
  }
  addFriend(user_id: number){
    if(!this.getUserInteractions(this.user_id)) return;

    const interaction: IInteraction = this.getUserInteractions(this.user_id);

    if(!interaction.friends.find(id => id === user_id)){
      interaction.friends.push(user_id);
      this.updateInteraction(interaction);
    }
  }
  removeFriend(user_id: number){
    if(!this.getUserInteractions(this.user_id)) return;

    const interaction: IInteraction = this.getUserInteractions(this.user_id);

    if(interaction.friends.find(id => id === user_id)){
      interaction.friends.splice(interaction.friends.indexOf(user_id), 1);
      this.updateInteraction(interaction);
    }
  }
  isUserFriend(user_id: number, friend_id: number): boolean{
    return Boolean(this.getUserInteractions(user_id).friends.find(user => user === friend_id));
  }
  // THREAD INTERACTIONS
  setThreadEdit(value: boolean) {
    this.threadEdit.next(value);
  }
  getThreadEdit(): Observable<boolean>{
    return this.threadEdit.asObservable();
  }
  likeThread(thread_id: number){
    if(!this.getUserInteractions(this.user_id)) return;

    const interaction: IInteraction = this.getUserInteractions(this.user_id);

    if(!interaction.liked_threads.length){
      interaction.liked_threads.push(thread_id);
      this.updateInteraction(interaction);
      return;
    }

    if(!interaction.liked_threads.find(id => id === thread_id)){
      interaction.liked_threads.push(thread_id);
      this.updateInteraction(interaction);
      return;
    }

    interaction.liked_threads.splice(interaction.liked_threads.indexOf(thread_id), 1);
    this.updateInteraction(interaction);
  }
  dislikeThread(thread_id: number){
    if(!this.getUserInteractions(this.user_id)) return;

    const interaction: IInteraction = this.getUserInteractions(this.user_id);

    if(!interaction.disliked_threads.length){
      interaction.disliked_threads.push(thread_id);
      this.updateInteraction(interaction);
      return;
    }

    if(!interaction.disliked_threads.find(id => id === thread_id)){
      interaction.disliked_threads.push(thread_id);
      this.updateInteraction(interaction);
      return;
    }

    interaction.disliked_threads.splice(interaction.disliked_threads.indexOf(thread_id), 1);
    this.updateInteraction(interaction);
  }
  isLikedThread(thread_id: number): boolean{
    if(!this.getUserInteractions(this.user_id)) return false;
    
    const interaction = this.getUserInteractions(this.user_id);
    if(interaction.liked_threads.find(id => id === thread_id)) return true;
    else
      return false;
  }
  isDislikedThread(thread_id: number): boolean{
    if(!this.getUserInteractions(this.user_id)) return false;
    
    const interaction = this.getUserInteractions(this.user_id);
    if(interaction.disliked_threads.find(id => id === thread_id)) return true;
    else
      return false;
  }
  favouriteThread(thread_id: number){
    if(!this.getUserInteractions(this.user_id)) return;

    const interaction: IInteraction = this.getUserInteractions(this.user_id);

    if(!interaction.favourite_threads.length){
      interaction.favourite_threads.push(thread_id);
      this.updateInteraction(interaction);
      return;
    }

    if(!interaction.favourite_threads.find(id => id === thread_id)){
      interaction.favourite_threads.push(thread_id);
      this.updateInteraction(interaction);
      return;
    }

    interaction.favourite_threads.splice(interaction.favourite_threads.indexOf(thread_id), 1);
    this.updateInteraction(interaction);
  }
  isFavouriteThread(thread_id: number): boolean{
    if(!this.getUserInteractions(this.user_id)) return false;

    const interaction = this.getUserInteractions(this.user_id);
    if(interaction.favourite_threads.find(id => id === thread_id)) return true;
    else
      return false;
  }
  getFavouriteThreads(): number[]{
    if(!this.getUserInteractions(this.user_id)) return [];

    return this.getUserInteractions(this.user_id).favourite_threads;
  }
  removeThreadInteractions(thread_id:number){
    if(!this.getUserInteractions(this.user_id)) return;
    
    if(this.isLikedThread(thread_id)) this.likeThread(thread_id);
    if(this.isDislikedThread(thread_id)) this.dislikeThread(thread_id);
    if(this.isFavouriteThread(thread_id)) this.favouriteThread(thread_id);
  }
  // COMMENT INTERACTIONS
  setCommentEdit(value: boolean) {
    this.commentEdit.next(value);
  }
  getCommentEdit(): Observable<boolean>{
    return this.commentEdit.asObservable();
  }
  likeComment(comment_id: number){
    if(!this.getUserInteractions(this.user_id)) return;

    const interaction: IInteraction = this.getUserInteractions(this.user_id);

    if(!interaction.liked_comments.length){
      interaction.liked_comments.push(comment_id);
      this.updateInteraction(interaction);
      return;
    }

    if(!interaction.liked_comments.find(id => id === comment_id)){
      interaction.liked_comments.push(comment_id);
      this.updateInteraction(interaction);
      return;
    }

    interaction.liked_comments.splice(interaction.liked_comments.indexOf(comment_id), 1);
    this.updateInteraction(interaction);
  }
  dislikeComment(comment_id: number){
    if(!this.getUserInteractions(this.user_id)) return;

    const interaction: IInteraction = this.getUserInteractions(this.user_id);

    if(!interaction.disliked_comments.length){
      interaction.disliked_comments.push(comment_id);
      this.updateInteraction(interaction);
      return;
    }

    if(!interaction.disliked_comments.find(id => id === comment_id)){
      interaction.disliked_comments.push(comment_id);
      this.updateInteraction(interaction);
      return;
    }

    interaction.disliked_comments.splice(interaction.disliked_comments.indexOf(comment_id), 1);
    this.updateInteraction(interaction);
  }
  isLikedComment(comment_id: number){
    if(!this.getUserInteractions(this.user_id)) return false;
    
    const interaction = this.getUserInteractions(this.user_id);
    if(interaction.liked_comments.find(id => id === comment_id)) return true;
    else
      return false;
  }
  isDislikedComment(comment_id: number){
    if(!this.getUserInteractions(this.user_id)) return false;
    
    const interaction = this.getUserInteractions(this.user_id);
    if(interaction.disliked_comments.find(id => id === comment_id)) return true;
    else
      return false;
  }
  removeCommentInteractions(comment_id:number){
    if(!this.getUserInteractions(this.user_id)) return;
    
    if(this.isLikedComment(comment_id)) this.likeComment(comment_id);
    if(this.isDislikedComment(comment_id)) this.dislikeComment(comment_id);
  }
  // REPLY INTERACTIONS
  setReplyEdit(value: boolean) {
    this.replyEdit.next(value);
  }
  getReplyEdit(): Observable<boolean>{
    return this.replyEdit.asObservable();
  }
  likeReply(reply_id: number){
    if(!this.getUserInteractions(this.user_id)) return;

    const interaction: IInteraction = this.getUserInteractions(this.user_id);

    if(!interaction.liked_replies.length){
      interaction.liked_replies.push(reply_id);
      this.updateInteraction(interaction);
      return;
    }

    if(!interaction.liked_replies.find(id => id === reply_id)){
      interaction.liked_replies.push(reply_id);
      this.updateInteraction(interaction);
      return;
    }

    interaction.liked_replies.splice(interaction.liked_replies.indexOf(reply_id), 1);
    this.updateInteraction(interaction);
  }
  dislikeReply(reply_id: number){
    if(!this.getUserInteractions(this.user_id)) return;

    const interaction: IInteraction = this.getUserInteractions(this.user_id);

    if(!interaction.disliked_replies.length){
      interaction.disliked_replies.push(reply_id);
      this.updateInteraction(interaction);
      return;
    }

    if(!interaction.disliked_replies.find(id => id === reply_id)){
      interaction.disliked_replies.push(reply_id);
      this.updateInteraction(interaction);
      return;
    }

    interaction.disliked_replies.splice(interaction.disliked_replies.indexOf(reply_id), 1);
    this.updateInteraction(interaction);
  }
  isLikedReply(reply_id: number){
    if(!this.getUserInteractions(this.user_id)) return false;
    
    const interaction = this.getUserInteractions(this.user_id);
    if(interaction.liked_replies.find(id => id === reply_id)) return true;
    else
      return false;
  }
  isDislikedReply(reply_id: number){
    if(!this.getUserInteractions(this.user_id)) return false;
    
    const interaction = this.getUserInteractions(this.user_id);
    if(interaction.disliked_replies.find(id => id === reply_id)) return true;
    else
      return false;
  }
  removeReplyInteractions(reply_id:number){
    if(!this.getUserInteractions(this.user_id)) return;
    
    if(this.isLikedReply(reply_id)) this.likeReply(reply_id);
    if(this.isDislikedReply(reply_id)) this.dislikeReply(reply_id);
  }
  // CATEGORY INTERACTIONS
  favouriteCategory(category_id: number){
    if(!this.getUserInteractions(this.user_id)) return;

    const interaction: IInteraction = this.getUserInteractions(this.user_id);

    if(!interaction.favourite_categories.length){
      interaction.favourite_categories.push(category_id);
      this.updateInteraction(interaction);
      return;
    }

    if(!interaction.favourite_categories.find(id => id === category_id)){
      interaction.favourite_categories.push(category_id);
      this.updateInteraction(interaction);
      return;
    }

    interaction.favourite_categories.splice(interaction.favourite_categories.indexOf(category_id), 1);
    this.updateInteraction(interaction);
  }
  isFavouriteCategory(category_id: number): boolean{
    if(!this.getUserInteractions(this.user_id)) return false;

    const interaction = this.getUserInteractions(this.user_id);
    if(interaction.favourite_categories.find(id => id === category_id)) return true;
    else
      return false;
  }
  getFavouriteCategories(): number[]{
    if(!this.getUserInteractions(this.user_id)) return [];

    return this.getUserInteractions(this.user_id).favourite_categories;
  }
  removeCategoryInteractions(category_id:number){
    if(!this.getUserInteractions(this.user_id)) return;
    
    if(this.isFavouriteCategory(category_id)) this.favouriteCategory(category_id);
  }

  updateInteraction(interaction: IInteraction){
    if(!localStorage.getItem('Interactions')) return;
    
    const interactions = JSON.parse(localStorage.getItem('Interactions'));
    const index = interactions.findIndex((interaction: IInteraction) => interaction.user_id === this.user_id);

    delete interactions[index];
    interactions[index] = interaction;

    localStorage.setItem('Interactions', JSON.stringify(interactions));
  }

}
