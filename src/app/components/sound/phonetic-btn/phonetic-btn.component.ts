import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-phonetic-btn',
  templateUrl: './phonetic-btn.component.html',
  styleUrls: ['./phonetic-btn.component.css']
})
export class PhoneticBtnComponent implements OnInit {

  @Input() phonetic!: string;
  @Input() getSoundClass!: (a: string) => string;
  @Output() onClick = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit(): void {
  }

  getClass(): string {
    return this.getSoundClass(this.phonetic);
  }
}
