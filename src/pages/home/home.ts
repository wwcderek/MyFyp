import { Component } from '@angular/core';
import { IonicPage, Nav, NavParams, NavController } from 'ionic-angular';
import { AccountService } from '../../app/services/account.service';
import { FilmService } from '../../app/services/film.service';
import { DetailPage } from '../detail/detail';
import { Storage } from '@ionic/storage';
import { YoutubeProvider } from '../../providers/youtube/youtube';
import { PlaylistPage } from '../playlist/playlist';
/**
 * Generated class for the HomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [AccountService, FilmService, YoutubeProvider]
})
export class HomePage {
  channel = 'UClgRkhTL3_hImCAmdLfDE4g';
  datas: any;
  nextPageToken: any;
  films: any;
  category: any;
  name: any;
  myInput: string = '';
  constructor( public navParams: NavParams, public accountService: AccountService, public filmService: FilmService, private storage: Storage, private yt: YoutubeProvider, public navCtrl: NavController) {
      this.getDefault();
      yt.playlist(this.channel).subscribe(data => {
        this.datas = data.json().items;
        if(data.json().nextPageToken){
          this.nextPageToken = data.json().nextPageToken;
          }
        });
  }

  ionViewDidLoad() {
  }

  ngOnInit(){
    this.getFilm(this.category);
  }


  getFilm(category){
    this.filmService.getFilm(category).subscribe(response => {
      this.films = response;
    })
  }

  getDefault(){
    this.category='action';
      this.storage.get('name').then((val) => {
        if(val)
          this.name = 'Wellcome '+val.username;
      });
  }


  viewDetail(film) {
    this.navCtrl.push(DetailPage, {
      film: film
    });
  }

  changeCategory(){
     this.getFilm(this.myInput);
  }

  openPlaylist(id) {
this.navCtrl.push(PlaylistPage, {id:id});
  }

  infiniteScroll(ev) {
      if(this.nextPageToken){
        this.yt.playlist_page(this.channel, this.nextPageToken).subscribe(data=>{
            for(let i of data.json().items){
              this.datas.push(i); 
            }
            ev.complete();
            if(!data.json().nextPageToken){
              this.nextPageToken = null;
            }else{
              this.nextPageToken = data.json().nextPageToken;
            }
        })
      }else {
        ev.complete();
      }
  }

}
