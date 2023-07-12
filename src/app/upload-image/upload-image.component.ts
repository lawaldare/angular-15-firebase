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
  imageUrl: string =
    'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png';

  constructor(private uploadService: UploadService) {}

  ngOnInit(): void {}

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  upload(): void {
    if (this.selectedFiles?.length) {
      Array.from(this.selectedFiles).forEach((file) => {
        if (file) {
          const currentFileUpload = {
            file,
            name: file.name,
          };
          this.uploadService
            .pushFileToStorage(currentFileUpload)
            .subscribe((data) => {});
        }
      });
      this.selectedFiles = undefined;
    }
  }

  deletedImage(image: any): void {
    this.uploadService.deleteFile(image);
  }

  selectRow(image: any) {
    this.imageUrl = image.url;
  }
}
