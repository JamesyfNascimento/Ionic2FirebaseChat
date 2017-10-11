import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AlertController , NavController, NavParams, Loading ,LoadingController} from 'ionic-angular';
import { Component } from '@angular/core';
import { Signup } from './../signup/signup';
import { AuthService } from './../../providers/auth-service';
import { HomePage } from './../home/home';

@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class Signin {

  signinForm : FormGroup;
  
  constructor(
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public authService: AuthService,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
  ) {
    let emailRegex = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    this.signinForm = this.formBuilder.group({
    email: ['', Validators.compose([Validators.required, Validators.pattern(emailRegex)])],
    password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Signin');
  }

  onSubmit(): void {

    let loading: Loading = this.showLoading();
    
    this.authService.signinWithEmail(this.signinForm.value)
      .then((isLogged: boolean) => {

        if (isLogged) {
          this.navCtrl.push(HomePage);
          loading.dismiss();
        }

      }).catch((error: any) => {
        console.log(error);
        loading.dismiss();
        this.showAlert(error);
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
  
  // chama a pagina signup
  onSignup(): void {
    this.navCtrl.push(Signup);
  }

  // chama a pagina home
  onHome(): void {
    this.navCtrl.push(HomePage);
  }

  // logout 
  onLogout(): void {
    this.authService.logout();
  } 


}
