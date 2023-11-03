// EXTERNAL IMPORTS
import { NgModule, createNgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

// MODULES
import { AppRoutingModule } from './app-routing.module';

// COMPONENTS
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
import { ThreadListComponent } from './threads/thread-list/thread-list.component';
import { CommentListComponent } from './user/comment-list/comment-list.component';

// SERVICES
import { ThreadsService } from './services/threads.service';

// DIRECTIVES
import { ModHighlightDirective } from './directives/mod-highlight.directive';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CategoryComponent,
    ThreadCardComponent,
    ThreadDetailsComponent,
    ThreadHeaderComponent,
    ThreadListComponent,
    AccountComponent,
    FriendListComponent,
    ChatComponent,
    CommentComponent,
    CommentListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    ThreadsService,
    // ModHighlightDirective,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
