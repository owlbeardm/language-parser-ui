import {ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {timer} from 'rxjs';

@Component({
  selector: 'app-pulmonic-consonants',
  templateUrl: './pulmonic-consonants.component.html',
  styleUrls: ['./pulmonic-consonants.component.css']
})
export class PulmonicConsonantsComponent implements OnInit, OnChanges {

  @Input() languageSounds!: string[];

  constructor(private cdRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('pulmonic consonants changes', changes);
  }

  clicked(sound: string): void {
    alert(sound);
  }

}
