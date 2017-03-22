import { Component} from '@angular/core';
import { NavController, NavParams, App, ViewController } from 'ionic-angular';
import { Netcam } from '../../providers/netcam';
import { LoginViewPage } from '../login-view/login-view';
import {TranslateService} from 'ng2-translate/ng2-translate';
import { Storage } from '@ionic/storage';
/*
  Generated class for the AddServer page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-add-server',
  templateUrl: 'add-server.html'
})
export class AddServerPage {
  title:string;
  serverAddFormData:any;
  netcamObj: Netcam;
  constructor(public storage: Storage,public navCtrl: NavController, public navParams: NavParams, private netcam: Netcam, public appCtrl: App, public viewCtrl: ViewController,  translate: TranslateService) {
    this.title = navParams.get('title');
    this.serverAddFormData = navParams.get('serverAddFormData');
    this.netcamObj = netcam;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddServerPage');
   
  }

  addServer(serverAddForm) {
    
    if (serverAddForm.id == -1)
    {
     // new server added
     this.netcamObj.serversCollection.push(serverAddForm);
    
    }
    else
    {
      // edited server
      this.netcamObj.serversCollection[serverAddForm.id] = serverAddForm;

    }
    this.reindexServers();
    this.storage.ready().then(() => {
      this.storage.set('serversCollection', this.netcamObj.serversCollection);
    });

    setTimeout(()=> {
      this.viewCtrl.dismiss();
      this.appCtrl.getRootNav().setRoot(LoginViewPage);
      
    }, 500);
   }

   reindexServers(){
      this.netcamObj.serversCollection.forEach((value,key)=>{
                value.id = key;
     });
   }

   hideEditServer(){
     this.viewCtrl.dismiss();
   }

 

}
