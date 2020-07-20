import { Component, Input, OnInit } from '@angular/core';

const HIDE_DELAY = 2000; // milliseconds

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  @Input() type = 'info';
  @Input() closable = false;

  hidden = true;

  private timerId: number;

  constructor() { }

  ngOnInit(): void {
  }

  show() {
    clearTimeout(this.timerId);
    this.hidden = false;

    this.timerId = setTimeout(() => {
      this.hidden = true;
    }, HIDE_DELAY);
  }

  hide() {
    clearTimeout(this.timerId);
    this.hidden = true;
  }
}
