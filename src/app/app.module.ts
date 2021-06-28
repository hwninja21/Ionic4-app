import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import { GoogleMaps } from '@ionic-native/google-maps'
import { Network } from '@ionic-native/network/ngx';
import { AppComponent } from './app.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { AppRoutingModule } from './app-routing.module';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { FormsModule }   from '@angular/forms';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { DocumentViewer } from '@ionic-native/document-viewer/ngx';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';



import {HttpClientModule} from '@angular/common/http';
import { ToastController  } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage'
import {AuthService} from './auth.service';
import {AuthGuard} from './auth.guard';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,PdfViewerModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, FormsModule, IonicStorageModule.forRoot(),
     ],
  providers: [
    AuthService,
    AuthGuard,
    StatusBar,
    SplashScreen, 
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    BarcodeScanner,
    File,
    PhotoViewer,
    FileOpener,
    FileTransfer,
    DocumentViewer,
    Network,
    ToastController ,
    Geolocation , InAppBrowser, CallNumber, GoogleMaps,
    //{provide: IonicErrorHandler, useClass: IonicErrorHandler}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
