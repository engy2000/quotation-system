import { Component } from '@angular/core';
import { QuotationTableComponent } from '../../components/quotation-table/quotation-table.component';
import { HeaderComponent } from '../../components/header/header.component';
import { SummaryBoxComponent } from '../../components/summary-box/summary-box.component';
import { ClientInfoComponent } from '../../components/client-info/client-info.component';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-quotation',
  imports: [QuotationTableComponent, HeaderComponent, SummaryBoxComponent, ClientInfoComponent],
  templateUrl: './quotation.component.html',
  styleUrl: './quotation.component.css'
})
export class QuotationComponent {
  subTotal = 0;
  rows: any[] = [];
  finalTotal = 0;
  clientName !: string;
  resetClicked = false;

  calculateFinalTotal(data: any) {
    this.finalTotal = data.finalTotal;
  }

  onTotalsChange(data: any) {
    this.subTotal = data.subTotal;
  }
  onClientNameChange(data: string) {
    this.clientName = data;
  }

  onRowsChange(rows: any[]) {
    this.rows = rows;
  }

  // ---------- PDF ----------
  exportPDF() {

    const element = document.getElementById('export-area');
    // Select the elements you want to hide
    const elementsToHide = element!.querySelectorAll('.hide-in-pdf');

    // Hide them
    elementsToHide.forEach(el => (el as HTMLElement).style.display = 'none');
    
    html2canvas(element!, { scale: 2 }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const imgWidth = 210;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(this.clientName+'-quotation.pdf');
    }).finally(() => {
      // Restore the elements after PDF generation
      elementsToHide.forEach(el => (el as HTMLElement).style.display = '');
      });
    
  }

  reset() {
   setTimeout(() => {
    this.resetClicked = true;
    this.rows = [];
    this.clientName = '';
    this.subTotal = 0;
    this.finalTotal = 0;
  });
    
  }

    // ---------- EXCEL ----------
  // exportExcel() {

  //   const excelData = [];

  //   // Header
  //   excelData.push(['SMART HOME SYSTEM QUOTATION']);
  //   excelData.push([]);

  //   // Contact Info (مثال)
  //   excelData.push(['Customer', 'Phone', 'Address', 'Date']);
  //   excelData.push([
  //     'Customer Name',
  //     'Phone',
  //     'Address',
  //     new Date().toLocaleDateString()
  //   ]);
  //   excelData.push([]);

  //   // Table Header
  //   excelData.push([
  //     'Device',
  //     'Description',
  //     'Original Price',
  //     'Discount %',
  //     'Price',
  //     'Qty',
  //     'Total'
  //   ]);

  //   // Rows
  //   this.rows.forEach(r => {
  //     excelData.push([
  //       r.selectedName,
  //       r.description,
  //       r.originalPrice,
  //       r.discount,
  //       r.price,
  //       r.qty,
  //       r.total
  //     ]);
  //   });

  //   excelData.push([]);

  //   // Summary
  //   excelData.push(['Sub Total', this.subTotal]);
  //   excelData.push(['Installation', this.finalTotal - this.subTotal]);
  //   excelData.push(['Final Total', this.finalTotal]);

  //   const worksheet = XLSX.utils.aoa_to_sheet(excelData);
  //   const workbook = XLSX.utils.book_new();

  //   XLSX.utils.book_append_sheet(workbook, worksheet, 'Quotation');

  //   const excelBuffer = XLSX.write(workbook, {
  //     bookType: 'xlsx',
  //     type: 'array'
  //   });

  //   const blob = new Blob(
  //     [excelBuffer],
  //     { type: 'application/octet-stream' }
  //   );

  //   saveAs(blob, 'quotation.xlsx');
  // }

}
