import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FilmService } from '../../app/services/film.service';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public filmService: FilmService) {
    this.filmService.mostPopular().subscribe(response => {
    this.MostPopular = response;
})
    this.filmService.specificFilms(1).subscribe(response => {
      this.CategoryArray = response;
  })

    this.ImageArray = [
      {'image':'http://101.78.175.101:6780/storage/2018-01-01-15-17-45.jpg'},
      {'image':'http://101.78.175.101:6780/storage/2018-01-01-15-18-25.jpg'},
      {'image':'http://101.78.175.101:6780/storage/2018-01-01-15-18-59.jpg'},
      {'image':'http://101.78.175.101:6780/storage/2018-01-01-15-19-22.jpg'}
    ]
  }

  ionViewDidLoad() {
   
  }

  filmCategory(category) {
    this.filmService.specificFilms(category).subscribe(response => {
      this.CategoryArray = response;
  })
  }

}
