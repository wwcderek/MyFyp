import { Injectable } from '@angular/core';
import { Nav, AlertController } from 'ionic-angular';
import { Storage } from "@ionic/storage";
import 'rxjs/Rx';

@Injectable()
export class PermissionService {
    private userInfo: any;
    public navCtrl: Nav;
    constructor(public alertCtrl: AlertController, private storage: Storage) {

    }

    attachPermission(response) {
        this.storage.set('name', response);
    }




}