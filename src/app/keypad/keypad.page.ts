import { Component, OnInit } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Storage } from '@ionic/storage';
import { Tab2PageModule } from '../tab2/tab2.module';
import { File } from '@ionic-native/file/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-keypad',
  templateUrl: './keypad.page.html',
  styleUrls: ['./keypad.page.scss'],
 
 providers: []
})


export class KeypadPage {
  encodeData: any;
  scannedData: {};
  custom: 10;
  passcode:any;
  pageStatus:any;
  codeone:any;
  codetwo:any;
  codethree:any;
  codefour:any;
  // int :any;
  newPincount :any;
  message :any;
  finalPin :any;
  fingerPin :any;
  storageValue: any;
  pointsNum: number;
  balanceNum: number;
  // userId: number;
  putData: any=[];

  constructor(public dataService: DataService, private activatedRoute: ActivatedRoute, private router: Router, private iab: InAppBrowser,public storage: Storage, private photoViewer: PhotoViewer,
    private file: File) 
    
    {
      this.passcode = '';
      this.finalPin = '';
      this.message = true;
      this.pageStatus = "Enter Pin"
      // this.int = 0;
      this.newPincount = 0;
      this.pointsNum = 0;
      this.balanceNum = 0;
      this.fingerPin = false;
      storage.get('SecurityPin').then((value) => {
        this.storageValue = value;
      })
      this.storage.get("userId").then((value)=>{
        if(value){
          this.dataService.getDataByUserId(value).subscribe(
            data =>{
              this.putData = [{
                Id: data["Id"],
                Forename: data["Forename"],
                Surname: data["Surname"],
                EmailAddress: data["EmailAddress"],
                Type: data["Type"],
                SignUpDate: data["SignUpDate"],
                DateOfBirth: data["DateOfBirth"]
              }]
          })
        }
      })
      // storage.get('loggedUser').then((value) => {
      //   console.log("LoggedUser", value)
      //   this.putData = [{
      //     Id: value.Id,
      //     Forename: value.Forename,
      //     Surname: value.Surname,
      //     EmailAddress: value.EmailAddress,
      //     Type: value.Type,
      //     SignUpDate: value.SignUpDate,
      //     DateOfBirth: value.DateOfBirth
      //   }]
      // })
      // storage.get('userId').then((value) => {
      //   this.userId = value;
      // })
      this.storage.get('currentPoints').then((value) => {
        this.pointsNum = value;
      })
      this.storage.get('currentBalance').then((value) => {
        this.balanceNum = value;
      })
      // this.num = Number(this.activatedRoute.snapshot.paramMap.get('id'));
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

  add(value: any) {

    if(this.storageValue){
      if(this.passcode.length < 4){
        this.message = true;
        this.passcode += value;
      } 
    }
  }
  delete() {
    if(this.passcode.length > 0) {
      this.message = true;
      this.passcode = this.passcode.substr(0, this.passcode.length - 1);
    }
  }
  confirm() {
    //if(this.passcode.length == 4){
      if(this.passcode == this.storageValue){
        this.pointsNum++;
        if((this.pointsNum) % 7 == 0){
          this.balanceNum++;
          this.pointsNum = 0;
        }
        this.storage.set('currentPoints', this.pointsNum);
        this.storage.set('currentBalance', this.balanceNum);
        (this.putData)[0]['CurrentPoints'] = this.pointsNum;
        (this.putData)[0]['CurrentBalance'] = this.balanceNum;
        console.log("1111111", this.putData)
        this.dataService.putDataToEpos(this.putData).subscribe(data => {
          console.log("UpdateEpos", data)
        })
        this.router.navigateByUrl(`/tabs/tabs/tab2`+'/'+this.pointsNum);
       // this.viewPhoto_1();
        this.passcode = '';
      } else {
        this.message = false;
        this.passcode = '';
      }
    //} 
  }  
}