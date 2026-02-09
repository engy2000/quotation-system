import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Device } from '../models/device.model';

@Injectable({
  providedIn: 'root'
})
export class QuotationService {

  constructor(private http: HttpClient) { }

  allDevices !: Device[];

  getDevices() {
    return this.http.get<Device[]>('../../assets/data/devices-data.json');
  }

  getDeviceByName(name: string) {
   return this.allDevices.find(device => device.name === name);
  }
}
