import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IpaService} from '../../../services/ipa.service';

@Component({
  selector: 'app-phonetic-btn',
  templateUrl: './phonetic-btn.component.html',
  styleUrls: ['./phonetic-btn.component.css']
})
export class PhoneticBtnComponent implements OnInit {

  @Input() phonetic!: string;
  @Input() languageSounds!: string[];
  @Output() onClick = new EventEmitter<string>();

  constructor(private ipaService: IpaService) {
  }

  ngOnInit(): void {
  }

  getClass(): string {
    return this.languageSounds?.includes(this.phonetic) ? 'text-green-dull' : 'text-grey-dull';
  }
}
