// EXTERNAL IMPORTS
import { NgModule, createNgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { Router, Routes, RouterModule} from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

// MODULES
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// COMPONENTS
import { AppComponent } from './app.component';

import { HeaderComponent } from './components/layout/header/header.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { HomeContentComponent } from './components/page-content/home-content/home-content.component';
import { AboutContentComponent } from './components/page-content/about-content/about-content.component';
import { ContactContentComponent } from './components/page-content/contact-content/contact-content.component';
import { ThreadListContentComponent } from './components/page-content/thread-details-content/thread-details-content.component';

import { CategoryMenuComponent } from './category/category-menu/category-menu.component';
import { CategoryListComponent } from './category/category-list/category-list.component';
import { CategoryCardComponent } from './category/category-card/category-card.component';

import { ThreadHeaderComponent } from './components/threads/thread-header/thread-header.component';
import { ThreadListComponent } from './components/threads/thread-list/thread-list.component';
import { ThreadCardComponent } from './components/threads/thread-card/thread-card.component';
import { ThreadDetailsComponent } from './components/threads/thread-details/thread-details.component';

import { AccountComponent } from './components/user/account/account.component';
import { ChatComponent } from './components/user/chat/chat.component';
import { FriendListComponent } from './components/user/friend-list/friend-list.component';
import { CommentListComponent } from './components/comments/comment-list/comment-list.component';
import { CommentComponent } from './components/comments/comment/comment.component';
// FORM COMPONENTS
import { LoginComponent } from './components/forms/login/login.component';
import { RegisterComponent } from './components/forms/register/register.component';
import { SearchComponent } from './components/forms/search/search.component';
import { ReactDislikeComponent } from './components/forms/react-dislike/react-dislike.component';
import { ReactLikeComponent } from './components/forms/react-like/react-like.component';
import { ReactFavouriteComponent } from './components/forms/react-favourite/react-favourite.component';

// SERVICES
import { ThreadsService } from './services/threads.service';
import { CommentsService } from './services/comments.service';
import { UserService } from './services/user.service';
import { ThreadMarginService } from './services/thread-margin.service';
import { AuthentificationService } from './services/authentification.service';

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
  },
  {
    path: 'thread_test',
    component: ThreadListContentComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    // Layout Components
    HeaderComponent,
    FooterComponent,
    // Content Components
    HomeContentComponent,
    AboutContentComponent,
    ContactContentComponent,
    ThreadListContentComponent,
    // Category Components
    CategoryMenuComponent,
    CategoryListComponent,
    CategoryCardComponent,
    // Thread Components
    ThreadCardComponent,
    ThreadDetailsComponent,
    ThreadHeaderComponent,
    ThreadListComponent,
    // User Related Components
    AccountComponent,
    FriendListComponent,
    ChatComponent,
    CommentComponent,
    CommentListComponent,
    LoginComponent,
    RegisterComponent,
    // Interaction Components
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
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    // Services
    ThreadsService,
    CommentsService,
    UserService,
    ThreadMarginService,
    AuthentificationService
    // Directives,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
