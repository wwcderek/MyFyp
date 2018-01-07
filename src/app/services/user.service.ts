import { Injectable } from '@angular/core';
import { Component } from '@angular/core';
import { IonicPage, Nav, NavParams, ModalController, AlertController } from 'ionic-angular';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class UserService {
    public username: any;
    http: any;
    headers: any;
    public navCtrl: Nav;
    constructor(http: Http) {
        this.http = http;
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
    }

    uploadIcon(path, Iconname, username) {
        let body = {
            path: path,
            iconname: Iconname,
            username: username,
        };
        return this.http.post('http://101.78.175.101:6780/uploadIcon', JSON.stringify(body), {headers:this.headers})
    }

    updateProfile(username, displayname, email) {
        let body = {
            username: username,
            displayname: displayname,
            email: email,
        };
        return this.http.post('http://101.78.175.101:6780/updateProfile', JSON.stringify(body), {headers:this.headers})
        
    }


}