import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ComponentShareService {
  // private countValue: Subject<any> = new Subject();
  private countValue: ReplaySubject<any> = new ReplaySubject();

  public get ValueFromChild() {
    console.log('gui data', this.countValue);
    this.countValue.next(JSON.parse(sessionStorage.getItem('data') || '{}'));
    return this.countValue;
  }
  public ValueFromChildWithKey(key: string) {
    this.countValue.next(JSON.parse(sessionStorage.getItem(key) || '{}'));
    return this.countValue;
  }

  public notifyCountValue(data: any) {
    sessionStorage.setItem('data',JSON.stringify(data));
    this.countValue.next(JSON.parse(sessionStorage.getItem('data') || '{}'));
  }

  public notifyCountValueWithKey(data: any, key: string) {
    sessionStorage.setItem(key,JSON.stringify(data));
    this.countValue.next(JSON.parse(sessionStorage.getItem(key) || '{}'));
  }
  constructor() {}
}
