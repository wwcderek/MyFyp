import { Component } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';
import { FilmService } from '../../app/services/film.service';
import { Storage } from '@ionic/storage';
import { DetailPage } from '../detail/detail';

/**
 * Generated class for the RecommendationPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-recommendation',
  templateUrl: 'recommendation.html',
  providers: [FilmService]
})
export class RecommendationPage {
  public filmList: any;
  constructor(public viewCtrl: ViewController, public filmService: FilmService, private storage: Storage) {
    this.getRecommendation();
  }

  ionViewDidLoad() {
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  getRecommendation() {
    this.storage.get('user_id').then((val) => {
      this.filmService.getRecommendation(val).subscribe(response => {
        this.filmList = response;
      })
    });
  }

  getDetail(title) {
    this.filmService.search(title).subscribe(response => {
      if(response){
       this.viewDetail(response[0]);
      }
    })
  }

  viewDetail(film) {
    // this.navCtrl.push(DetailPage, {
    //   film: film
    // });
  }

}
