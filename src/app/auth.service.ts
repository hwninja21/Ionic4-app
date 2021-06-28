import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { DataService } from './data.service';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // public isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public isAuthenticated = new BehaviorSubject<boolean>(false);
  // public temp = new BehaviorSubject<boolean>(false);
  constructor(private dataService: DataService, private router: Router, private storage: Storage, private http: HttpClient, private platform: Platform) {
    this.platform.ready().then(() => {
      this.checkToken();
    });
  }
  checkToken() {
    this.storage.get('TOKEN').then(res => {
      if (res) {
        this.isAuthenticated.next(true);
        // this.storage.get("userId").then((value)=>{
        //   this.dataService.getDataByUserId(value).subscribe(
        //     data =>{
        //       if(data["Forename"] !== 'Temp'){
        //         // this.temp.next(false);
        //         this.isAuthenticated.next(true);
        //         // this.router.navigate(['/tabs/tabs/tab1']);
        //       }
        //       if(data["Forename"] == 'Temp'){
        //         // this.temp.next(true);
        //         this.router.navigate(['/account']);
        //       }
        //   })
        // })
      }
    })
  }
  postLogin(data) {
    return this.http.post(`${apiUrl}/jwt-auth/v1/token`, data);
  }
  login(token: string) {
      this.storage.set('TOKEN', token).then(() => {
      this.isAuthenticated.next(true);
      // this.storage.get("userId").then((value)=>{
      //   this.dataService.getDataByUserId(value).subscribe(
      //     data =>{
      //       if(data["Forename"] !== 'Temp'){
      //         // this.temp.next(false);
      //         this.isAuthenticated.next(true);
      //       }
      //       if(data["Forename"] == 'Temp'){
      //         // console.log("test")
      //         // this.temp.next(true);
      //         this.router.navigate(['/account']);
      //       }
      //   })
      //})
    });
  }
  logout() {
      // this.storage.remove("loggedUser");
      this.storage.remove("currentPoints");
      this.storage.remove("currentBalance");
      this.storage.remove("SecurityPin");
      this.storage.remove('TOKEN').then(() => {
      this.storage.remove("userId").then(() => {
        this.isAuthenticated.next(false);
      });
    });
  }
  authState(): boolean {
    return this.isAuthenticated.value;
  }
}


