import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Report {
  name: string;
  generatedDate: Date;
  type: string;
  size: string;
}

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent {
  reports: Report[] = [
    { name: 'Q2 Sales Summary', generatedDate: new Date('2023-06-30'), type: 'PDF', size: '4.2 MB' },
    { name: 'Monthly Financial Report', generatedDate: new Date('2023-05-31'), type: 'Excel', size: '2.8 MB' },
    { name: 'Customer Segmentation Analysis', generatedDate: new Date('2023-05-15'), type: 'PDF', size: '6.1 MB' }
  ];

  sortColumn: keyof Report = 'name';
  sortDirection: 'asc' | 'desc' = 'asc';

  showToast = false;
  toastMessage = '';

  sortReports(column: keyof Report): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    this.reports.sort((a, b) => {
      let aValue = a[column];
      let bValue = b[column];

      if (aValue instanceof Date && bValue instanceof Date) {
        return this.sortDirection === 'asc' ? aValue.getTime() - bValue.getTime() : bValue.getTime() - aValue.getTime();
      }

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return this.sortDirection === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      }

      return 0;
    });
  }

  generateReport(reportName: string): void {
    this.toastMessage = `Please wait, the report "${reportName}" will generate shortly and be sent to your mail.`;
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
      this.toastMessage = '';
    }, 3000);
  }

  downloadReport(reportName: string): void {
    const pdfText = `Dummy PDF content for report: ${reportName}`;
    const pdfContent = `%PDF-1.3
    1 0 obj
    << /Type /Catalog /Pages 2 0 R >>
    endobj
    2 0 obj
    << /Type /Pages /Kids [3 0 R] /Count 1 >>
    endobj
    3 0 obj
    << /Type /Page /Parent 2 0 R /MediaBox [0 0 200 200] /Contents 4 0 R >>
    endobj
    4 0 obj
    << /Length ${pdfText.length} >>
    stream
    BT /F1 24 Tf 50 150 Td (${pdfText}) Tj ET
    endstream
    endobj
    xref
    0 5
    0000000000 65535 f 
    0000000010 00000 n 
    0000000060 00000 n 
    0000000111 00000 n 
    0000000211 00000 n 
    trailer
    << /Size 5 /Root 1 0 R >>
    startxref
    311
    %%EOF`;

    const blob = new Blob([pdfContent], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = reportName + '.pdf';
    a.click();
    window.URL.revokeObjectURL(url);
  }
}
