import { AlertController, MenuController, App } from 'ionic-angular';
import { Component, Input } from '@angular/core';
import { BaseComponent } from '../base.components';
import { AuthService } from './../../providers/auth-service';

@Component({
  selector: 'custom-logged-header',
  templateUrl: 'custom-logged-header.html'
})
export class CustomLoggedHeader extends BaseComponent{

  @Input() title: string;

  constructor(
    public alertCtrl: AlertController,
    public authService: AuthService,
    public app: App,
    public menuCtrl: MenuController
  ) {
    super(alertCtrl,authService,app,menuCtrl);
  } 

}
