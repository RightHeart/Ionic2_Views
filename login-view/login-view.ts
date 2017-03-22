import { Component } from '@angular/core';
import {LoadingController, ModalController,  App,  AlertController} from 'ionic-angular';
import { Netcam } from '../../providers';
import { AddServerPage } from '../add-server/add-server';
import { SingleViewPage } from '../single-view/single-view';
import {TranslateService} from 'ng2-translate/ng2-translate';
import { Storage } from '@ionic/storage';

/*
  Generated class for the LoginView page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login-view',
  templateUrl: 'login-view.html'
})
export class LoginViewPage {
  netcamObj: Netcam;
  serversCollection:any[];
  selectedServer:{id: number, name:string, host:string, port:number, username:string, password:string, sessionToken:string, useHTTPS:boolean};
  translate:any;

  constructor (public loadingCtrl: LoadingController, public modalCtrl: ModalController, public appCtrl: App, public alertCtrl: AlertController,netcam: Netcam,  translate: TranslateService,public storage: Storage) {
     this.netcamObj = netcam;
     this.translate = translate;
     this.storage.ready().then(() => {
       this.storage.get('serversCollection').then((value) => {
         if(value!=null && value!=undefined){
           this.netcamObj.serversCollection = value;
           this.serversCollection = value;
         }
      });
     })
    //  this.presentLoading();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginViewPage');
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000,
      dismissOnPageChange: true
    });
    loader.present();
  }  

  showEditServer(server)
  {
    let serverAddFormData;
    let title;
    if (server === null || server === undefined)
    {
      var defaultServer = {
        id : -1,
        name: 'NewServer',
        host: '192.168.1.1',
        port: 8100,
        username: 'admin',
        password: '',
        sessionToken: '',
        useHTTPS: false
      };
      // create new
      serverAddFormData = defaultServer;
      title = "Add Server";
          
    }
    else
    {
     // edit in place
      serverAddFormData = server;
      title = "Edit Server";
    }
    let modal = this.modalCtrl.create(AddServerPage, { serverAddFormData: serverAddFormData, title:title });
    modal.present();

  }

  deleteServer(server){
    let str:string =this.translate.instant('txtDeleteServerConfirmation');
    
    let confirm = this.alertCtrl.create({
      title: this.translate.instant('txtDeleteServer'),
      // message: this.translate.instant('txtDeleteServerConfirmation')+ server.name + '?',
      message: str.replace("%1",server.name),
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'OK',
          handler: () => {
            this.netcamObj.serversCollection.splice(server.id, 1);
            this.reindexServers();
            this.selectedServer = null;
            this.storage.ready().then(() => {
              this.storage.set('serversCollection', this.netcamObj.serversCollection);
            });
          }
        }
      ]
    });
    confirm.present();
  }

   reindexServers(){
      this.netcamObj.serversCollection.forEach((value,key)=>{
                value.id = key;
     });
   }
 

  setServer(server){
    this.selectedServer = server;
  }

  login(){
    this.netcamObj.login(this.selectedServer,"");
    this.presentLoading();
    setTimeout(()=> {
      if(this.netcamObj.videoSources!=undefined && this.netcamObj.videoSources!=null) {
        this.netcamObj.isLogin = true;
        this.appCtrl.getRootNav().setRoot(SingleViewPage);      
      }
      else{
        let alert = this.alertCtrl.create({
          title: 'Login Failed!',
          subTitle: 'Error Connection Refused',
          buttons: ['OK']
        });
        alert.present();
      }
      // console.log(this.netcamObj.videoSources);
    }, 3500);  
    
  }

}
