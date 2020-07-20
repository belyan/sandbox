import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appCardNumber]'
})
export class CardNumberDirective {
  constructor() { }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    const code = event.keyCode;

    if ([46, 8, 9, 27, 13, 110, 190].indexOf(code) !== -1 ||
      // Allow: Ctrl+A
      (code === 65 && (event.ctrlKey || event.metaKey)) ||
      // Allow: Ctrl+C
      (code === 67 && (event.ctrlKey || event.metaKey)) ||
      // Allow: Ctrl+V
      (code === 86 && (event.ctrlKey || event.metaKey)) ||
      // Allow: Ctrl+X
      (code === 88 && (event.ctrlKey || event.metaKey)) ||
      // Allow: home, end, left, right
      (code >= 35 && event.keyCode <= 39)) {
      return;
    }

    if ((event.shiftKey || (code < 48 || code > 57)) && (code < 96 || code > 105)) {
      event.preventDefault();
    }
  }

  @HostListener('input', ['$event'])
  onInput(event: Event) {
    const input = event.target as HTMLInputElement;

    if (!input.value) { return false; }

    const rawValue = input.value.replace(/\s/g, '');
    const groups = rawValue.match(/.{1,4}/g);

    if (groups?.length) {
      input.value = groups.join(' ');
    }
  }
}
