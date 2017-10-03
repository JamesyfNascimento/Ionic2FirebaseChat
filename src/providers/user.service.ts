import { User } from 'firebase/app';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import * as firebase from 'firebase/app';


import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

  constructor(public af: AngularFireDatabase ,public http: Http) {

    console.log('Hello User Provider');
  }

  creat(user: User): firebase.Promise<void> {
    return this.af.list('/user/').push(user);
  }

}
