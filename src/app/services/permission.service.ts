import { Injectable } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Storage } from "@ionic/storage";
import 'rxjs/Rx';

@Injectable()
export class PermissionService {
    private userInfo: any;
    constructor(public navCtrl: NavController, public alertCtrl: AlertController, private storage: Storage) {

    }

    attachPermission(response) {
        this.storage.set('name', response);
    }




}