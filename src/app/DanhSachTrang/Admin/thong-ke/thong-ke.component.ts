import { DichVuService } from './../../../services/dich-vu.service';
import { DichVu } from './../../../models/DichVu';
import { NhomDichVuService } from './../../../services/nhom-dich-vu.service';
import { PartnerService } from './../../../services/partner.service';
import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import { DatePipe } from '@angular/common';
import { Partner } from 'src/app/models/Partner';
import { NhomDichVu } from 'src/app/models/NhomDichVu';

@Component({
  selector: 'app-thong-ke',
  templateUrl: './thong-ke.component.html',
  styleUrls: ['./thong-ke.component.css'],
})
export class ThongKeComponent implements OnInit {
  listNameSevenDay: string[] = [];

  listPartner: Partner[] = [];
  listCountPartnerJoinByDay: number[] = [];
  listCountPartnerAtTime: number[] = [];

  listNhomDichVu: NhomDichVu[] = [];
  listNameNhomDichVu: string[] = [];
  listMaNhomDangKyDichVu: string[] = [];
  listSoLuongDangKyNhomDichvu: number[] = [];

  listDichVu: DichVu[] = [];
  constructor(
    public datepipe: DatePipe,
    public partnerService: PartnerService,
    public nhomDichVuService: NhomDichVuService,
    public dichVuService: DichVuService
  ) {
    for (let i = 7; i >= 0; i--) {
      let new_date = new Date(new Date().getTime() - i * 24 * 60 * 60 * 1000);
      let item_date = this.datepipe.transform(new_date, 'dd-MM-yyyy');
      this.listNameSevenDay.push(item_date!);
    }

    this.partnerService.get_AllConfirmPartner().subscribe((data) => {
      let listPartnerFromServer: Partner[] = data;
      for (let partner of listPartnerFromServer) {
        this.listPartner.push(partner);
      }
      //Them du lieu vao listCountPartnerJoinByDay
      for (let date of this.listNameSevenDay) {
        let count = 0;
        for (let partner of this.listPartner) {
          if (partner.dmyOrder!.replace(/\s/g, '') == date) {
            count++;
          }
        }
        this.listCountPartnerJoinByDay.push(count);
      }

      //Them du lieu vao listCountPartnerAtTime
      for (let date of this.listNameSevenDay) {
        let count = 0;
        for (let partner of this.listPartner) {
          let dateOne = new Date(
            partner.dmyOrder!.replace(/\s/g, '').split('-').reverse().join('-')
          );
          let dateTwo = new Date(date.split('-').reverse().join('-'));
          if (dateOne <= dateTwo) {
            count++;
          }
        }
        this.listCountPartnerAtTime.push(count);
      }
    });

    this.nhomDichVuService.get_AllNhomDichVu().subscribe((data) => {
      let listNhomDichVuFromServer: NhomDichVu[] = data;
      for (let nhomDV of listNhomDichVuFromServer) {
        this.listNhomDichVu.push(nhomDV);
        this.listNameNhomDichVu.push(nhomDV.name!);
      }
    });

    this.dichVuService.get_AllDichVu().subscribe((data) => {
      let listDichVuFromServer: DichVu[] = data;
      for (let dichVu of listDichVuFromServer) {
        this.listDichVu.push(dichVu);
      }
      let listTamThoi: any[] = [];
      for (let partner of this.listPartner) {
        for (let choice of partner.choicesServiceList!) {
          for (let dichVu of this.listDichVu) {
            if (choice == dichVu.tenDV) {
              choice = dichVu.maNhomDV || '';
              // this.listMaNhomDangKyDichVu.push(choice);
            }
          }
          listTamThoi.push(choice);
        }

        listTamThoi = [...new Set(listTamThoi)];

        for (let num of listTamThoi) {
          this.listMaNhomDangKyDichVu.push(num);
        }
      }


      for (let nhomDV of this.listNhomDichVu) {
        let count = 0;
        for (let ma of this.listMaNhomDangKyDichVu) {
          if(ma == nhomDV.maNhomDV?.toString()){
            count++;
          }
        }
        this.listSoLuongDangKyNhomDichvu.push(count);
      }
      console.log(this.listNameNhomDichVu);
      console.log(this.listMaNhomDangKyDichVu);
      console.log(this.listSoLuongDangKyNhomDichvu);
    });
  }

  ngOnInit(): void {}

  // Cac du lieu thong ke cua khach hang
  chartData = [
    {
      data: this.listCountPartnerJoinByDay,
      label: 'Đối tác',
    },
  ];
  chartLabels = this.listNameSevenDay;
  chartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
  };

  chartDataPartnerAtTime = [
    {
      data: this.listCountPartnerAtTime,
      label: 'Đối tác',
    },
  ];

  chartDataDichVu = [
    {
      data: this.listCountPartnerJoinByDay,
      label: 'Đối tác',
    },
  ];

  // Du lieu thong ke cua Piechart doi tac
  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value: any, ctx: any) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    },
  };

  public pieChartLabels: Label[] = this.listNameNhomDichVu;
  // public pieChartData: number[] = [300, 500, 100,100,100,100];
  public pieChartData: number[] = this.listSoLuongDangKyNhomDichvu;
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;

  public pieChartColors = [
    {
      backgroundColor: [
        'rgba(255,0,0,0.3)',
        'rgba(0,255,0,0.3)',
        'rgba(0,0,255,0.3)',
        'rgba(46, 138, 138, 1)',
        'rgba(255, 255, 138, 1)',
        'rgba(110, 255, 249, 1)',
      ],
    },
  ];
}
