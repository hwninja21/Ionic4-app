
import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular'
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Environment } from '@ionic-native/google-maps/';
import { Tab1PageModule } from './tab1/tab1.module';
import { Router } from '@angular/router';
import {AuthService} from './auth.service';
import { DataService } from './data.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html', 
//  template: '<ion-nav #myNav [root]="rootPage"></ion-nav>'
  
})
export class AppComponent {
  // @ViewChild('myNav') nav: NavController
  // public rootPage: any = Tab1PageModule;
    constructor(
    private router: Router,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public authService: AuthService,
    private dataService: DataService,
    private storage: Storage
  ) {
    this.initializeApp();
    
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Environment.setEnv({
      //   // api key for server
      //   'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyAvk1Lw5XQZ_PmZQPQ4pv0sDHbeoIbJC5g',
 
      //   // api key for local development
      //   'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyAvk1Lw5XQZ_PmZQPQ4pv0sDHbeoIbJC5g'
      // });
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.authService.isAuthenticated.subscribe(state => {
        if (state) {
          // this.authService.temp.subscribe(temp => {
          //   if(temp){
          //     this.router.navigate(['/account']);
          //   } else {
          //     this.router.navigate(['/tabs/tabs/tab1']);
          //   }
          // })
          // this.router.navigate(['/tabs/tabs/tab1']);
          this.storage.get("userId").then((value)=>{
            if(value !== null){
              this.dataService.getDataByUserId(value).subscribe(
                data =>{
                  if(data["Forename"] !== 'Temp'){
                    
                    this.router.navigate(['/tabs/tabs/tab1']);
                  }
                  if(data["Forename"] == 'Temp'){
                    this.router.navigate(['/account']);
                  }
              })
            }
          })
          
        } else {
          this.router.navigate(['/profile']);
        }
      });
    });
  }
}
