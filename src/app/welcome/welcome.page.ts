import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
 

})
export class WelcomePage implements OnInit {

  slideOpts = {
    initialSlide: 1,
    speed: 400
  };
  token: string;
  constructor(private activatedRoute: ActivatedRoute, private router: Router) { 
    this.activatedRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.token = this.router.getCurrentNavigation().extras.state.token;
      }
    });
  }

  ngOnInit() {
  }
  goToHomePage(){
    let navigationExtras: NavigationExtras = {
      state: {
        token: this.token
      }
    };
    this.router.navigate(["/tabs/tabs/tab1"], navigationExtras);
  }
}
