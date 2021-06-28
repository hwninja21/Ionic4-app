import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import { DataService } from '../data.service';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';


import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  loading: any;
  user: any={};
  // data: any;
  resetForm: FormGroup;
  submitted = false;
  userId: number;
  foreName: string;
  surName: string;
  dateOfBirth: any;
  putData: any=[];
  email: string;
  // msg: string;
  token: string;
  // usernameWarningMsg: string;

  constructor(public toastController: ToastController, public loadingCtrl: LoadingController,public storage: Storage, public formBuilder: FormBuilder,private activatedRoute: ActivatedRoute, private router: Router, public authService: AuthService, public dataService: DataService) { 
    // this.activatedRoute.queryParams.subscribe(params => {
    //   if (this.router.getCurrentNavigation().extras.state) {
    //     this.data = this.router.getCurrentNavigation().extras.state.user;
    //   }
    // });

    // this.activatedRoute.queryParams.subscribe(params => {
    //   if (this.router.getCurrentNavigation().extras.state) {
    //     this.msg = this.router.getCurrentNavigation().extras.state.resetSuccessfulMsg;
    //   }
    // });
    
    // storage.get('loggedUser').then((value) => {
    //   console.log("LoggedUser", value)
    //   this.putData = [{
    //     Id: value.Id,
    //     // Forename: value.Forename,
    //     // Surname: value.Surname,
    //     // EmailAddress: value.EmailAddress,
    //     Type: value.Type,
    //     SignUpDate: value.SignUpDate,
    //     // DateOfBirth: value.DateOfBirth
    //   }]
    // })
    storage.get("userId").then((value)=>{
      this.userId = value;
      this.dataService.getDataByUserId(this.userId).subscribe(
        data =>{
          this.putData = [{
            Id: data["Id"],
            // Forename: value.Forename,
            // Surname: value.Surname,
            // EmailAddress: value.EmailAddress,
            Type: data["Type"],
            SignUpDate: data["SignUpDate"],
            CurrentBalance: data["CurrentBalance"],
            CurrentPoints: data["CurrentPoints"]
            // DateOfBirth: value.DateOfBirth
          }]
          this.email = data["EmailAddress"];
          this.foreName = data["Forename"];
          this.surName = data["Surname"];
          this.dateOfBirth = new Date(data["DateOfBirth"]).toUTCString();
      })
    })
    storage.get("TOKEN").then((value) => {
      if(value){
        this.token = value;
        this.dataService.getUserOfWp(value).subscribe(
        data =>{
          let opt = true;
          // let email = data["email"];
          // let foreName = data["first_name"];
          // let surName = data["last_name"];
          if(data["consent"] == 'yes'){
            opt = true;
          } else {
            opt = false;
          }
          this.resetForm.setValue({email: this.email, Forename: this.foreName, Surname: this.surName, DateOfBirth: this.dateOfBirth, opt: opt}); 
        })
      }
    })
    this.activatedRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        let token = this.router.getCurrentNavigation().extras.state.token;
        if(token){
          this.token = token;
          this.dataService.getUserOfWp(token).subscribe(
            data =>{
              let opt = true;
              if(data["consent"] == 'yes'){
                opt = true;
              } else {
                opt = false;
              }
              this.resetForm.setValue({email: this.email, Forename: this.foreName, Surname: this.surName, DateOfBirth: this.dateOfBirth, opt: opt}); 
          })
        }
      }
    });
    
    this.resetForm = this.formBuilder.group({
      //username: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(4), Validators.maxLength(10)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      Forename: new FormControl('', [Validators.required]),
      Surname: new FormControl('', [Validators.required]),
      DateOfBirth: new FormControl('', [Validators.required]),
      opt: new FormControl(false)
    });
    
  }

  ngOnInit() {
  }

  onLogout() {
    this.authService.isAuthenticated.next(false);
  }
  get frm() { return this.resetForm.controls; }  
  onReset(value: any): void{
    this.submitted = true;
    if (this.resetForm.invalid) {
      return;
    } else {
      this.showLoader();
      this.showToast();
      // console.log("Email1", (this.putData)[0].EmailAddress);
      // console.log("Email2", value.email);
      let consent = '';
      // if((this.putData)[0].EmailAddress !== value.email){
      //   (this.putData)[0].EmailAddress = value.email;
      //   this.usernameWarningMsg = 'Please note that your login name will stay the original email';
      // }
      if(value.opt){
        consent = 'yes';
      } else {
        consent = 'no';
      }
      (this.putData)[0].EmailAddress = value.email;
      (this.putData)[0].Forename = value.Forename;
      (this.putData)[0].Surname = value.Surname;
      (this.putData)[0].DateOfBirth = value.DateOfBirth;
      
      this.user = {
        email: value.email,
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
          this.dataService.updateUserOfWp(this.user, this.token).subscribe(
            data =>{
              this.loading.then(loading => loading.dismiss());
              this.router.navigate(['/tabs/tabs/update']);
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

showToast() {
  this.toastController.create({
    message: 'Thanks for updating your profile.',
    duration: 2000,
    animated: true,
    showCloseButton: true,
    closeButtonText: "OK",
    cssClass: "my-toast",
    position: "middle"
  }).then((obj) => {
    obj.present();
  });
}
}
