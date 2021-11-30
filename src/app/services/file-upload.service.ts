import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  title = 'cloudsSorage';
  selectedFile!: File;
  fb: any;
  downloadURL!: Observable<string>;
  constructor(private storage: AngularFireStorage) {}
  ngOnInit() {}
  upLoadImage(event: any) {
    //n la ten cua anh se duoc luu tren storage
    var currentTime = Date.now();
    var fileName = event.target.files[0].name;
    var n = fileName + currentTime;
    const file = event.target.files[0];
    console.log('loai file', file);
    const filePath = `img-test/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`img-test/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe((url) => {
            if (url) {
              this.fb = url;
            }
            console.log('fb', this.fb);
          });
        })
      )
      .subscribe((url) => {
        if (url) {
          console.log('url', url);
        }
      });
  }

  // urlFile?: any;
  // getProfileImageUrl(duongDan: string): string {
  //   const userStorageRef = firebase.storage().ref().child(duongDan);
  //   userStorageRef.getDownloadURL().then(url => {
  //     this.urlFile = url;
  //   });
  //   return this.urlFile;
  // }
}
