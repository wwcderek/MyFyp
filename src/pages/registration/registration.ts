import { Component, ViewChild } from '@angular/core';
import { IonicPage, Nav, NavParams, ViewController, AlertController } from 'ionic-angular';
import { Http, RequestOptions, Headers } from '@angular/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsernameValidator } from '../../validators/username';
import { AccountService } from '../../app/services/account.service';
import { GeneralService } from "../../app/services/general.service";
import { PasswordValidator } from  '../../validators/password';
import {StatusBar, Keyboard} from 'ionic-native';
/**
 * Generated class for the RegistrationPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-registration',
  templateUrl: 'registration.html',
  providers: [AccountService, GeneralService]
})
export class RegistrationPage {
  @ViewChild('signupSlider') signupSlider: any;
 username: string = '';
 password: string = '';
 confirm: string = '';  
  http: any;
  status: any;
  slideOneForm: FormGroup;
  submitAttempt: boolean = false;
  public navCtrl: Nav;
  public keyboard: Keyboard;

  constructor(public navParams: NavParams, public formBuilder: FormBuilder, public viewCtrl: ViewController, public alertCtrl: AlertController, http: Http, public accountService: AccountService, public generalService: GeneralService) {
    Keyboard.disableScroll(true);
    this.http = http;
    this.status = 0;
    this.slideOneForm = formBuilder.group({
      username: ['', Validators.compose([Validators.maxLength(15), Validators.minLength(3), Validators.required, Validators.pattern('[0-9]*[a-zA-Z]*[0-9]*')])],
      password: ['', Validators.compose([Validators.maxLength(15), Validators.minLength(6), Validators.required, Validators.pattern('((?=.*\\d)(?=.*[a-zA-Z]).{6,20})')])],
      confirm: ['', Validators.compose([Validators.maxLength(15), Validators.minLength(6), Validators.required, Validators.pattern('((?=.*\\d)(?=.*[a-zA-Z]).{6,20})')])]
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistrationPage');
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

    validate(): boolean {
        if (this.slideOneForm.valid && (this.slideOneForm.controls['password'].value===this.slideOneForm.controls['confirm'].value)) {
            return true;
        }

        // figure out the error message
        let errorMsg = '';

        // validate each field
        let control = this.slideOneForm.controls['username'];
        let control2 = this.slideOneForm.controls['password'];
        let control3 = this.slideOneForm.controls['confirm'];
        if (!control.valid) {
            if (control.errors['required']) {
                errorMsg = 'Provide a username please';
            } else if (control.errors['minlength']) {
                errorMsg = 'The username must have at least 3 characters';
            } else if (control.errors['maxlength']) {
                errorMsg = 'The username must less than 15 characters';
            }
        } else if (!control2.valid) {
            if (control2.errors['required']) {
                errorMsg = 'Provide a password please';
            } else if (control2.errors['minlength']) {
                errorMsg = 'The password must have at least 6 characters';
            } else if (control2.errors['maxlength']) {
                errorMsg = 'The password must less than 15 characters';
            } else if (control2.errors['pattern']) {
                errorMsg = 'A character should be included in the password';
            }
        } else if (control2.value!==control3.value) {
            errorMsg = 'Confirmed password not matched';
        }
        this.generalService.alertMessage("errorMsg",errorMsg);
        return false;
    }

  register(form) {
    let status = this.validate();
    this.submitAttempt = true;

    //   this.signupSlider.slideTo(0);
   if (this.slideOneForm.valid && status) {
      this.accountService.register(form.value.username, form.value.password)
          .map(res => res.json())
          .subscribe(data => {
              if(data) {
                  this.generalService.alertMessage("Message", "Your account created successfully");
                  this.closeModal();
              } else {
                  this.generalService.alertMessage("Error", "Account already existed");
              }
          }, error => {
              console.log(error);// Error getting the data
          });
    }
  }


  resetForm() {
    this.username = '';
    this.password = '';
    this.confirm = '';
  }


}
