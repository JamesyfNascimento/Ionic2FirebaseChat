import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireModule , FirebaseAppConfig } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { HttpModule } from '@angular/http';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { Signup } from './../pages/signup/signup';
import { Signin } from './../pages/signin/signin';
import { AuthService } from './../providers/auth-service';
import { UserService } from './../providers/user.service';
import { CustomLoggedHeader } from '../components/custom-logged-header/custom-logged-header';


const firebaseAppConfig: FirebaseAppConfig = {
  apiKey: "AIzaSyD2lMF5nm3FgAyWqQNp6Q20akiE-T_SU_o",
  authDomain: "ionic-2-firebase-chat-3eaef.firebaseapp.com",
  databaseURL: "https://ionic-2-firebase-chat-3eaef.firebaseio.com",
  storageBucket: "ionic-2-firebase-chat-3eaef.appspot.com",
  messagingSenderId: "633521561183"
};

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    Signup,
    Signin,
    CustomLoggedHeader
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseAppConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    HttpModule 
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    Signup,
    Signin 
  ],
  providers: [
    AuthService,
    StatusBar,
    SplashScreen,
    UserService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
