import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Language} from '../../../api/models/language';

@Component({
  selector: 'app-sound-changes-edit',
  standalone: true,
  templateUrl: './sound-changes-edit.component.html',
  styleUrls: ['./sound-changes-edit.component.css']
})
export class SoundChangesEditComponent implements OnInit {

  @Input() soundChangesRaw!: string;
  @Output() soundChangesRawChange: EventEmitter<string> = new EventEmitter<string>();

  math = Math;

  constructor() {
  }

  ngOnInit(): void {
  }

  print(): void {
    console.log(this.soundChangesRaw);
  }

  soundChangesRawChangeFn(): void {
    this.soundChangesRawChange.emit(this.soundChangesRaw);
  }
}
