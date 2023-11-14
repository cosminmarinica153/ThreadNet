// EXTERNAL IMPORTS
import { NgModule, createNgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule} from '@angular/router';


// MODULES
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// COMPONENTS
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HomeContentComponent } from './layout/home-content/home-content.component';
import { AboutContentComponent } from './layout/about-content/about-content.component';
import { ContactContentComponent } from './layout/contact-content/contact-content.component';
import { CategoryMenuComponent } from './threads/category-menu/category-menu.component';
import { CategoryListComponent } from './threads/category-list/category-list.component';
import { CategoryComponent } from './threads/category/category.component';
import { ThreadHeaderComponent } from './threads/thread-header/thread-header.component';
import { ThreadListComponent } from './threads/thread-list/thread-list.component';
import { ThreadCardComponent } from './threads/thread-card/thread-card.component';
import { ThreadDetailsComponent } from './threads/thread-details/thread-details.component';
import { AccountComponent } from './user/account/account.component';
import { ChatComponent } from './user/chat/chat.component';
import { FriendListComponent } from './user/friend-list/friend-list.component';
import { CommentListComponent } from './user/comment-list/comment-list.component';
import { CommentComponent } from './user/comment/comment.component';
// FORM COMPONENTS
import { LoginComponent } from './forms/login/login.component';
import { RegisterComponent } from './forms/register/register.component';
import { SearchComponent } from './forms/search/search.component';
import { ReactDislikeComponent } from './forms/react-dislike/react-dislike.component';
import { ReactLikeComponent } from './forms/react-like/react-like.component';
import { ReactFavouriteComponent } from './forms/react-favourite/react-favourite.component';

// SERVICES
import { ThreadsService } from './services/threads.service';
import { CommentsService } from './services/comments.service';
import { UsersService } from './services/users.service';
import { ThreadMarginService } from './services/thread-margin.service';
import { Router } from '@angular/router';

// DIRECTIVES
// import { ModHighlightDirective } from './directives/mod-highlight.directive';

const appRoutes: Routes = [
  {
    path: '',
    component: HomeContentComponent
  },
  {
    path: 'about',
    component: AboutContentComponent
  },
  {
    path: 'contact',
    component: ContactContentComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeContentComponent,
    AboutContentComponent,
    ContactContentComponent,
    CategoryMenuComponent,
    CategoryListComponent,
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
    LoginComponent,
    RegisterComponent,
    SearchComponent,
    ReactDislikeComponent,
    ReactLikeComponent,
    ReactFavouriteComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    ThreadsService,
    CommentsService,
    UsersService,
    ThreadMarginService,
    // ModHighlightDirective,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
