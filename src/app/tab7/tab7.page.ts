import { Component, OnInit } from '@angular/core';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer/ngx';

import { Platform } from '@ionic/angular'
import { PdfViewerModule } from 'ng2-pdf-viewer';

@Component({
  selector: 'app-tab7',
  templateUrl: './tab7.page.html',
  styleUrls: ['./tab7.page.scss'],
  
})
export class Tab7Page {
 
  constructor(private platform: Platform, private file: File,  
    private fileOpener: FileOpener, private document: DocumentViewer,) {
 
  }
 
  openLocalPdf() {
    let filePath = this.file.applicationDirectory + 'www/assets';
 
    if (this.platform.is('android')) {
      let fakeName = "Main_Menu.pdf";
      this.file.copyFile(filePath, 'Mary-Janes-Bristol_MENU.pdf', this.file.dataDirectory,'').then(result => {
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



