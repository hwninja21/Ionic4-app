import { Component, ElementRef, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import { DataService } from '../data.service';
import { Router, NavigationExtras } from '@angular/router';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  model: any={};
  loading: any;
  signupForm: FormGroup;
  private _link : string;
  submitted = false;
  username: any;
  password: any;
  email: any;
  showPasswordText: boolean;
  showPasswordText1: boolean;
  passwordNotMatch: boolean;
  signupFailure: string;

  constructor(public loadingCtrl: LoadingController, private router: Router, public formBuilder: FormBuilder, public authService: AuthService, public dataService: DataService, private _browser : InAppBrowser, private _element : ElementRef ) {
    this.signupForm = this.formBuilder.group({
      //username: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(4), Validators.maxLength(10)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(14)]),
      password1: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(14)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      termsOfUse: new FormControl(false, [Validators.requiredTrue])
    });
    this.showPasswordText = false;
    this.showPasswordText1 = false;
    this.passwordNotMatch = false;
  }
  ngOnInit() {
    this._enableDynamicHyperlinks();
  }

  private _enableDynamicHyperlinks() : void
    {
      // Provide a minor delay to allow the HTML to be rendered and 'found'
      // within the view template
      setTimeout(() =>
      {
          // Query the DOM to find ALL occurrences of the <a> hyperlink tag
          const urls : any    = this._element.nativeElement.querySelectorAll('a');

          // Iterate through these
          urls.forEach((url) =>
          {
            // Listen for a click event on each hyperlink found
            url.addEventListener('click', (event) =>
            {
                // Retrieve the href value from the selected hyperlink
                event.preventDefault();
                this._link = event.target.href;

                // Log values to the console and open the link within the InAppBrowser plugin
                console.log('Name is: ' + event.target.innerText);
                console.log('Link is: ' + this._link);
                this._launchInAppBrowser(this._link);
            }, false);
          });
      }, 2000);
    }
    
     private _launchInAppBrowser(link : string) : void
     {
        let opts : string = "location=yes,clearcache=yes,hidespinner=no"
        this._browser.create(link, '_blank', opts);
     }

     onSubmit(value: any): void { 
      this.submitted = true;
      if(value.password == value.password1){
        this.passwordNotMatch = false;
      } else {
        this.passwordNotMatch = true;
      }
      if (this.signupForm.invalid) {
        return;
      } else {
        // let navigationExtras: NavigationExtras = {
        //   state: {
        //     user: {
        //     username: value.email,
        //     email: value.email,
        //     password: value.password
        //     }
        //   }
        // };
        // this.router.navigate(['/account'], navigationExtras);
        this.showLoader();
        let user = {
          email: value.email,
          // username: this.data.username,
          password: value.password,
          // forename: value.Forename,
          // surname: value.Surname,
          // DateOfBirth: value.DateOfBirth
        }
        let userOfEpos = [{
          EmailAddress: value.email,
          Forename: 'Temp',
          // Forename: value.Forename,
          // Surname: value.Surname,
          CurrentPoints: 0,
          // DateOfBirth: value.DateOfBirth,
          CurrentBalance: 0,
          Type: 27542
        }]
        
        this.dataService.postDataToWp(user).subscribe(
          data =>{
            this.dataService.postDataToEpos(userOfEpos).subscribe(data => {
              this.loading.then(loading => loading.dismiss());
              // this.router.navigate(['/welcome']);
              this.router.navigate(['/login']);
              // let navigationExtras: NavigationExtras = {
              //   state: {
              //     foreName: value.Forename,
              //     surName: value.Surname
              //   }
              // };
              // this.router.navigate(['/login'], navigationExtras);
            })
        }, err => {
          this.loading.then(loading => loading.dismiss());
          this.signupFailure = "Email already exists.";
        })
        
      }
     }
    get frm() { return this.signupForm.controls; }  
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
