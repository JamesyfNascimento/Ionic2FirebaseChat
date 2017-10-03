import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';
 
@Injectable()
export class AuthService {
 
 constructor(public http: Http,
 public afAuth: AngularFireAuth) {
 console.log('Hello AuthProvider Provider');
 }
 createAuthUser(user: {email: string, password: string}): firebase.Promise<firebase.User> {
 return this.afAuth.auth.createUserWithEmailAndPassword(user.email,user.password);
 }
}