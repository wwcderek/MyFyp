import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { YoutubeProvider } from '../../providers/youtube/youtube';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
/**
 * Generated class for the PlaylistPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-playlist',
  templateUrl: 'playlist.html',
  providers: [YoutubeProvider]
})
export class PlaylistPage {
datas: any;
nextPageToken: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private yt: YoutubeProvider, private sanitizer: DomSanitizer) {
    yt.playlistList(navParams.data.id).subscribe(data=>{
        this.datas = data.json().items;
        if(data.json().nextPageToken){
          this.nextPageToken = data.json().nextPageToken;
        }
    })
  }

  playVideo(videoId) {
      return this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/"+videoId);
  }

  infiniteScroll(ev) {
    if(this.nextPageToken){
      this.yt.playlistList_page(this.navParams.data.id, this.nextPageToken).subscribe(data=>{
        for(let i of data.json().items){
          this.datas.push(i);
        }
        if(!data.json().nextPageToken){
          this.nextPageToken = null;
        }else {
          this.nextPageToken = data.json().nextPageToken;
        }
        ev.complete();
      });
    }else{
    ev.complete();
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlaylistPage');
  }

}
