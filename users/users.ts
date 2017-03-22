import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Netcam } from '../../providers/netcam';
import {TranslateService} from 'ng2-translate/ng2-translate';
import { LoginViewPage } from '../login-view/login-view';
/*
  Generated class for the Users page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-users',
  templateUrl: 'users.html'
})
export class UsersPage {

  connectedUsers: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private netcam: Netcam, public translate: TranslateService, public alertCtrl:AlertController) {
    if(!netcam.isLogin){
      this.gotoLogin();
    }
    this.connectedUsers = netcam.connectedUsers;
    this.connectedUsers.forEach((value, key) => {
      this.connectedUsers[key].ImageUrl = "assets/img/UserIcons/" + this.connectedUsers[key].UserIcon ;
      this.connectedUsers[key].Kbytes = (this.connectedUsers[key].BytesTransfered / 1024).toFixed(2);
      if(this.connectedUsers[key].LastWebFileRequest > this.connectedUsers[key].LastWCFCommandRequest){
        this.connectedUsers[key].RequestString = this.connectedUsers[key].LastWebFile;
      }else{
         this.connectedUsers[key].RequestString = this.connectedUsers[key].LastWCFCommand;
      }
    });
    netcam.refreshConnectedUsers();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UsersPage');
  }

  gotoLogin(){
    let confirm = this.alertCtrl.create({
      title:this.translate.instant('txtLoginRequired'),
      // message: this.translate.instant('txtDeleteServerConfirmation')+ server.name + '?',
      subTitle: this.translate.instant('txtSessionTimedOut'),
      buttons: [
       
        {
          text: 'OK',
          handler: () => {
              this.navCtrl.setRoot(LoginViewPage); 
            //   this.nav.push(LoginViewPage);
          }
        }
      ]
    });
    confirm.present();
  }

}
