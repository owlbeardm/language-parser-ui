import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-vowels',
  templateUrl: './vowels.component.html',
  styleUrls: ['./vowels.component.css']
})
export class VowelsComponent implements OnInit {

  @Input() languageSounds!: string[];

  constructor() { }

  ngOnInit(): void {
  }

  clicked(sound: string): void {
    alert(sound);
  }

}
