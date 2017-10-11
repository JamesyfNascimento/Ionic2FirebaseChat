import { Users } from './../models/user.module';
import { User } from 'firebase/app';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import * as firebase from 'firebase/app';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { BaseService } from './base-service';

@Injectable()
export class UserService extends BaseService{

  // lista de usúario do App
  users: FirebaseListObservable<Users[]>;

  constructor(
    public af: AngularFireDatabase ,
    public http: Http,
  ) {
    super();
    console.log('Hello User Provider');
    // seta caminho raiz da lista de usúario
    this.users = this.af.list('/user/');
  }

  // metodo para criar um uśuario setando o mesmo id do banco database
  // obs: .set() cria ou substitui diretório
  creat(user: User): firebase.Promise<void> {
    return this.af.object(`/user/${user.uid}`).set(user)
      .catch(this.handlePromiseError);
  }

  // metodo que recebe como parametro um username e
  // verifica se existe algum usuario com esse username
  userExists(username: string): Observable<boolean>{
    return this.af.list('/user',{
      query: {
        orderByChild: 'username',
        equalTo: username
      }
    }).map((user: User[]) => {
      return user.length > 0;
    }).catch(this.handleObservableError);
  }

  

}
