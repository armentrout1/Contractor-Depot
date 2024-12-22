import { Component } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-estimate-footer',
  standalone: true,
  templateUrl: './estimate-footer.component.html',
  styleUrls: ['./estimate-footer.component.scss'],
})
export class EstimateFooterComponent {
  // Method to export the specific estimate container to PDF
  exportToPDF(): void {
    const estimateSection = document.querySelector('.estimate-container') as HTMLElement | null;

    if (estimateSection) {
      // Capture the section as a canvas with scaling for higher resolution
      html2canvas(estimateSection, { scale: 2 }).then((canvas) => {
        const imgData = canvas.toDataURL('image/jpeg', 0.8); // Use JPEG format with 80% quality
        const pdf = new jsPDF('p', 'mm', 'a4'); // Portrait mode, A4 size
        const imgWidth = 210; // A4 width in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        // Add the image to the PDF and save
        pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight);
        pdf.save('estimate.pdf'); // File name for the exported PDF
      });
    } else {
      console.error('Estimate container not found!'); // Log error if section is not found
    }
  }
}
