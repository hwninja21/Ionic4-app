import { Component, OnInit } from '@angular/core';
import {ToastController,
  AlertController,
  Platform
} from '@ionic/angular';
import {
  GoogleMaps,
  
  GoogleMap,
  GoogleMapsEvent,
  Marker,
  GoogleMapsAnimation,
  MyLocation
} from '@ionic-native/google-maps/';
import { Network } from '@ionic-native/network/ngx';
 
@Component({
  selector: 'app-tab6',
  templateUrl: 'tab6.page.html',
  styleUrls: ['tab6.page.scss'],
})
// export class Tab6Page implements OnInit {
 
  
  
  
  
  
  
  
  
//    map: GoogleMap;
//   address:string;
 
//   constructor(
//     public toastCtrl: ToastController,
//     private platform: Platform
//     ) { }
 
//   async ngOnInit() {
//     // Since ngOnInit() is executed before `deviceready` event,
//     // you have to wait the event.
//     await this.platform.ready();
//     await this.loadMap();
//   }
 
//   loadMap() {
//     this.map = GoogleMaps.create('map_canvas', {
//        camera: {
//          target: {
//            lat: 51.463917,
//            lng: -2.609423
//          },
//         zoom: 18,
//          tilt: 30
//        }
//     });
//     let marker: Marker = this.map.addMarkerSync({
//       title: 'MJ',
//       snippet: 'Mary-Janes Coffee',
//       position: {lat: 51.463324, lng: -2.609416},
//       animation: GoogleMapsAnimation.BOUNCE,
//       icon:{
//         url: 'assets/mjlogo.png',
//         size: {
//           width: 24,
//           height: 24
//         }



//  },






//     });

   
//   }
 

//   goToMyLocation(){
//     this.map.clear();
 
//     // Get the location of you
//     this.map.getMyLocation().then((location: MyLocation) => {
//       console.log(JSON.stringify(location, null ,2));
 
//       // Move the map camera to the location with animation
//       this.map.animateCamera({
//         target: location.latLng,
//         zoom: 17,
//         duration: 5000
//       });
 
//       //add a marker
//       let marker: Marker = this.map.addMarkerSync({
//         title: '@ionic-native/google-maps plugin!',
//         snippet: 'This plugin is awesome!',
//         position: location.latLng,
//         animation: GoogleMapsAnimation.BOUNCE
//       });
 
//       //show the infoWindow
//       marker.showInfoWindow();
 
//       //If clicked it, display the alert
//       marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
//         this.showToast('clicked!');
//       });
 
//       this.map.on(GoogleMapsEvent.MAP_READY).subscribe(
//         (data) => {
//             console.log("Click MAP",data);
//         }
//       );
//     })
//     .catch(err => {
//       //this.loading.dismiss();
//       this.showToast(err.error_message);
//     });
//   }
 
//   async showToast(message: string) {
//     let toast = await this.toastCtrl.create({
//       message: message,
//       duration: 2000,
//       position: 'middle'
//     });
//     toast.present();
//   }


export class Tab6Page {
  title: string = 'Mary-Janes Coffee';
  lat: number = 51.463324;
  lng: number = -2.609416;
  zoom = 8;
  height = 0;
  icon: {
    url: './assets/mjlogo.png',
    scaledSize: {
        width: 40,
        height: 60
    }
}
//  iconUrl:{
 //           url: './assets/mjlogo.png',
             
 //           }
 disconnectSubscription: any;

  constructor(public alertController: AlertController, public platform: Platform, private network: Network ) {
    console.log(platform.height());
    this.height = platform.height() - 56;
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
    connectSubscription.unsubscribe();
  }
}



















 
