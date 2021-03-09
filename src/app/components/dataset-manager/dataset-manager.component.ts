import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
@Component({
  selector: 'app-dataset-manager',
  templateUrl: './dataset-manager.component.html',
  styleUrls: ['./dataset-manager.component.css']
})
export class DatasetManagerComponent implements OnInit {

  currentUser: any;

  constructor(private tokenStorage:TokenStorageService) { }

  ngOnInit(): void {
    this.currentUser = this.tokenStorage.getUser();
  }

  logout(): void {
    this.tokenStorage.signOut();
    window.location.reload();
  }
}
