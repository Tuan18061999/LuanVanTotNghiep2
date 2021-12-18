import { OrderService } from './../../../services/order.service';
import { Component, OnInit } from '@angular/core';
import { Orders } from 'src/app/models/Orders';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  orders!: Orders[];

  constructor(public orderService: OrderService) { }

  ngOnInit(): void {
    this.orderService.get_AllOrder().subscribe(data =>{
      this.orders = data;
      console.log(this.orders);
    })
  }

}
