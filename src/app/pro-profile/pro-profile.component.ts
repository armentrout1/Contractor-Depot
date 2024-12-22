import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Define the structure for Documents
interface Documents {
  license: string;
  w9: string;
  insurance: string;
}

// Define the type for document keys
type DocumentType = keyof Documents;

@Component({
  selector: 'app-pro-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pro-profile.component.html',
  styleUrls: ['./pro-profile.component.scss'],
})
export class ProProfileComponent {
  contractor = {
    fullName: '',
    email: '',
    phone: '',
    businessName: '',
    logo: '',
    photos: [] as string[],
    documents: {
      license: '',
      w9: '',
      insurance: '',
    } as Documents,
  };

  /**
   * Handles the upload of the contractor's logo.
   * @param event The file input change event.
   */
  uploadLogo(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.convertToWebP(file)
        .then((webp) => {
          this.contractor.logo = webp;
          // Optionally, upload the WebP image to AWS S3 here
          // this.uploadToS3(webp, 'logo');
        })
        .catch((error) => {
          console.error('Error converting logo to WebP:', error);
        });
    }
  }

  /**
   * Handles the upload of multiple photos.
   * @param event The file input change event.
   */
  uploadPhotos(event: Event): void {
    const files = (event.target as HTMLInputElement).files;
    if (files) {
      Array.from(files).forEach((file) =>
        this.convertToWebP(file)
          .then((webp) => {
            this.contractor.photos.push(webp);
            // Optionally, upload each WebP image to AWS S3 here
            // this.uploadToS3(webp, 'photos');
          })
          .catch((error) => {
            console.error('Error converting photo to WebP:', error);
          })
      );
    }
  }

  /**
   * Deletes a photo from the contractor's photo array.
   * @param photo The photo URL to delete.
   */
  deletePhoto(photo: string): void {
    this.contractor.photos = this.contractor.photos.filter((p) => p !== photo);
    // Optionally, delete the photo from AWS S3 here
    // this.deleteFromS3(photo);
  }

  /**
   * Handles the upload of a document.
   * @param event The file input change event.
   * @param type The type of document ('license', 'w9', 'insurance').
   */
  uploadDocument(event: Event, type: DocumentType): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const objectURL = URL.createObjectURL(file);
      this.contractor.documents[type] = objectURL;

      // Optionally, upload the document to AWS S3 here
      // this.uploadToS3(objectURL, `documents/${type}`);

      // Revoke the object URL after usage to free memory
      // URL.revokeObjectURL(objectURL);
    }
  }

  /**
   * Converts an image file to WebP format using a canvas.
   * @param file The image file to convert.
   * @returns A promise that resolves with the WebP data URL.
   */
  convertToWebP(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>) => {
        const img = new Image();
        img.onload = () => {
          try {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            if (!ctx) {
              reject('Canvas context not available');
              return;
            }

            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0, img.width, img.height);

            // Convert the drawn image to WebP
            const webpDataURL = canvas.toDataURL('image/webp', 0.8);
            resolve(webpDataURL);
          } catch (error) {
            reject(`Error during WebP conversion: ${error}`);
          }
        };

        img.onerror = (error) => {
          reject(`Image failed to load: ${error}`);
        };

        if (e.target && e.target.result) {
          img.src = e.target.result as string;
        } else {
          reject('FileReader result is null');
        }
      };

      reader.onerror = (error) => {
        reject(`File could not be read: ${error}`);
      };

      reader.readAsDataURL(file);
    });
  }

  /**
   * Previews the contractor's public profile.
   */
  previewProfile(): void {
    console.log('Preview Public Profile', this.contractor);
    // Implement preview logic, such as navigating to a preview page or opening a modal
  }

  // Optional: AWS S3 Upload Methods
  /**
   * Uploads a file to AWS S3.
   * @param data The data URL or file to upload.
   * @param key The S3 object key.
   */
  // async uploadToS3(data: string, key: string): Promise<void> {
  //   // Implement AWS S3 upload logic here using AWS SDK
  // }

  /**
   * Deletes a file from AWS S3.
   * @param key The S3 object key.
   */
  // async deleteFromS3(key: string): Promise<void> {
  //   // Implement AWS S3 delete logic here using AWS SDK
  // }
}
