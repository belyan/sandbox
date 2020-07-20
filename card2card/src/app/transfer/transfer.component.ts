import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { StorageService } from '../storage.service';
import { MessageComponent } from '../message/message.component';

const AMOUNT_MIN = 50;
const AMOUNT_MAX = 100000;
const AMOUNT_STEP = 50;
const CARD_NUMBER_LENGTH = 16 + 3;

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss']
})
export class TransferComponent implements OnInit {
  amountMin = AMOUNT_MIN;
  amountMax = AMOUNT_MAX;
  amountStep = AMOUNT_STEP;
  cardNumberLength = CARD_NUMBER_LENGTH;

  months: number[];
  years: number[];

  form: FormGroup;

  @ViewChild('messageSuccess', { static: true }) messageSuccess: MessageComponent;

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private storageService: StorageService) { }

  ngOnInit() {
    this.initForm();
    this.updateForm();
  }

  initForm() {
    const currentYear = new Date().getFullYear();

    this.months = [...Array(12).keys()];
    this.years = [...Array(5).keys()].map(n => n + currentYear);

    this.form = this.fb.group({
      cardFrom: this.fb.group({
        number: ['', [Validators.required, Validators.minLength(CARD_NUMBER_LENGTH)]],
        holder: ['', Validators.required],
        expMonth: ['', Validators.required],
        expYear: ['', Validators.required]
      }),
      cardTo: this.fb.group({
        number: ['', [Validators.required, Validators.minLength(CARD_NUMBER_LENGTH), Validators.maxLength(CARD_NUMBER_LENGTH)]]
      }),
      amount: ['', [Validators.required, Validators.min(this.amountMin), Validators.max(this.amountMax)]]
    });
  }

  updateForm() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      const value = this.storageService.getTransfer(+id) as any;

      if (value) {
        this.form.patchValue(value);
        this.form.markAllAsTouched();
      }
    }
  }

  isInvalid(path: string): boolean {
    return this.form.get(path).invalid && this.form.get(path).touched;
  }

  isValid(path: string): boolean {
    return this.form.get(path).valid && this.form.get(path).touched;
  }

  hasError(path: string, errorCode: string): boolean {
    return this.form.get(path).hasError(errorCode);
  }

  onSubmit() {
    if (this.form.valid) {
      this.storageService.addTransfer(this.form.value);
      this.form.reset();
      this.showMessageSuccess();
    } else {
      this.form.markAllAsTouched();
    }
  }

  showMessageSuccess() {
    this.messageSuccess.show();
  }
}
