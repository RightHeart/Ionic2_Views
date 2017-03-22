import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import {TranslateService} from 'ng2-translate/ng2-translate';
import { Netcam } from '../../providers/netcam';
import { Storage } from '@ionic/storage';

/*
  Generated class for the Setting page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html'
})
export class SettingPage {

  userSettings:any;
  translate:any;

  constructor(public storage: Storage,public navCtrl: NavController, public navParams: NavParams, private netcam: Netcam, translate: TranslateService, public alertCtrl: AlertController) {
    this.storage.ready().then(() => {
       this.storage.get('language').then((value) => {
         if(value!=null && value!=undefined){
           netcam.userSettings.Language = value;
         }
      });
     })
    this.userSettings = netcam.userSettings;
    this.translate = translate;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingPage');
  }

  changeLanguage = function (key) {

    this.translate.use(key);
    this.storage.ready().then(() => {
      this.storage.set('language', key);
    });

  }

  confirmSettingsClear(){
    let confirm = this.alertCtrl.create({
      title: 'Clear Settings',
      message: 'Do you want to clear the settings and server information stored locally',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'OK',
          handler: () => {
            this.storage.ready().then(() => {
              this.storage.set('serversCollection', undefined);
              this.storage.set('language', undefined);

            });
          }
        }
      ]
    });
    confirm.present();

  }


}
