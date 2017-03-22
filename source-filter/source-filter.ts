import { Component} from '@angular/core';
import { App, NavController, NavParams, ViewController } from 'ionic-angular';
import { Netcam } from '../../providers/netcam';
import { ListPage } from '../list/list';
import {TranslateService} from 'ng2-translate/ng2-translate';

/*
  Generated class for the SourceFilter page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-source-filter',
  templateUrl: 'source-filter.html'
})
export class SourceFilterPage {

netcamObj: Netcam;
videoSources: any[];
value ;
 constructor(public navCtrl: NavController, public navParams: NavParams , private netcam: Netcam, public viewCtrl: ViewController, public appCtrl: App, translate: TranslateService) {
    this.netcamObj = netcam;
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad SourceFilterPage');
    this.videoSources = this.netcamObj.videoSources;
    this.value = this.netcamObj.libraryInfo.sourceFilter;
    
  }



  closeFilterPopup(){
    this.viewCtrl.dismiss();
  }

  applyFilterPopup(){
    this.netcamObj.libraryInfo.sourceFilter = this.value;
    // this.netcamObj.refreshLibrary();
    this.netcamObj.setItemsForPeriod(this.netcamObj.libraryInfo.sourceFilter, 200, -1, this.netcamObj.libraryInfo.libraryPeriodStart, this.netcamObj.libraryInfo.libraryPeriodEnd);
     this.viewCtrl.dismiss();
    this.appCtrl.getRootNav().setRoot(ListPage);
    // setTimeout(() => {
         
    // },2000);

    console.log(this.value);

  }

}
