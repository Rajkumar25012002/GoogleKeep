import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
@Component({
  selector: 'app-remainder-setter',
  templateUrl: './remainder-setter.component.html',
  styleUrls: ['./remainder-setter.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
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
  selectDatetime: boolean = false;
  selectedDate: Date = new Date();
  selectedTime: Date = new Date();
  toggleSelectDatetime(): void {
    this.selectDatetime = !this.selectDatetime;
  }
  save(): void {
    this.toggleSelectDatetime();
    this.showRemainderChange.emit(!this.showRemainder);
  }
}
