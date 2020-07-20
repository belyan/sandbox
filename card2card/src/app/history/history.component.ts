import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { Transfer, StorageService } from '../storage.service';
import { MessageComponent } from '../message/message.component';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  transfers: Transfer[];

  @ViewChild('messageSuccess', { static: true }) messageSuccess: MessageComponent;

  constructor(private router: Router,
              private storageService: StorageService) { }

  ngOnInit() {
    this.getTransfers();
  }

  getTransfers() {
    this.transfers = this.storageService.getTransfers();
  }

  repeatTransfer(id: number) {
    this.router.navigate(['/transfer', id]);
  }

  removeTransfer(id: number) {
    this.transfers.splice(id, 1);
    this.storageService.removeTransfer(id);
    this.showMessageSuccess();
  }

  showMessageSuccess() {
    this.messageSuccess.show();
  }
}
