import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DetailPage } from '../detail/detail';
import { FilmService } from '../../app/services/film.service';
import { GeneralService } from '../../app/services/general.service';
/**
 * Generated class for the ContentPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-content',
  templateUrl: 'content.html',
  providers: [FilmService]
})
export class ContentPage {
  ImageArray: any = [];
  MostPopular: any = [];
  CategoryArray: any = [];
  myInput: String = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, public filmService: FilmService, public generalService: GeneralService) {
    this.filmService.mostPopular().subscribe(response => {
    this.MostPopular = response;
})
    this.filmService.specificFilms(1).subscribe(response => {
      this.CategoryArray = response;
  })

    this.ImageArray = [
      {'image':'http://101.78.175.101:6780/storage/2018-01-06-14-45-58.jpg'},
      {'image':'http://101.78.175.101:6780/storage/2018-01-06-14-49-53.jpg'},
      {'image':'http://101.78.175.101:6780/storage/2018-01-06-00-22-02.jpg'},
      {'image':'http://101.78.175.101:6780/storage/2018-01-06-00-12-35.jpg'}
    ]
  }

  ionViewDidLoad() {
   
  }

  filmCategory(category) {
    this.filmService.specificFilms(category).subscribe(response => {
      this.CategoryArray = response;
  })
  }

  search() {
    this.filmService.search(this.myInput).subscribe(response => {
      if(response){
      //this.generalService.alertMessage("Message", response[0].title);
       this.viewDetail(response[0]);
      }
  })
  }

  viewDetail(film) {
    this.navCtrl.push(DetailPage, {
      film: film
    });
  }

}
