import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vowels',
  templateUrl: './vowels.component.html',
  styleUrls: ['./vowels.component.css']
})
export class VowelsComponent implements OnInit {

  constructor() { }

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
