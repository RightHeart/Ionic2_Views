import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { Netcam } from '../../providers/netcam';
import { ModalViewPage } from '../modal-view/modal-view';
import {TranslateService} from 'ng2-translate/ng2-translate';
declare var soundManager : any;
/*
  Generated class for the Detail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html'

})
export class DetailPage {
  
  videoSources: any[];
  videoSource: any;
  internalId: string;
  netcamObj: Netcam;
  isRecording:boolean;
  audioPlaying:boolean
  ptzEnabled:boolean;
  pan:boolean;
  feature:boolean;
  isMotionDetector : boolean;
  isAudioDetector : boolean;
  aPlayer: any;
  

  constructor(public navCtrl: NavController, public navParams: NavParams, private netcam: Netcam, public modalCtrl: ModalController,  translate: TranslateService) {
    this.internalId = navParams.get('internalId');
    this.isRecording = false;
    this.videoSources = netcam.videoSources;
    this.videoSource = this.videoSources[this.internalId];
    this.ptzEnabled = netcam.ptzEnabled;
    this.isMotionDetector = this.videoSource.Status.IsMotionDetector;
    this.isAudioDetector = this.videoSource.Status.IsAudioDetector;
    this.netcamObj = netcam;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPage');
  }

   showModal(srcId) {
    let modal = this.modalCtrl.create(ModalViewPage, { srcId: srcId });
   modal.present();

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

  panToggleDetails(){
    this.pan = !this.pan;

  }

  featureToggleDetails(){
    this.feature = !this.feature;

  }

  switchRecording(){
    this.isRecording = !this.isRecording;
    let needRecording = !this.videoSource.Status.IsRecording;
    this.netcamObj.startStopRecording(this.videoSource.Id, needRecording).subscribe(data=>{
      this.videoSources[this.internalId].Status.IsRecording = needRecording;
      if (!needRecording) {
        // we have just finished a recording, let's refresh the library in 1s
        setTimeout(()=> {
          this.netcamObj.refreshLibrary(-1,200);
        }, 1000);
      }
    });

  }

  playAudio(){
    this.audioPlaying = !this.audioPlaying;
    let audioUrl = this.videoSource.AudioUrl;
    let needPlay = this.audioPlaying;
    this.stopAudio();
    if (needPlay) {
      try {
        this.audioPlaying = true;
        this.aPlayer = soundManager.createSound({
          id: 'aSound',
          url: audioUrl,
          autoLoad: true,
          autoPlay: true
        });
                         //$scope.aPlayer.play();
      }
      catch (err) {
        console.log('Start Audio Exception: ' + err);
      }
    }

  }

  stopAudio(){
     if ((this.aPlayer !== undefined) && (this.aPlayer !== null)) {
       this.aPlayer.stop();
       this.audioPlaying = false;
       soundManager.unload('aSound');
       soundManager.destroySound('aSound');
    }
  }

  switchMotionDetector(value){
    this.netcamObj.startStopMotionDetector(this.internalId,value);
    setTimeout(()=> {
      if(this.netcamObj.motionValue){
      this.isMotionDetector = value;
      this.videoSources[this.internalId].Status.IsMotionDetector = value;
      this.netcamObj.videoSources[this.internalId].Status.IsMotionDetector = value;

    }
      
    }, 500);

  }

  switchAudioDetector(value){
     this.netcamObj.startStopAudioDetector(this.internalId,value);
    setTimeout(()=> {
      if(this.netcamObj.audioValue){
      this.isAudioDetector = value;
      this.videoSources[this.internalId].Status.isAudioDetector = value;
      this.netcamObj.videoSources[this.internalId].Status.isAudioDetector = value;
    }
      
    }, 500);

  }

  ptzControl(direction){
    this.netcamObj.ptzControl(this.videoSource.Id,direction);

  }


}
