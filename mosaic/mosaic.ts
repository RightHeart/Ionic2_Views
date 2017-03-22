import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { Netcam } from '../../providers/netcam';
import { ModalVideoPage } from '../modal-video/modal-video';
import {TranslateService} from 'ng2-translate/ng2-translate';
import { LoginViewPage } from '../login-view/login-view';

/*
  Generated class for the Mosaic page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-mosaic',
  templateUrl: 'mosaic.html'
})
export class MosaicPage {

  libraryItems: any[];
  netcamObj:Netcam;
  constructor(public navCtrl: NavController, public navParams: NavParams, private netcam: Netcam, public modalCtrl: ModalController, public alertCtrl:AlertController, public translate: TranslateService) {
    this.netcamObj = netcam;
     if(!netcam.isLogin){
      this.gotoLogin();
    }


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MosaicPage');
     this.libraryItems = this.netcamObj.libraryItems;
  
  }

  showModal(relativeId:string){
    let modal = this.modalCtrl.create(ModalVideoPage, { itemId: relativeId });
   modal.present();
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
