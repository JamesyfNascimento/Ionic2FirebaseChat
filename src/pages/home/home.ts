import { User } from './../../models/user.module';
import { UserService } from './../../providers/user.service';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FirebaseListObservable } from 'angularfire2/database';
import { Signup } from './../signup/signup';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  users: FirebaseListObservable<User[]>;
  

  constructor(
    public navCtrl: NavController,
    public userService: UserService
  ) {

  }

  ionViewDidLoad() {
    this.users = this.userService.users;
  }

  onChatCreate(user : User) : void {
    console.log("User", user);
    
  }

  onSignup() : void {
    this.navCtrl.push(Signup);
  } 

}
