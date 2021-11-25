import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app'
import 'firebase/storage';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  constructor() { }


  urlFile?: any;
  getProfileImageUrl(duongDan: string): string {
    const userStorageRef = firebase.storage().ref().child(duongDan);
    userStorageRef.getDownloadURL().then(url => {
      this.urlFile = url;
    });
    return this.urlFile;
  }






}
