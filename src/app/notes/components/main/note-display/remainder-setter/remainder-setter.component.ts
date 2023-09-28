import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { Remainder } from 'src/app/notes/types/note';
@Component({
  selector: 'app-remainder-setter',
  templateUrl: './remainder-setter.component.html',
  styleUrls: ['./remainder-setter.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatSelectModule,
  ],
})
export class RemainderSetterComponent {
  @Input('showRemainder') showRemainder!: boolean;
  @Output('showRemainderChange') showRemainderChange =
    new EventEmitter<boolean>();
  @Output('remainderChange') remainderChange = new EventEmitter<Remainder>();
  selectDatetime: boolean = false;
  remainder: Remainder;
  constructor() {
    this.remainder = {
      date: new Date(),
      time: '08:00',
      repeat: '',
    };
  }
  toggleSelectDatetime(): void {
    this.selectDatetime = !this.selectDatetime;
  }
  save(): void {
    this.toggleSelectDatetime();
    this.remainderChange.emit(this.remainder);
    this.showRemainderChange.emit(!this.showRemainder);
  }

  setRemainderTomorrow(): void {
    this.remainder.date = new Date(
      new Date().setDate(new Date().getDate() + 1)
    );
    this.remainder.time = '08:00';
    this.remainder.repeat = 'No';
    this.remainderChange.emit(this.remainder);
    this.showRemainderChange.emit(!this.showRemainder);
  }
  setRemainderNextWeek(): void {
    this.remainder.date = new Date(
      new Date().setDate(new Date().getDate() + 7)
    );
    this.remainder.time = '08:00';
    this.remainder.repeat = 'No';
    this.remainderChange.emit(this.remainder);
    this.showRemainderChange.emit(!this.showRemainder);
  }
}
