import { Netcam } from '../../providers/netcam';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DetailPage } from '../detail/detail';
import {TranslateService} from 'ng2-translate/ng2-translate';
/*
  Generated class for the SingleView page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-single-view',
  templateUrl: 'single-view.html'
})
export class SingleViewPage {
  videoSources: any[];
  netcamObj:Netcam;

  constructor(public navCtrl: NavController, public navParams: NavParams, private netcam: Netcam, translate: TranslateService) {
    this.netcamObj = netcam;

    

  }

  goToDetails(internalId: string) {
    this.navCtrl.push(DetailPage, {internalId});
  }


  ionViewDidLoad() {
    this.videoSources = this.netcamObj.videoSources;
    this.netcamObj.refreshVideoSources();
    console.log('ionViewDidLoad SingleViewPage');
  }

}

