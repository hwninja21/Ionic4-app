import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  model: any = {};
  
  constructor(public authService: AuthService, public dataService: DataService) { }

  ngOnInit() {
  }

  onLogout() {
    this.authService.isAuthenticated.next(false);
  }
}
