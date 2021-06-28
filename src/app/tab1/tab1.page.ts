import { Component, OnInit } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { Platform, AlertController } from '@ionic/angular'
import { File } from '@ionic-native/file/ngx';
import { Network } from '@ionic-native/network/ngx';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page {
disconnectSubscription: any;
token: string;

 constructor(private router: Router, private activatedRoute: ActivatedRoute, public alertController: AlertController, private network: Network, private platform: Platform, private file: File, private ft: FileTransfer, 
  private fileOpener: FileOpener, private document: DocumentViewer,private iab: InAppBrowser) {
    this.activatedRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.token = this.router.getCurrentNavigation().extras.state.token;
      }
    });
  }

  openLocation() {
    this.iab.create(`https://mary-janes.co.uk/location-in-bristol/`, `_blank`);
  }


  openMenu() {
   this.iab.create(`https://mary-janes.co.uk/wp-content/uploads/2019/05/Mary-Janes-Bristol_MENU.pdf`, `_blank`);
  }

  openStory() {
    this.iab.create(`https://mary-janes.co.uk/our-story/`, `_blank`);

} 
goToAccountSetting() {
  let navigationExtras: NavigationExtras = {
    state: {
      token: this.token
    }
  };
  this.router.navigate(["/tabs/tabs/update"], navigationExtras);
}
openLocalPdf() {
  this.disconnectSubscription = this.network.onDisconnect().subscribe(() => {
    let alert = this.alertController.create({
      message: 'You need to be connected to the internet in order to view this page!',
      header: 'Warning!',
      // subHeader: 'Subtitle',
      buttons: ['OK']
      });
      alert.then(alert => alert.present());
  });
  // stop disconnect watch
  this.disconnectSubscription.unsubscribe();
  let connectSubscription = this.network.onConnect().subscribe(() => {
    let alert = this.alertController.create({
      message: 'Network connected!',
      header: 'Warning!',
      // subHeader: 'Subtitle',
      buttons: ['OK']
      });
      alert.then(alert => alert.present());
    // We just got a connection but we need to wait briefly
     // before we determine the connection type. Might need to wait.
    // prior to doing any api requests as well.
    // setTimeout(() => {
    //   if (this.network.type === 'wifi') {
    //     console.log('we got a wifi connection, woohoo!');
    //   }
    // }, 3000);
  });
  
  // stop connect watch
  connectSubscription.unsubscribe();

  let filePath = this.file.applicationDirectory + 'www/assets';

  if (this.platform.is('android')) {
    
    let fakeName = Date.now();
    this.file.copyFile(filePath, 'Mary-Janes-Bristol_MENU.pdf', this.file.dataDirectory, `${fakeName}.pdf`).then(result => {
      this.fileOpener.open(result.nativeURL, 'application/pdf')
        .then(() => console.log('File is opened'))
        .catch(e => console.log('Error opening file', e));
    })
  } else {
    // Use Document viewer for iOS for a better UI
    const options: DocumentViewerOptions = {
      title: 'My PDF'
    }
    this.document.viewDocument(`${filePath}/Mary-Janes-Bristol_MENU.pdf`, 'application/pdf', options);
  }
}
}











