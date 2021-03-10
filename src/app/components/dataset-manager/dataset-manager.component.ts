import { Component, OnInit } from '@angular/core';
import { FilesService } from 'src/app/_services/files.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-dataset-manager',
  templateUrl: './dataset-manager.component.html',
  styleUrls: ['./dataset-manager.component.css']
})
export class DatasetManagerComponent implements OnInit {

  currentUser: any;
  selectedFile?: File;
  currentFile?: File;
  progress = 0;
  message = '';
  fileInfos?: Observable<any>;

  constructor(private tokenStorage:TokenStorageService, private filesService: FilesService) { }

  ngOnInit(): void {
    this.currentUser = this.tokenStorage.getUser();
    this.fileInfos = this.filesService.getFiles();
  }

  selectFile(event: any): void {
    this.selectedFile = event.target.file;
  }
  
  upload(): void {
    this.progress = 0;
  
    if (this.selectedFile) {
      const file: File | null = this.selectedFile;
  
      if (file) {
        this.currentFile = file;
  
        this.filesService.upload(this.currentFile).subscribe(
          (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
              this.fileInfos = this.filesService.getFiles();
            }
          },
          (err: any) => {
            console.log(err);
            this.progress = 0;
  
            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.message = 'Could not upload the file!';
            }
  
            this.currentFile = undefined;
          });
      }
  
      this.selectedFile = undefined;
    }
  }
  

  logout(): void {
    this.tokenStorage.signOut();
    window.location.reload();
  }
}
