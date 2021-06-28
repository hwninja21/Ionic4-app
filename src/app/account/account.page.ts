import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import { DataService } from '../data.service';
import { Storage } from '@ionic/storage';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-profile',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  loading: any;
  // user: any={};
  // userOfEpos: any=[];
  putData: any=[];
  // data: any;
  signupForm: FormGroup;
  submitted = false;
  signupFailure: string;
  token: string;

  constructor(public loadingCtrl: LoadingController, public storage: Storage, public formBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private router: Router, public authService: AuthService, public dataService: DataService) { 
    this.activatedRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.token = this.router.getCurrentNavigation().extras.state.token;
      }
    });
    // storage.get('loggedUser').then((value) => {
    //   console.log("LoggedUser", value)
    //   this.putData = [{
    //     Id: value.Id,
    //     // Forename: value.Forename,
    //     // Surname: value.Surname,
    //     EmailAddress: value.EmailAddress,
    //     Type: value.Type,
    //     SignUpDate: value.SignUpDate,
    //     // DateOfBirth: value.DateOfBirth
    //   }]
    // })
    storage.get("userId").then((value)=>{
      this.dataService.getDataByUserId(value).subscribe(
        data =>{
          this.putData = [{
            Id: data["Id"],
            EmailAddress: data["EmailAddress"],
            // Forename: value.Forename,
            // Surname: value.Surname,
            // EmailAddress: value.EmailAddress,
            Type: data["Type"],
            SignUpDate: data["SignUpDate"],
            
            // DateOfBirth: value.DateOfBirth
          }]
      })
    })
    storage.get("TOKEN").then((value) => {
      if(value){
        this.token = value;
      }
      // this.dataService.getUserOfWp(value).subscribe(
      //   data =>{
      //     let opt = true;
      //     if(data["consent"] == 'yes'){
      //       opt = true;
      //     } else {
      //       opt = false;
      //     }
      //     this.resetForm.setValue({email: this.email, Forename: this.foreName, Surname: this.surName, DateOfBirth: this.dateOfBirth, opt: opt}); 
      // })
    })
    this.signupForm = this.formBuilder.group({
      //username: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(4), Validators.maxLength(10)]),
      Forename: new FormControl('', [Validators.required]),
      Surname: new FormControl('', [Validators.required]),
      DateOfBirth: new FormControl('', [Validators.required]),
      optout: new FormControl(false)
    });
  }

  ngOnInit() {
  }
  onLogout() {
    // this.authService.isAuthenticated.next(false);
    this.authService.logout();
  }

  get frm() { return this.signupForm.controls; }  
  onRegister(value: any): void{
    this.submitted = true;
    if (this.signupForm.invalid) {
      return;
    } else {
      this.showLoader();
      // this.user = {
      //   email: this.data.email,
      //   // username: this.data.username,
      //   password: this.data.password,
      //   forename: value.Forename,
      //   surname: value.Surname,
      //   // DateOfBirth: value.DateOfBirth
      // }
      // this.userOfEpos = [{
      //   EmailAddress: this.data.email,
      //   Forename: value.Forename,
      //   Surname: value.Surname,
      //   CurrentPoints: 0,
      //   DateOfBirth: value.DateOfBirth,
      //   CurrentBalance: 0,
      //   Type: 27542
      // }]
      
      // this.dataService.postDataToWp(this.user).subscribe(
      //   data =>{
      //     this.dataService.postDataToEpos(this.userOfEpos).subscribe(data => {
      //       this.loading.then(loading => loading.dismiss());
      //       this.router.navigate(['/welcome']);
      //       // let navigationExtras: NavigationExtras = {
      //       //   state: {
      //       //     foreName: value.Forename,
      //       //     surName: value.Surname
      //       //   }
      //       // };
      //       // this.router.navigate(['/login'], navigationExtras);
      //     })
      // }, err => {
      //   this.loading.then(loading => loading.dismiss());
      //   this.signupFailure = "Email already exists.";
      // })
      let consent = '';
      // if((this.putData)[0].EmailAddress !== value.email){
      //   (this.putData)[0].EmailAddress = value.email;
      //   this.usernameWarningMsg = 'Please note that your login name will stay the original email';
      // }
      if(value.optout){
        consent = 'yes';
      } else {
        consent = 'no';
      }
      // (this.putData)[0].EmailAddress = value.email;
      (this.putData)[0].Forename = value.Forename;
      (this.putData)[0].Surname = value.Surname;
      (this.putData)[0].DateOfBirth = value.DateOfBirth;
      
      let user = {
        //email: value.email,
        // username: value.email,
        // password: this.data.password,
        first_name: value.Forename,
        last_name: value.Surname,
        bday: value.DateOfBirth,
        consent: consent,
        consent_date: new Date()
      }
      this.dataService.putDataToEpos(this.putData).subscribe(data => {
        if(this.token !== null){
          let navigationExtras: NavigationExtras = {
            state: {
              token: this.token
            }
          };
          this.dataService.updateUserOfWp(user, this.token).subscribe(
            data =>{
              this.loading.then(loading => loading.dismiss());
              // this.router.navigate(['/tabs/tabs/update']);
              this.router.navigate(['/welcome'], navigationExtras);
          })
        }
      })
    };
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

