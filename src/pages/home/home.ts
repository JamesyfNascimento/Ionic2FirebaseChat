import { AuthService } from './../../providers/auth-service';
import { UserService } from './../../providers/user.service';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FirebaseListObservable } from 'angularfire2/database';
import { Users } from './../../models/user.module';
import { Signup } from './../signup/signup';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  users: FirebaseListObservable<Users[]>;
  view: string = 'chats';
  

  constructor(
    public authService: AuthService,
    public navCtrl: NavController,
    public userService: UserService
  ) {

  }

  ionViewCanEnter(): Promise<boolean> {
    return this.authService.authenticated;
  }

  ionViewDidLoad() {
    this.users = this.userService.users;
  }

  onChatCreate(users : Users) : void {
    console.log("User", users);
    
  }

  onSignup() : void {
    this.navCtrl.push(Signup);
  } 

}
