import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';



@Component({
  selector: 'app-thong-ke',
  templateUrl: './thong-ke.component.html',
  styleUrls: ['./thong-ke.component.css'],
})
export class ThongKeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}


  chartData = [
    {
      data: [10, 20, 15, 18],
      label: 'Đối tác'
    },
    // {
    //   data: [120, 455, 100, 340],
    //   label: 'Account B'
    // },
    // {
    //   data: [45, 67, 800, 500],
    //   label: 'Account C'
    // }
  ];
  chartLabels = [
    '22/1',
    '23/1',
    '24/1',
    '25/1'
  ];
  chartOptions : ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
  };
  onChartHover = ($event: any) => {
    window.console.log('onChartHover', $event);
  };

  onChartClick = ($event: any) => {
    window.console.log('onChartClick', $event);
  };

  newDataPoint(dataArr = [100, 100, 100], label: any) {
    this.chartData.forEach((dataset, index) => {
      this.chartData[index] = Object.assign({}, this.chartData[index], {
        data: [...this.chartData[index].data, dataArr[index]]
      });
    });

    this.chartLabels = [...this.chartLabels, label];
  }

  chartDataDichVu = [
    {
      data: [0, 12, 20, 15, 18],
      label: 'Đối tác'
    },

    // {
    //   data: [45, 67, 800, 500],
    //   label: 'Account C'
    // }
  ];
  chartLabelsDichVu = [
    'Tên dịnh vụ',
    'Sửa Tivi',
    'Sửa tủ lạnh',
    'Sửa ống nước',
    'Sửa máy giặt'
  ];


  //Pie
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
    }
  };
  public pieChartLabels: Label[] = [['Đồ gỗ, điện nước', 'Máy tính, camera'], ['Giúp việc theo giờ', 'Xây dựng'], 'Sửa máy giặt'];
  public pieChartData: number[] = [300, 500, 100];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;

  public pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)'],
    },
  ];


}
