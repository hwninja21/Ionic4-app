import { Component, OnInit } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import {
  BarcodeScannerOptions,
  BarcodeScanner
} from "@ionic-native/barcode-scanner/ngx";

import { Storage } from '@ionic/storage';
import { ProfilePage } from '../profile/profile.page';
import { File } from '@ionic-native/file/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ElementRef } from '@angular/core';
import {AuthService} from '../auth.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page {
  encodeData: any;
  scannedData: {};
  barcodeScannerOptions: BarcodeScannerOptions;
  pointsNum: number;
  backgroundStyle: string;
  constructor(public authService: AuthService, public dataService: DataService, private elementRef:ElementRef, private router: Router,private activatedRoute: ActivatedRoute, private photoViewer: PhotoViewer,private file: File, private barcodeScanner: BarcodeScanner, private iab: InAppBrowser,public storage: Storage,) 
    {
    this.encodeData = "https://www.FreakyJolly.com";
    //Options
    this.barcodeScannerOptions = {
      showTorchButton: true,
      showFlipCameraButton: true
    };
    // this.num = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    // console.log("Auth", this.authService.isAuthenticated.next())
  }
  ngOnInit(){
    this.storage.get('currentPoints').then((value)=>{
      this.pointsNum = value;
      // if(value == 0){
      //   console.log("3333333")
      //   this.elementRef.nativeElement.style.setProperty('--my-var', "url(../assets/images/Loyalty0.png) no-repeat 52% center/cover"); 
      // } else if(value == 1){
      //   this.elementRef.nativeElement.style.setProperty('--my-var', "url(../assets/images/Loyalty1.png) no-repeat 52% center/cover"); 
      // } else if(value == 2){
      //   this.elementRef.nativeElement.style.setProperty('--my-var', "url(../assets/images/Loyalty2.png) no-repeat 52% center/cover"); 
      // } else if(value== 3){
      //   this.elementRef.nativeElement.style.setProperty('--my-var', "url(../assets/images/Loyalty3.png) no-repeat 52% center/cover"); 
      // } else if(value == 4){
      //   this.elementRef.nativeElement.style.setProperty('--my-var', "url(../assets/images/Loyalty4.png) no-repeat 52% center/cover"); 
      // } else if(value== 5){
      //   this.elementRef.nativeElement.style.setProperty('--my-var', "url(../assets/images/Loyalty5.png) no-repeat 52% center/cover"); 
      // } else if(value == 6){
      //   this.elementRef.nativeElement.style.setProperty('--my-var', "url(../assets/images/Loyalty6.png) no-repeat 52% center/cover"); 
      // } 
      // else if (value == 7){
      //   this.pointsNum = 0;
      //   this.elementRef.nativeElement.style.setProperty('--my-var', "url(../assets/images/Loyalty0.png) no-repeat 52% center/cover"); 
      // }
    })
  }
  viewPhoto_0() {
    let imageName = "Loyalty0.png";
    const ROOT_DIRECTORY = this.file.applicationStorageDirectory;//'file:///sdcard//';
    const downloadFolderName = 'tempDownloadFolder';
    
    //Create a folder in memory location
    this.file.createDir(ROOT_DIRECTORY, downloadFolderName, true)
      .then((entries) => {
 
        //Copy our asset/img/logo.jpg to folder we created
        this.file.copyFile(this.file.applicationDirectory + "www/assets/images/", imageName, ROOT_DIRECTORY + downloadFolderName + '//', imageName)
          .then((entries) => {
 
            this.photoViewer.show(ROOT_DIRECTORY + downloadFolderName + "/" + imageName, 'Do you want to Share', {share: true});
            
           })
          .catch((error) => {
            alert('1 error ' + JSON.stringify(error));
          });
      })
      .catch((error) => {
        alert('2 error' + JSON.stringify(error));
      });
  }

  viewPhoto_1() {
    let imageName = "Loyalty1.png";
    const ROOT_DIRECTORY = this.file.applicationStorageDirectory;//'file:///sdcard//';
    const downloadFolderName = 'tempDownloadFolder';
    
    //Create a folder in memory location
    this.file.createDir(ROOT_DIRECTORY, downloadFolderName, true)
      .then((entries) => {
 
        //Copy our asset/img/logo.jpg to folder we created
        this.file.copyFile(this.file.applicationDirectory + "www/assets/images/", imageName, ROOT_DIRECTORY + downloadFolderName + '//', imageName)
          .then((entries) => {
 
            this.photoViewer.show(ROOT_DIRECTORY + downloadFolderName + "/" + imageName, 'Do you want to Share', {share: true});
            
           })
          .catch((error) => {
            alert('1 error ' + JSON.stringify(error));
          });
      })
      .catch((error) => {
        alert('2 error' + JSON.stringify(error));
      });
  }

  viewPhoto_2() {
    let imageName = "Loyalty2.png";
    const ROOT_DIRECTORY = this.file.applicationStorageDirectory;//'file:///sdcard//';
    const downloadFolderName = 'tempDownloadFolder';
    
    //Create a folder in memory location
    this.file.createDir(ROOT_DIRECTORY, downloadFolderName, true)
      .then((entries) => {
 
        //Copy our asset/img/logo.jpg to folder we created
        this.file.copyFile(this.file.applicationDirectory + "www/assets/images/", imageName, ROOT_DIRECTORY + downloadFolderName + '//', imageName)
          .then((entries) => {
 
            this.photoViewer.show(ROOT_DIRECTORY + downloadFolderName + "/" + imageName, 'Do you want to Share', {share: true});
            
           })
          .catch((error) => {
            alert('1 error ' + JSON.stringify(error));
          });
      })
      .catch((error) => {
        alert('2 error' + JSON.stringify(error));
      });
  }
  
  
  viewPhoto_3() {
    let imageName = "Loyalty3.png";
    const ROOT_DIRECTORY = this.file.applicationStorageDirectory;//'file:///sdcard//';
    const downloadFolderName = 'tempDownloadFolder';
    
    //Create a folder in memory location
    this.file.createDir(ROOT_DIRECTORY, downloadFolderName, true)
      .then((entries) => {
 
        //Copy our asset/img/logo.jpg to folder we created
        this.file.copyFile(this.file.applicationDirectory + "www/assets/images/", imageName, ROOT_DIRECTORY + downloadFolderName + '//', imageName)
          .then((entries) => {
 
            this.photoViewer.show(ROOT_DIRECTORY + downloadFolderName + "/" + imageName, 'Do you want to Share', {share: true});
            
           })
          .catch((error) => {
            alert('1 error ' + JSON.stringify(error));
          });
      })
      .catch((error) => {
        alert('2 error' + JSON.stringify(error));
      });
  }
  
  
  viewPhoto_4() {
    let imageName = "Loyalty4.png";
    const ROOT_DIRECTORY = this.file.applicationStorageDirectory;//'file:///sdcard//';
    const downloadFolderName = 'tempDownloadFolder';
    
    //Create a folder in memory location
    this.file.createDir(ROOT_DIRECTORY, downloadFolderName, true)
      .then((entries) => {
 
        //Copy our asset/img/logo.jpg to folder we created
        this.file.copyFile(this.file.applicationDirectory + "www/assets/images/", imageName, ROOT_DIRECTORY + downloadFolderName + '//', imageName)
          .then((entries) => {
 
            this.photoViewer.show(ROOT_DIRECTORY + downloadFolderName + "/" + imageName, 'Do you want to Share', {share: true});
            
           })
          .catch((error) => {
            alert('1 error ' + JSON.stringify(error));
          });
      })
      .catch((error) => {
        alert('2 error' + JSON.stringify(error));
      });
  }
  
  
  viewPhoto_5() {
    let imageName = "Loyalty5.png";
    const ROOT_DIRECTORY = this.file.applicationStorageDirectory;//'file:///sdcard//';
    const downloadFolderName = 'tempDownloadFolder';
    
    //Create a folder in memory location
    this.file.createDir(ROOT_DIRECTORY, downloadFolderName, true)
      .then((entries) => {
 
        //Copy our asset/img/logo.jpg to folder we created
        this.file.copyFile(this.file.applicationDirectory + "www/assets/images/", imageName, ROOT_DIRECTORY + downloadFolderName + '//', imageName)
          .then((entries) => {
 
            this.photoViewer.show(ROOT_DIRECTORY + downloadFolderName + "/" + imageName, 'Do you want to Share', {share: true});
            
           })
          .catch((error) => {
            alert('1 error ' + JSON.stringify(error));
          });
      })
      .catch((error) => {
        alert('2 error' + JSON.stringify(error));
      });
  }
  
  
  viewPhoto_6() {
    let imageName = "Loyalty6.png";
    const ROOT_DIRECTORY = this.file.applicationStorageDirectory;//'file:///sdcard//';
    const downloadFolderName = 'tempDownloadFolder';
    
    //Create a folder in memory location
    this.file.createDir(ROOT_DIRECTORY, downloadFolderName, true)
      .then((entries) => {
 
        //Copy our asset/img/logo.jpg to folder we created
        this.file.copyFile(this.file.applicationDirectory + "www/assets/images/", imageName, ROOT_DIRECTORY + downloadFolderName + '//', imageName)
          .then((entries) => {
 
            this.photoViewer.show(ROOT_DIRECTORY + downloadFolderName + "/" + imageName, 'Do you want to Share', {share: true});
            
           })
          .catch((error) => {
            alert('1 error ' + JSON.stringify(error));
          });
      })
      .catch((error) => {
        alert('2 error' + JSON.stringify(error));
      });
  }
  
  
  // openLockscreen() {
  //   this.navCtrl.push(LockScreenComponent,{
  //     code:'1234',
  //     ACDelbuttons:false,
  //     passcodeLabel:'Please Enter Passcode',
  //     onCorrect:function(){
  //       console.log('Input correct!');
  //     },
  //     onWrong:function(attemptNumber){
  //       console.log(attemptNumber + ' wrong passcode attempt(s)');
  //     }
  //   });
  // }

 
  scanCode() {
    this.barcodeScanner
      .scan()
      .then(barcodeData => {
        alert("Barcode data " + JSON.stringify(barcodeData));
        this.scannedData = barcodeData;
      })
      .catch(err => {
        console.log("Error", err);
      });
  }
  clickPassCode(){
    this.storage.set('SecurityPin', '3105');
    this.router.navigateByUrl(`/tabs/tabs/keypad`+'/'+this.pointsNum);
  }

  



 
  encodedText() {
    this.barcodeScanner
      .encode(this.barcodeScanner.Encode.TEXT_TYPE, this.encodeData)
      .then(
        encodedData => {
          console.log(encodedData);
          this.encodeData = encodedData;
        },
        err => {
          console.log("Error occured : " + err);
        }
      );
  }
}




