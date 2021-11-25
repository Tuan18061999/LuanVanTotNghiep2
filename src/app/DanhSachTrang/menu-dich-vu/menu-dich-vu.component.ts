import { ComponentShareService } from './../../services/component-share.service';
import { NhomDichVu } from './../../models/NhomDichVu';
import { NhomDichVuService } from './../../services/nhom-dich-vu.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-dich-vu',
  templateUrl: './menu-dich-vu.component.html',
  styleUrls: ['./menu-dich-vu.component.css'],
})
export class MenuDichVuComponent implements OnInit {
  listNhomDichVu!: NhomDichVu[];
  constructor(
    public nhomDichVuService: NhomDichVuService,
    public componentShareService: ComponentShareService
  ) {}

  ngOnInit(): void {
    this.nhomDichVuService.get_AllNhomDichVu().subscribe((data: any) => {
      this.listNhomDichVu = data;
    });
  }

  truyenNhomDichVu(nhomDichVu: NhomDichVu) {
    this.componentShareService.notifyCountValue(nhomDichVu);
  }
}
