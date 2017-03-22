import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Netcam } from '../../providers/netcam';
import { ListPage } from '../list/list';
import { LoginViewPage } from '../login-view/login-view';
import {TranslateService} from 'ng2-translate/ng2-translate';
/*
  Generated class for the Hourly page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-hourly',
  templateUrl: 'hourly.html'
})
export class HourlyPage {

  libraryItemInfos: any[];
  netcamObj:Netcam;
  translate:TranslateService;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private netcam: Netcam, translate: TranslateService, public alertCtrl:AlertController) 
  {
    this.netcamObj = netcam;
    this.translate = translate;
    if(!netcam.isLogin){
      this.gotoLogin();
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HourlyPage');
    this.libraryItemInfos = this.netcamObj.libraryItemInfos;
    this.libraryItemInfos.forEach((value, key) => {
      this.libraryItemInfos[key].DataSize =(value.DataSize / (1024 * 1024)).toFixed(2) ;
      this.libraryItemInfos[key].PeriodStartTick = this.dateToTick(value.PeriodStart);
      this.libraryItemInfos[key].PeriodEndTick = this.dateToTick(value.PeriodEnd);
    });
    
  }

  dateToTick(jsonDate) {
     return new Date(jsonDate).getTime();
  };

  gotoList(start,end){
    this.netcamObj.setItemsForPeriod(this.netcamObj.libraryInfo.sourceFilter, 200, -1, start, end);
    this.navCtrl.push(ListPage);
    // setTimeout(()=> {
    //   this.navCtrl.push(ListPage);
    // }, 1000);
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
