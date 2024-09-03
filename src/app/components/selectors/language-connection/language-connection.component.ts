import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {LanguageConnectionType} from '../../../api/models/language-connection-type';
import {Language} from '../../../api/models/language';

@Component({
  selector: 'app-language-connection',
  standalone: true,
  templateUrl: './language-connection.component.html',
  styleUrls: ['./language-connection.component.css']
})
export class LanguageConnectionComponent implements OnInit {

  @Input() label: string | undefined;
  @Input() selectedLanguageConnection?: LanguageConnectionType;
  @Output() selectedLanguageConnectionChange: EventEmitter<LanguageConnectionType> = new EventEmitter<LanguageConnectionType>();
  allConnectionTypes: LanguageConnectionType[] = [LanguageConnectionType.Evolving, LanguageConnectionType.Borrowing];

  constructor() {
  }

  ngOnInit(): void {
  }

  changeConnection(): void {
    console.log('changeLanguage', this.selectedLanguageConnection);
    this.selectedLanguageConnectionChange.emit(this.selectedLanguageConnection);
  }

}
