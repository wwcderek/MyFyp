import { Component } from '@angular/core';
import { IonicPage, Nav, NavParams } from 'ionic-angular';
import { ReviewPage } from '../review/review';
import { GeneralService } from "../../app/services/general.service";
import { FilmService } from '../../app/services/film.service';
import { Storage } from '@ionic/storage';
import { UserModel } from '../../models/user-model';
import { LoginPage } from '../login/login';
import { ReviewListPage } from '../review-list/review-list';
/**
 * Generated class for the DetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
  providers: [GeneralService, FilmService]

})
export class DetailPage {
  film: any;
  public navCtrl: Nav;
  tab1: any;
  tab2: any;
  public num = 1;
  public reviews: any;
  public user_id: any;
  public iconColor = 'white';
  disabledButtonId: string;
  constructor(public nav: Nav, public navParams: NavParams, public generalService: GeneralService, private storage: Storage, public filmService: FilmService) {
    this.film = navParams.get('film');
    this.getUserInfo();
  }

  review(film) {
    this.storage.get('username').then(data => {
      if (data) {
        this.nav.push(ReviewPage, {
          film: film
        });
      } else {
        this.nav.push(LoginPage, {
        });
      }
    })
  }

  reviewList() {
    this.nav.push(ReviewListPage, {
    });
  }

  popularReview() {
    this.filmService.getReview(this.film.film_id).subscribe(response => {
      this.reviews = response;
      // this.generalService.alertMessage('MSG',response[0].displayname);
    })
  }

  latestReview() {
    this.filmService.latestReview(this.film.film_id).subscribe(response => {
      this.reviews = response;
      // this.generalService.alertMessage('MSG',response[0].displayname);
    })
  }

  like(review) {
    this.storage.get('username').then(data => {
      if (data) {
        this.filmService.like(review.review_id, this.user_id).subscribe(response => {
          if (response) {
            review.favorite = review.favorite + 1;
            document.getElementById(review.review_id).style.color = "#ffcc33";
          } else if(!response){
            review.favorite = review.favorite - 1;
            document.getElementById(review.review_id).style.color = "#FFFFFF";
          }
        }, error => {
          console.log(error);
        });
      } else {
        this.nav.push(LoginPage, {
        });
      }
    })
  }

  dislike(review) {
    this.storage.get('username').then(data => {
      if (data) {
        this.filmService.dislike(review.review_id, this.user_id).subscribe(response => {
          if (response) {
            review.dislike = review.dislike + 1;
          } else if (!response) {
          review.dislike = review.dislike - 1;
          }
        }, error => {
          console.log(error);
        });
      } else {
        this.nav.push(LoginPage, {
        });
      }
    })
  }


  getUserInfo() {
    this.storage.get('user_id').then((val) => {
      this.user_id = val;
    });
  }

}
