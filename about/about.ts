import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Netcam } from '../../providers/netcam';
import { PropellerPage } from '../propeller/propeller';
import {TranslateService} from 'ng2-translate/ng2-translate';


/*
  Generated class for the About page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  processInfo: any[];
  deviceInfo: any[];
  pushInfo: any[];
  netcamObj:Netcam;

  constructor(public navCtrl: NavController, public navParams: NavParams, private netcam: Netcam, translate: TranslateService) {
    this.netcamObj = netcam;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutPage');
    this.processInfo = this.netcamObj.processInfo;
    console.log(this.processInfo);
     this.processInfo.forEach((value, key) => {
      this.processInfo[key].MemorySize =(this.processInfo[key].MemorySize / (1024 * 1024)).toFixed(2) ;
      this.processInfo[key].MemoryPeak =(this.processInfo[key].MemoryPeak / (1024 * 1024)).toFixed(2) ;

    });
  }

  refreshProcessInfo(){
    this.netcamObj.setProcessInfo();
    setTimeout(function() {
      console.log("represhProcessInfo");
    }, 1000);
    this.processInfo = this.netcamObj.processInfo;
  }

  easterEgg () {
            this.netcamObj.easterCpt++;

            if (this.netcamObj.easterCpt >= 5) {
                this.netcamObj.easterCpt = 0;
                this.navCtrl.push(PropellerPage);
            }
        };

}
