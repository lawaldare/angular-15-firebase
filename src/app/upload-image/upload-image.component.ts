import { Component, OnInit } from '@angular/core';
import { FileUpload, UploadService } from '../upload.service';
import { map, tap } from 'rxjs';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss'],
})
export class UploadImageComponent implements OnInit {
  selectedFiles?: FileList;
  currentFileUpload?: FileUpload;
  images$ = this.uploadService
    .getFiles()
    .snapshotChanges()
    .pipe(
      map((changes) => {
        return changes.map((image) => ({
          key: image.payload.key,
          ...image.payload.val(),
        }));
      })
    );

  constructor(private uploadService: UploadService) {}

  ngOnInit(): void {}

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  upload(): void {
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      this.selectedFiles = undefined;

      if (file) {
        const currentFileUpload = {
          file,
          name: file.name,
        };
        this.uploadService.pushFileToStorage(currentFileUpload).subscribe();
      }
    }
  }

  deletedImage(image: any): void {
    this.uploadService.deleteFile(image);
  }
}
