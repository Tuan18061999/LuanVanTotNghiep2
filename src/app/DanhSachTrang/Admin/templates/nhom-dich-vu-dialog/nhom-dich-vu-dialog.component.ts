import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-nhom-dich-vu-dialog',
  templateUrl: './nhom-dich-vu-dialog.component.html',
  styleUrls: ['./nhom-dich-vu-dialog.component.css']
})
export class NhomDichVuDialogComponent implements OnInit {
  DialogRef: any;
  constructor(
    dialogRef: MatDialogRef<NhomDichVuDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data:{
      id: string;
      //maNhomDV: string;
      name: string;
      iconNameAngular: string;
      iconNameReact: string;
    }
  ) {
    this.DialogRef = dialogRef;
  }

  ngOnInit(): void {
  }

  onNoClick() {
    this.DialogRef.close();
  }
  GoToIconAngular(){
    window.open("https://fonts.google.com/icons");
  }
  GoToIconReact(){
    window.open("https://oblador.github.io/react-native-vector-icons/");
  }

}
