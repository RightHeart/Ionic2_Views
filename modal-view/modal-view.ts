import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { Netcam } from '../../providers/netcam';

/*
  Generated class for the ModalView page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-modal-view',
  templateUrl: 'modal-view.html'
})
export class ModalViewPage {

videoSources: any[];
videoSource: any;
netcamObj: Netcam;
internalId: string;
  constructor(public navCtrl: NavController, public navParams: NavParams , private netcam: Netcam, public viewCtrl: ViewController) {
    
    this.internalId = navParams.get('srcId');
    this.videoSources = netcam.videoSources;
    this.videoSource = this.videoSources[this.internalId];
    this.netcamObj = netcam;
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalViewPage');
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

   refreshPreview(){
     let srcId = this.internalId;
     if(this.netcamObj.isLogin){
       setTimeout(() => {
        
        this.netcamObj.setCameras();
        let tempSources = this.netcamObj.videoSources;
        this.videoSource.ImageUrl = tempSources[srcId].ImageUrl + '&r=' + Math.random();;
  
      }, 40);
     }

  }


}
