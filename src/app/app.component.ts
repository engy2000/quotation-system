import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { QuotationComponent } from './pages/quotation/quotation.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,QuotationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'kpek-quotation-app';
}
