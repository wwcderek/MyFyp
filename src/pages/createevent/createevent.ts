import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FilmService } from '../../app/services/film.service';
import { EventService } from '../../app/services/event.service';
import { GeneralService } from '../../app/services/general.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { UserModel } from '../../models/user-model';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the CreateeventPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-createevent',
  templateUrl: 'createevent.html',
  providers: [FilmService, GeneralService, EventService]
})
export class CreateeventPage {
  myGroup = new FormGroup({
    firstName: new FormControl()
  });
  status: any;
  submitAttempt: boolean = false;
  public CValue: String;
  public DValue: String;
  public CategoryArray: any;
  public title: any;
  public myTime: any;
  public description: any;
  public category: any;
  public filmName: any;
  public myDate: any;
  public user_id: any;
  public username: string;
  public displayname: string;
  public email: string;
  public iconPath: string;
  public role: string;
  public user: UserModel;
  constructor(public navCtrl: NavController, public navParams: NavParams, public filmService: FilmService, public generalService: GeneralService, public eventService: EventService, public formBuilder: FormBuilder, private toastCtrl: ToastController, private storage: Storage) {
    this.getUserInfo();
    this.status = 0;
    this.myGroup = formBuilder.group({
      title: ['', Validators.compose([Validators.maxLength(20), Validators.minLength(3), Validators.required])],
      description: ['', Validators.compose([Validators.maxLength(200), Validators.minLength(10), Validators.required])],
      myDate: ['', Validators.compose([Validators.required])],
      myTime: ['', Validators.compose([Validators.required])],
      category: ['', Validators.compose([Validators.required])],
      filmName: ['', Validators.compose([Validators.required])],
    });
  }

  ionViewDidLoad() {
  }

  getFilm(CValue) {
    var category = parseInt(CValue);
    this.filmService.specificFilms(category).subscribe(response => {
      this.CategoryArray = response;
    })
  }

  validate(): boolean {
    if (this.myGroup.valid) {
      return true;
    }

    // figure out the error message
    let errorMsg = '';

    // validate each field
    let title = this.myGroup.controls['title'];
    let description = this.myGroup.controls['description'];
    let category = this.myGroup.controls['category'];
    let myDate = this.myGroup.controls['myDate'];
    let filmName = this.myGroup.controls['filmName'];
    if (!title.valid) {
      if (title.errors['required']) {
        errorMsg = 'Provide A Title Please';
      } else if (title.errors['minlength']) {
        errorMsg = 'The Title Must Have At Least 3 Characters';
      } else if (title.errors['maxlength']) {
        errorMsg = 'The Title Must Less Than 15 Characters';
      }
    } else if (!description.valid) {
      if (description.errors['required']) {
        errorMsg = 'Please Input Description';
      } else if (description.errors['maxlength']) {
        errorMsg = 'The Description Must Less Than 200 Characters';
      } else if (description.errors['minlength']) {
        errorMsg = 'The Description Must Have At Least 10 Characters';
      }
    } else if (!category.valid) {
      if (description.errors['required'])
        errorMsg = 'Please Select The Category';

    } else if (!myDate.valid) {
      if (description.errors['required'])
        errorMsg = 'Please Select A Day';

    } else if (!filmName) {
      if (description.errors['required'])
        errorMsg = 'Please Select A Specific Film';

      this.generalService.alertMessage("errorMsg", errorMsg);
      return false;
    }
  }

  resetForm() {
    this.title = '';
    this.description = '';
  }

  createEvent(form) {
    let status = this.validate();
    this.submitAttempt = true;
    if (this.myGroup.valid && status) {
      this.eventService.createEvent(this.user_id, form.value.title, form.value.description, this.filmName, this.myDate, this.myTime)
        .subscribe(data => {
          if (data) {
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

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Event Is Created Successfully',
      duration: 3000,
      position: 'bottom'
    });
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

}







