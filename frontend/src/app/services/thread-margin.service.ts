import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThreadMarginService {
  private isLeftComponentOpen = new BehaviorSubject<boolean>(true);
  isLeftComponentOpen$ = this.isLeftComponentOpen.asObservable();

constructor() { }

  toggleLeftComponent() {
    this.isLeftComponentOpen.next(!this.isLeftComponentOpen.value);
  }
}
