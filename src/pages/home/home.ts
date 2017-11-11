import { Component } from '@angular/core';
import { IonicPage, Nav, NavParams } from 'ionic-angular';
import { AccountService } from '../../app/services/account.service';
import { FilmService } from '../../app/services/film.service';
import { DetailPage } from '../detail/detail';
import { Storage } from '@ionic/storage';
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
  providers: [AccountService, FilmService]
})
export class HomePage {
  films: any;
  category: any;
  name: any;
public navCtrl: Nav;
  constructor( public navParams: NavParams, public accountService: AccountService, public filmService: FilmService, private storage: Storage) {
      this.getDefault();
  }

  ionViewDidLoad() {
    // this.filmService.getFilm().subscribe(response => {
    //   this.films = response;
    // })
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
     this.getFilm(this.category);
  }

}
