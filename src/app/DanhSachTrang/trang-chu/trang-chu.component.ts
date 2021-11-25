import { TinTuc } from './../../models/TinTuc';
import { TinTucService } from './../../services/tin-tuc.service';
import { Component, OnInit } from '@angular/core';
import { ComponentShareService } from 'src/app/services/component-share.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trang-chu',
  templateUrl: './trang-chu.component.html',
  styleUrls: ['./trang-chu.component.css'],
})
export class TrangChuComponent implements OnInit {
  listTinTuc!: TinTuc[];
  listTinTucGioiHan!: TinTuc[];
  constructor(
    public tinTucService: TinTucService,
    public componentShareService: ComponentShareService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.tinTucService.get_AllTinTuc().subscribe((data: any) => {
      this.listTinTuc = data;
      console.log('list truoc khi chia',this.listTinTuc);
      this.PhanTrang(1);
    });

  }
  ChuyenToiChiTietTin(tinTuc: TinTuc) {
    console.log('hello');
    this.componentShareService.notifyCountValue(tinTuc);
    this.router.navigate(['/chi-tiet-tin-tuc']);
  }
  PhanTrang(page: number) {
    var pageNum = page;
    var perPage = 6;
    var start = (pageNum - 1) * perPage;
    var end = pageNum * perPage;
    this.listTinTucGioiHan = this.listTinTuc.slice(start,end);

  }
}
