import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import { DataService } from '../data.service';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  model: any = {};
  submitted = false;
  loading: any;
  loginForm: FormGroup;
  loginFailure: string;
  showPasswordText: boolean;
  msg: string;
  foreName: string;
  surName: string;

  constructor( public loadingCtrl: LoadingController, private activatedRoute: ActivatedRoute, private router: Router, public storage: Storage, public formBuilder: FormBuilder, public authService: AuthService, public dataService: DataService) {
    this.loginForm = this.formBuilder.group({
      password: new FormControl('', [Validators.required]),
      // DateOfBirth: new FormControl(''),
      username: new FormControl('', [Validators.required, Validators.email]),
      keepLogged: new FormControl(true),
      // opt: new FormControl(false)
    });
    this.activatedRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.msg = this.router.getCurrentNavigation().extras.state.resetSuccessfulMsg;
        // this.foreName = this.router.getCurrentNavigation().extras.state.foreName;
        // this.surName = this.router.getCurrentNavigation().extras.state.surName;
      }
    });
    // this.myId = this.activatedRoute.snapshot.paramMap.get('myid');
    this.showPasswordText = false;
  }

  ngOnInit() {
  }
  get frm() { return this.loginForm.controls; } 
  onLogin(value: any): void {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    } else {
      this.showLoader();
      // let consent = '';
      // let user = {};
      // if(value.opt){
      //   consent = 'yes';
      // } else {
      //   consent = 'no';
      // }
      // user = {
      //   bday: value.DateOfBirth,
      //   consent: consent,
      //   consent_date: new Date()
      // }
      this.authService.postLogin(value).subscribe(
        data => {
          this.loading.then(loading => loading.dismiss());
          let token = data['token'];
          // if(value.keepLogged){
          //   this.authService.login(data['token']);
          // }
          
          // this.dataService.updateUserOfWp(user, data['token']).subscribe(
          //   data =>{
          // })
          this.storage.remove('userId').then(() => {
            this.dataService.getDataByEmail(value.username).subscribe(data => {
              this.storage.set("currentPoints", data[0].CurrentPoints);
              this.storage.set("currentBalance", data[0].CurrentBalance);
              this.storage.set("userId", data[0].Id);
              // this.storage.set("loggedUser", data[0]);
              if(value.keepLogged){
                this.authService.login(token);
              } else {
                let navigationExtras: NavigationExtras = {
                  state: {
                    token: token
                  }
                };
                this.authService.isAuthenticated.next(true);
                if(data[0].Forename == 'Temp'){
                  // this.authService.temp.next(true);
                  this.router.navigate(['/account'], navigationExtras);
                } else if(data[0].Forename !== 'Temp') {
                  // this.authService.temp.next(false);
                  this.router.navigate(['/tabs/tabs/tab1'], navigationExtras);
                }
              }
              
              // let putData = [];
              // putData = [{
              //   Id: data[0].Id,
              //   EmailAddress: value.username,
              //   Forename: this.foreName,
              //   Surname: this.surName,
              //   Type: data[0].Type,
              //   DateOfBirth: value.DateOfBirth,
              //   SignUpDate: data[0].SignUpDate,
              // }];
              // this.dataService.putDataToEpos(putData).subscribe(data => {
              // })
            })
          })
          
        },
        error => {
          this.loading.then(loading => loading.dismiss());
          // console.log("ERROR", (error.error)['code']);
          let errorType = (error.error)['code'];
          if(errorType.includes('invalid_email')){
            this.loginFailure = 'Invalid email address';
          }
          if(errorType.includes('incorrect_password')){
            this.loginFailure = 'The password you entered is incorrect.';
          }
          // this.loginFailure = "Cannot login with the given credentials.";
        }
      );
    }
  }
  showLoader(){
    this.loading = this.loadingCtrl.create({
      spinner: "circles" ,
      // duration: 2000,
      message: 'Please wait...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    this.loading.then(loading => loading.present());
  }
}
