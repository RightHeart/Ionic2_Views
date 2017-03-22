import { Component } from '@angular/core';
import {App, NavController, NavParams } from 'ionic-angular';
import { Netcam } from '../../providers/netcam';
import {TranslateService} from 'ng2-translate/ng2-translate';
/*
  Generated class for the LibraryItem page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-library-item',
  templateUrl: 'library-item.html'
})
export class LibraryItemPage {
  itemId:any;
  libraryItems: any[];
  netcamObj:Netcam;
  videoSources: any[];
  currentItem:any;

  constructor(public appCtrl: App, public navCtrl: NavController, public navParams: NavParams, private netcam: Netcam, translate: TranslateService) {
    this.itemId = navParams.get('itemId');
    this.netcamObj = netcam;
    this.libraryItems = this.netcamObj.libraryItems;
    this.videoSources = this.netcamObj.videoSources;
    console.log(this.libraryItems);
    this.libraryItems.forEach((value, key) => {
      this.libraryItems[key].Duration = (this.libraryItems[key].Duration / 1000).toFixed(1);
      this.libraryItems[key].ItemType = this.itemTypeIdToStr(this.libraryItems[key].ItemType);
    });
    this.currentItem = this.libraryItems[this.itemId];
    console.log(this.currentItem);
  }

//   ngAfterViewInit() {
//  // Here 'my-content' is the ID of my ion-content
//    let content = this.appCtrl.getComponent('my-content');
//    content.addScrollEventListener(this.checkScroll);
//   }

  itemTypeIdToStr(itemId) {
            var retStr = 'Unknown';

            if (itemId == 1) {
                retStr = 'Capture';
            } else if (itemId == 2) {
                retStr = 'Recording';
            } else if (itemId == 3) {
                retStr = 'Timelapse';
            } else if (itemId == 4) {
                retStr = 'Dvr';
            } else if (itemId == 5) {
                retStr = 'Motion';
            }
            return retStr;
  };

  ionViewDidLoad() {
    console.log('ionViewDidLoad LibraryItemPage');
  }

  checkScroll(){
    alert();
  }

}
