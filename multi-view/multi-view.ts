import { Component, NgZone } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';

import { Netcam } from '../../providers/netcam';
import { ModalViewPage } from '../modal-view/modal-view';
import {TranslateService} from 'ng2-translate/ng2-translate';

/*
  Generated class for the MultiView page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-multi-view',
  templateUrl: 'multi-view.html'
})
export class MultiViewPage {
videoSources: any[];
netcamObj: Netcam;
_zone: NgZone;
  constructor(public navCtrl: NavController, public navParams: NavParams, private netcam: Netcam, public modalCtrl: ModalController, public zone: NgZone, translate: TranslateService) {
  
   this.videoSources = netcam.videoSources;
   this.netcamObj = netcam;
   this._zone = zone;
   this.netcamObj.refreshVideoSources();
   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MultiViewPage');
    
  }
  refreshPreview(srcId){
    if(this.netcamObj.isLogin){
      setTimeout(() => {
        this.netcamObj.setCameras();
        let tempSources = this.netcamObj.videoSources;
        this._zone.run(() => {
          this.videoSources[srcId].ImageUrl = tempSources[srcId].ImageUrl + '&r=' + Math.random();
        });
      }, 40);
    }
    
  }
  
  showModal(srcId) {
    let modal = this.modalCtrl.create(ModalViewPage, { srcId: srcId });
   modal.present();

  }

}

