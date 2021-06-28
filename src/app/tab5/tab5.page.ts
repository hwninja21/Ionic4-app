import { Component, OnInit } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page  {

  constructor(private iab: InAppBrowser, private callNumber: CallNumber) {

  }

  openLocation() {
    this.iab.create(`https://www.facebook.com/maryjanesjava/`, `_blank`);
  }


  openMenu() {
   this.iab.create(`https://twitter.com/maryjanesjava/`, `_blank`);
  }

  openStory() {
    this.iab.create(`https://www.instagram.com/maryjanesjava/`, `_blank`);
  }
    openSite() {
      this.iab.create(`https://mary-janes.co.uk/`, `_blank`);

      } 

      openDirections() {
        this.iab.create(`https://www.google.com/maps/dir/?api=1&destination=51.463367,-2.609430`, `_blank`);
       }

Call(){
this.callNumber.callNumber("01179733857", true)
}
  




  }
  


