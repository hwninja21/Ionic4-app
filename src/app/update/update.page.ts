import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import { DataService } from '../data.service';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ElementRef } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';


@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})
export class UpdatePage implements OnInit {
  token: string;
  constructor(private router: Router, private activatedRoute: ActivatedRoute, public authService: AuthService, public dataService: DataService) {
    this.activatedRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.token = this.router.getCurrentNavigation().extras.state.token;
      }
    });
   }

  ngOnInit() {
  }
  goToDetails() {
    let navigationExtras: NavigationExtras = {
      state: {
        token: this.token
      }
    };
    this.router.navigate(["/tabs/tabs/details"], navigationExtras);
  }
  onLogout() {
    this.authService.logout();
  }

}
