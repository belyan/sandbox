import { Injectable } from '@angular/core';

export interface Transfer {
  id: number;
  cardFrom: Card;
  cardTo: Card;
  amount: number;
  date: number;
}

export interface Card {
  number: string;
  expYear?: number;
  expMonth?: number;
  holder?: string;
}

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  private get transfers() {
    return JSON.parse(localStorage.getItem('transfers')) || [];
  }

  private set transfers(value) {
    localStorage.setItem('transfers', JSON.stringify(value));
  }

  getTransfers() {
    return this.transfers;
  }

  getTransfer(id: number) {
    const transfers = this.transfers;

    return transfers[id];
  }

  addTransfer(transfer: Transfer) {
    const transfers = this.transfers;

    transfer.date = Date.now();
    transfers.push(transfer);

    this.transfers = transfers;
  }

  removeTransfer(id: number) {
    const transfers = this.transfers;

    transfers.splice(id, 1);

    this.transfers = transfers;
  }
}
