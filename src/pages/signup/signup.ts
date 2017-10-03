// import { User } from './../../models/user.module';
// import { AuthService } from './../../providers/auth-service';
import { NavController, NavParams, AlertController, LoadingController, Loading } from 'ionic-angular';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder ,Validators} from '@angular/forms';
import { UserService } from './../../providers/user.service';
import * as firebase from 'firebase/app';


@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class Signup {

  signupForm : FormGroup;

  constructor(
    public alertCtrl: AlertController,
    // public authService: AuthService,
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public userService: UserService,
    public AuthService: AuthService
    ) {
      let emailRegex = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
      this.signupForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', Validators.compose([Validators.required, Validators.pattern(emailRegex)])],
      password: ['', [Validators.required, Validators.minLength(6)]],
      });
  }
    
  // submit do form
   onSubmit(): void {
    // chamada do loading para aparecer na tela
    let loading: Loading = this.showLoading();

    let formUser = this.signupForm.value;
    this.AuthService.createAuthUser(
    {
      email: formUser.email,
      password: formUser.password
    }
    ).then((authState: firebase.User) => {
      // não grava a password no firebase
      delete formUser.password;
      // cria um atributo uid e seta ele com o valor do id do usuario gerado no firebase
      formUser.uid = authState.uid;
      this.userService.creat(this.signupForm.value)
      .then(() => {
        console.log('Usuario cadastrado!');
        // disabilitando o loading da tela
        loading.dismiss();
      }).catch((error: Error) => {
        console.log(error);
        loading.dismiss();
        this.showAlert(error.message);
      });
    }).catch((error: Error) => {
      console.log(error);
      loading.dismiss();
      this.showAlert(error.message);
    });
   }

   // Loading para a página
  private showLoading(): Loading {
    let loading: Loading = this.loadingCtrl.create({
      content: "Please Wait"
    });

    // apresenta o loading da tela
    loading.present();

    return loading;

  }

  // metodo para mostrar um aviso para o usuário
  private showAlert(message : string): void{
    this.alertCtrl.create({
      message: message,
      buttons: ['Ok']
    }).present();
  }

}
