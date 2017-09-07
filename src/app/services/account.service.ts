import { Injectable } from '@angular/core';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class AccountService {
    http: any;
    headers: any;
    constructor(http: Http, public navCtrl: NavController) {
        this.http = http;
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
    }

    // login(name, password) {
    //     return this.http.get("http://localhost:8100/ionic3_project/ComeAndWatch/src/php/login.php?action=checkLogin&name=" + name + "&password=" + password)
    //         .map(res => res.json());
    // }

    login(name, password) {
        console.log("see?");
        let body = {
            name: name,
            password: password
        };
        return this.http.post('http://127.0.0.1:8000/login', JSON.stringify(body), {headers:this.headers})
    }

    logout() {
        this.http.post('http://127.0.0.1:8000/logout');
    }

    // register(name, password) {
    //     return this.http.get("http://localhost:8100/ionic3_project/ComeAndWatch/src/php/account.php?action=createAccount&name=" + name + "&password=" + password)
    // }

    register(name, password) {
        let body = {
            name: name,
            password: password
        };
       return this.http.post('http://127.0.0.1:8000/registration', JSON.stringify(body), {headers:this.headers})
    }

    // checkAccount(name) {
    //     return this.http.get("http://localhost:8100/ionic3_project/ComeAndWatch/src/php/account.php?action=checkAccount")
    // }

}