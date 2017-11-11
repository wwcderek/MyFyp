import { Injectable } from '@angular/core';
import { Component } from '@angular/core';
import { IonicPage, Nav, NavParams, ModalController, AlertController } from 'ionic-angular';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class AccountService {
    http: any;
    headers: any;
    public navCtrl: Nav;
    constructor(http: Http) {
        this.http = http;
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
    }


    login(name, password) {
        let body = {
            name: name,
            password: password
        };
        return this.http.post('http://101.78.175.101:6780/login', JSON.stringify(body), {headers:this.headers})
    }

    logout() {
        this.http.post('http://127.0.0.1:8000/logout');
    }

    register(name, password) {
        let body = {
            name: name,
            password: password
        };
       return this.http.post('http://101.78.175.101:6780/registration', JSON.stringify(body), {headers:this.headers})
    }

}