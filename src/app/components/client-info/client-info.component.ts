import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-client-info',
  imports: [CommonModule, FormsModule],
  templateUrl: './client-info.component.html',
  styleUrl: './client-info.component.css'
})
export class ClientInfoComponent implements OnChanges{

  @Input() reset = false;
  @Output() clientName = new EventEmitter<any>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['reset'] && changes['reset'].currentValue == true) {
        
    this.contact = {
    customer: '',
    phone: '',
    address: '',
    date: new Date().toISOString().substring(0, 10)
  };
      }
  }
  contact = {
    customer: '',
    phone: '',
    address: '',
    date: new Date().toISOString().substring(0, 10)
  };

  changeClientName(clientName: string) {
    this.clientName.emit(clientName);
  }
}
