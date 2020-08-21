import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import {ElementsModule} from '@wizdm/elements';
import {AnimateModule} from '@wizdm/animate';
import {EmojiSupportModule} from '@wizdm/emoji';

import { AuthModule } from '@wizdm/connect/auth';
import { ConnectModule, ConnectConfig } from '@wizdm/connect';
import { DatabaseModule } from '@wizdm/connect/database';
import { ContentModule, ContentLoader, DefaultLoader } from './content';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { MatIconModule } from '@angular/material/icon';
import {AvatarComponent} from '@wizdm/elements/avatar';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button'
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list'; 
import {MatSidenavModule} from '@angular/material/sidenav'; 

import { IconModule } from '@wizdm/elements/icon';
import { LoginComponent } from './login/login.component';
import { FeedsComponent } from './feeds/feeds.component';
// import { ReadmeComponent } from './readme/readme.component';

import { ReadmeModule } from './readme/readme.module';

const firebase: ConnectConfig = {
  apiKey: "AIzaSyDsSW-DHrd_1TKJNdUcbqHRVndYGs1ZpZc",
  authDomain: "sample-96a3c.firebaseapp.com",
  databaseURL: "https://sample-96a3c.firebaseio.com",
  projectId: "sample-96a3c",
  storageBucket: "sample-96a3c.appspot.com",
  messagingSenderId: "166957950901",
  appId: "1:166957950901:web:2b104c0bf9e88cba429bfc",
};

export const appname: string = 'wizdm';

@NgModule({
  imports:      [   
    BrowserModule, 
    BrowserAnimationsModule,
    FormsModule, 
    ReactiveFormsModule,
    FlexLayoutModule, 

    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatToolbarModule,
    MatDividerModule,
    MatListModule,
    MatSidenavModule,

    AnimateModule,
    ElementsModule,
    EmojiSupportModule,
    IconModule,

    ReadmeModule,
     ContentModule.init({ selector: 'lang', supportedValues: ['en', 'it', 'ru'] }),

    ConnectModule.init(firebase, appname),
    AuthModule, DatabaseModule,

    AppRoutingModule
  ],
  
  declarations: [ 
    AppComponent, 
    AvatarComponent, LoginComponent, FeedsComponent

  ],

  providers: [],
  
  bootstrap: [ AppComponent ]
})
export class AppModule { }
