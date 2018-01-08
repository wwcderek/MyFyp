import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { GeneralService } from "../../app/services/general.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Keyboard } from 'ionic-native';
import { FilmService } from '../../app/services/film.service';
import { Storage } from '@ionic/storage';
import { UserModel } from '../../models/user-model';

/**
 * Generated class for the ReviewPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-review',
  templateUrl: 'review.html',
  providers: [GeneralService, FilmService]
  
})
export class ReviewPage {
  film: any;
  slideOneForm: FormGroup;  
  status: any;
  submitAttempt: boolean = false;
  public title: any;
  public review: any;
  public rating = 0;
  public user_id: any;
  public username: string;
  public displayname: string;
  public email: string;
  public iconPath: string;
  public role: string;
  public user: UserModel; 
  public keyboard: Keyboard;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public generalService: GeneralService, public formBuilder: FormBuilder, public filmService: FilmService, private storage: Storage, private toastCtrl: ToastController, private alertCtrl: AlertController) {
    Keyboard.disableScroll(true);       
    this.film = navParams.get('film');
    this.getUserInfo();
    this.status = 0; 
    this.slideOneForm = formBuilder.group({
      title: ['', Validators.compose([Validators.maxLength(20), Validators.minLength(3), Validators.required])],
      review: ['', Validators.compose([Validators.maxLength(200), Validators.minLength(10), Validators.required])], 
    });    
  }

  writeReview(form)
  {
    let status = this.validate();
    this.submitAttempt = true;
  
   if (this.slideOneForm.valid && status) {     
      this.filmService.writeReview(this.user_id, this.film.film_id, this.rating, form.value.title, form.value.review)
          .subscribe(data => {
              if(data) {
                this.navCtrl.pop();
                this.presentToast();
              } else {
                  this.generalService.alertMessage("Error", "Failed");
              }
          }, error => {
              console.log(error);// Error getting the data
          });
    }
  }

  getUserInfo() {
    this.storage.get('user_id').then((val) => {
        this.user_id = val;
      });

    this.storage.get('username').then((val) => {
        this.username = val;
      });

      this.storage.get('displayname').then((val) => {
        this.displayname = val;
      });

      this.storage.get('email').then((val) => {
        this.email = val;
      });

      this.storage.get('iconPath').then((val) => {
        this.iconPath = val;
      });
      
      this.storage.get('role').then((val) => {
        this.role = val;
      });
  }


  validate(): boolean {
    if (this.slideOneForm.valid) {
        return true;
    }

    // figure out the error message
    let errorMsg = '';

    // validate each field
    let control = this.slideOneForm.controls['title'];
    let control2 = this.slideOneForm.controls['review'];
    if (!control.valid) {
        if (control.errors['required']) {
            errorMsg = 'Provide a title please';
        } else if (control.errors['minlength']) {
            errorMsg = 'The title must have at least 3 characters';
        } else if (control.errors['maxlength']) {
            errorMsg = 'The displayname must less than 15 characters';
        }
    } else if (!control2.valid) {
        if (control2.errors['required']) {
            errorMsg = 'Please input somthing here';
        } else if (control2.errors['maxlength']) {
            errorMsg = 'The review must less than 200 characters';
        }else if (control.errors['minlength']) {
          errorMsg = 'The title must have at least 10 characters';
        }
    } 
    this.generalService.alertMessage("errorMsg",errorMsg);
    return false;
}

presentToast() {
  let toast = this.toastCtrl.create({
    message: 'Review was added successfully',
    duration: 3000,
    position: 'bottom'
  });

  toast.onDidDismiss(() => {
  });

  toast.present();
}

  resetForm() {
    this.title = '';
    this.review = '';
  }

  log(valor)
  {
    this.rating = valor;
  }
}
