import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-summary-box',
  imports: [CommonModule, FormsModule],
  templateUrl: './summary-box.component.html',
  styleUrl: './summary-box.component.css'
})
export class SummaryBoxComponent implements OnChanges{

  @Input() subTotal = 0;
  @Input() reset = false;
  @Output() finalTotalsChange = new EventEmitter<any>();
  
  finalTotal = 0;
  installation = 0;

  ngOnChanges(changes: SimpleChanges): void {
    this.calculateFinalTotal();
    console.log(this.reset);
    
    if (changes['reset'] && changes['reset'].currentValue == true) {
      this.subTotal = 0;
      this.finalTotal = 0;
      this.installation = 0;
    }
  
  }
  
  calculateFinalTotal()
  {
    this.finalTotal = this.subTotal + this.installation;
    this.finalTotalsChange.emit(this.finalTotal);
  }
}
