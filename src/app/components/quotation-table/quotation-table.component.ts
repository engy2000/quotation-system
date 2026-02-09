import { Component, Input, SimpleChanges } from '@angular/core';
import { Device } from '../../models/device.model';
import { QuotationService } from '../../sevices/quotation.service';
import { Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoadingComponent } from "../loading/loading.component";

@Component({
  selector: 'app-quotation-table',
  imports: [CommonModule, FormsModule, LoadingComponent],
  templateUrl: './quotation-table.component.html',
  styleUrl: './quotation-table.component.css'
})
export class QuotationTableComponent {

  allDevices: Device[] = [];
  rows: Device[] = [];
  isLoaded: boolean = false;
  @Input() reset = false;
  @Output() totalsChange = new EventEmitter<any>();
  @Output() rowsChange = new EventEmitter<any[]>();

  constructor(private service: QuotationService) {}

  ngOnInit() {
    this.service.getDevices().subscribe(res => {
      this.allDevices = res;
      this.isLoaded = true;
    });

    this.addRow();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['reset'] && changes['reset'].currentValue == true) {
      this.rows = [];
      this.addRow();
    }
  }
  
  addRow() {
    this.rows.push({
      name: '',
      description: '',
      image: '',
      originalPrice: 0,
      discount: 0,
      price: 0,
      qty: 1,
      total: 0
    });
  }

  onSelect(row: any) {
    const device = this.getDeviceByName(row.name);
    if (!device) return;

    row.description = device.description;
    row.image = device.image;
    row.originalPrice = device.originalPrice;
    row.discount = 0;

    this.calculate(row);
  }

  calculate(row: any) {
    const discountValue =
      row.originalPrice * (row.discount / 100);

    row.price =
      row.originalPrice - discountValue;

    row.total =
      row.price * row.qty;
    
    this.emitTotals();
  }

  
  emitTotals() {
  const subTotal = this.rows.reduce(
    (sum, r) => sum + r.total, 0
  );

  this.totalsChange.emit({ subTotal });
  this.rowsChange.emit(this.rows);
  }


  getDeviceByName(name: string) {
   return this.allDevices.find(device => device.name === name);
  }
  
}
