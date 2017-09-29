import { NavController, NavParams } from 'ionic-angular';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder ,Validators} from '@angular/forms';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class Signup {

  signupForm : FormGroup;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder) {

      let emailRegex  = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

      this.signupForm = this.formBuilder.group({
        name: ['' , Validators.required, Validators.minLength(3)],
        username: ['' , Validators.required, Validators.minLength(3)],
        email: ['' , Validators.compose([Validators.required, Validators.pattern(emailRegex)])],
        password: ['' , Validators.required, Validators.minLength(6)],
      });
  }

  ionViewDidLoad() {
  }

  onSubmit() : void {
    console.log("Form submited!");
    
  }

}
