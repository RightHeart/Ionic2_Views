import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, AlertController  } from 'ionic-angular';
import { Netcam } from '../../providers/netcam';
import { SourceFilterPage } from '../source-filter/source-filter';
import { LibraryItemPage } from '../library-item/library-item';
import { LoginViewPage } from '../login-view/login-view';
import {TranslateService} from 'ng2-translate/ng2-translate';
/*
  Generated class for the List page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {

  libraryItems: any[];
  netcamObj:Netcam;
  videoSources: any[];
  numItems:any;


  constructor(public navCtrl: NavController, public navParams: NavParams, private netcam: Netcam, public translate:TranslateService, public modalCtrl: ModalController, public alertCtrl:AlertController) {
    this.netcamObj = netcam;
    if(!netcam.isLogin){
      this.gotoLogin();
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListPage');
    
        
    this.libraryItems = this.netcamObj.libraryItems;
    this.videoSources = this.netcamObj.videoSources;
    this.libraryItems.forEach((value, key) => {
      this.libraryItems[key].Duration = (this.libraryItems[key].Duration / 1000).toFixed(1);
      this.libraryItems[key].ItemType = this.itemTypeIdToStr(this.libraryItems[key].ItemType);
    });
    this.numItems = this.netcamObj.libraryInfo.numItems;
    this.refresh();
    
  }

  refresh(){
    setTimeout(() => {
    this.libraryItems = this.netcamObj.libraryItems;
    this.videoSources = this.netcamObj.videoSources;
    this.libraryItems.forEach((value, key) => {
      this.libraryItems[key].Duration = (this.libraryItems[key].Duration / 1000).toFixed(1);
      this.libraryItems[key].ItemType = this.itemTypeIdToStr(this.libraryItems[key].ItemType);
    });
    this.numItems = this.netcamObj.libraryInfo.numItems;
    this.netcamObj.refreshLibrary(-1,200);
    },1000);
  }

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

  openFilterPopup(){
    let modal = this.modalCtrl.create(SourceFilterPage);
   modal.present();
    //  this.navCtrl.push(SourceFilterPage);
  }

  goToLibraryItem(itemId:string){
     this.navCtrl.push(LibraryItemPage, {itemId});

  }

  doInfinite(infiniteScroll) {
    this.netcamObj.setItemsForPeriod(this.netcamObj.libraryInfo.sourceFilter, 200, this.netcamObj.libraryInfo.lastLibraryId, this.netcamObj.libraryInfo.libraryPeriodStart, this.netcamObj.libraryInfo.libraryPeriodEnd);
    let data = this.netcamObj.libraryItems;
    console.log(data);
    setTimeout(() => {
      data.forEach((value,key)=>{
        this.libraryItems.push(value);
      })
      this.numItems += 200;
      this.netcamObj.libraryInfo.lastLibraryId = -1;
      this.netcamObj.refreshLibrary(-1,200);
      infiniteScroll.complete();
    }, 500);
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
