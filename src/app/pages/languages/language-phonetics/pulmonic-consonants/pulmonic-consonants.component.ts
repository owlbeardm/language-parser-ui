import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-pulmonic-consonants',
  templateUrl: './pulmonic-consonants.component.html',
  styleUrls: ['./pulmonic-consonants.component.css']
})
export class PulmonicConsonantsComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

  clicked(sound: string): void {
    alert(sound);
  }

  getClass(sound: string): string {
    // text-grey-dull
    // text-red-dull
    // text-yellow-dull
    // text-green-dull
    return 'text-red-dull';
  }
}
