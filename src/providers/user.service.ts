import { User } from 'firebase/app';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import * as firebase from 'firebase/app';


import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

  // lista de usúario do App
  users: FirebaseListObservable<User[]>;

  constructor(
    public af: AngularFireDatabase ,
    public http: Http
  ) {
    console.log('Hello User Provider');
    // seta caminho raiz da lista de usúario
    this.users = this.af.list('/user/');
  }

  // metodo para criar um uśuario setando o mesmo id do banco database
  // obs: .set() cria ou substitui diretório
  creat(user: User): firebase.Promise<void> {
    return this.af.object(`/user/${user.uid}`).set(user);
  }

}
