import { NgModule, createNgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { CategoryComponent } from './threads/category/category.component';
import { ThreadCardComponent } from './threads/thread-card/thread-card.component';
import { ThreadDetailsComponent } from './threads/thread-details/thread-details.component';
import { AccountComponent } from './user/account/account.component';
import { ChatComponent } from './user/chat/chat.component';
import { CommentComponent } from './user/comment/comment.component';
import { FriendListComponent } from './user/friend-list/friend-list.component';
import { ThreadHeaderComponent } from './threads/thread-header/thread-header.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CategoryComponent,
    ThreadCardComponent,
    ThreadDetailsComponent,
    AccountComponent,
    ChatComponent,
    CommentComponent,
    FriendListComponent,
    ThreadHeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
