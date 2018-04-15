import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base-service';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Http } from '@angular/http';


@Injectable()
export class ChatService extends BaseService{

  chats: AngularFireList<ChatService>;

  constructor(
    public afAuth: AngularFireAuth,
    public db: AngularFireDatabase,
    public http: Http
  ) {
    super();
  }

  create(chat: ChatService, userId1: string, userId2: string): Promise<void> {
    return this.db.object<ChatService>(`/chats/${userId1}/${userId2}`)
      .set(chat)
      .catch(this.handlePromiseError);
  }

}
