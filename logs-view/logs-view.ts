import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Netcam } from '../../providers/netcam';
import {TranslateService} from 'ng2-translate/ng2-translate';
import { LoginViewPage } from '../login-view/login-view';

/*
  Generated class for the LogsView page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-logs-view',
  templateUrl: 'logs-view.html'
})
export class LogsViewPage {

  eventLogs: any[];
  netcamObj:Netcam;

  constructor(public navCtrl: NavController, public navParams: NavParams, private netcam: Netcam, public translate: TranslateService, public alertCtrl:AlertController) {
    this.netcamObj = netcam;
    if(!netcam.isLogin){
      this.gotoLogin();
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LogsViewPage');
    this.eventLogs = this.netcamObj.eventLogs;
    this.eventLogs.forEach((value, key) => {
      this.eventLogs[key].CriticalityString = this.criticalityToString(this.eventLogs[key].Criticality);
      
      this.eventLogs[key].ImageUrl = "assets/img/icon" + this.eventLogs[key].CriticalityString  + ".png";
    });
    this.netcamObj.refreshEventLogs();
  }

  criticalityToString(critId) {
    let retStr = 'Debug';
    if (critId == 1)
    {
         retStr = 'Information';
    }
    
     else if (critId == 2)
    {
        retStr = 'Warning';
    } 
    
    else if (critId == 3)
    {
        retStr = 'Error';
    }
    
     else if (critId == 4)
    {
        retStr = 'Critical';
    }
        return retStr;
  };

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
