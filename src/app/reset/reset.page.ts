import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import {AuthService} from '../auth.service';
import { DataService } from '../data.service';
import { Router, NavigationExtras } from '@angular/router';
@Component({
  selector: 'app-reset',
  templateUrl: './reset.page.html',
  styleUrls: ['./reset.page.scss'],
})
export class ResetPage implements OnInit {
  resetForm: FormGroup;
  submitted = false;
  resetFailure: string;
  
  constructor(private router: Router, public dataService: DataService, public authService: AuthService, public formBuilder: FormBuilder) {
    this.resetForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
   }

  ngOnInit() {
  }
  get frm() { return this.resetForm.controls; }  
  onReset(value: any): void {
    this.submitted = true;
      if (this.resetForm.invalid) {
          return;
      } else {
        var email = {
          user_login: value.email
        }
        this.dataService.resetPassword(email).subscribe(
          data =>{
            let navigationExtras: NavigationExtras = {
              state: {
                resetSuccessfulMsg: 'Please check your inbox / junk mail folder soon as you will be sent a link to reset your password'
              }
            };
            this.router.navigate(['/login'], navigationExtras);
          }, err=>{
            this.resetFailure = 'Please enter the email address you created an account with';
          }
        )
      }
  }

}
