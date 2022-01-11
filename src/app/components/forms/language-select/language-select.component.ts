import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
// import { LanguageName } from 'src/app/api/models';
// import { ApiService } from 'src/app/api/services';

@Component({
  selector: 'app-language-select',
  templateUrl: './language-select.component.html',
  styleUrls: ['./language-select.component.css']
})
export class LanguageSelectComponent implements OnInit {

  @Input() fieldName!: string;
  @Input() parentForm?: FormGroup;
  // @Input() selectedLanguage?: LanguageName;
  @Input() selectAll?: Boolean;
  // @Output() selectedLanguageChange = new EventEmitter<LanguageName>();
  // languagesSelect: LanguageName[] = [];

  constructor(/*private apiService: ApiService*/) {
  }

  ngOnInit(): void {
    // this.apiService.getApiLangs().subscribe((langs) => {
    // this.languagesSelect = langs;
  // });

  }

  changeLanguage() {
    // this.selectedLanguageChange.emit(this.selectedLanguage);
  }

}
