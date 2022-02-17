import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {LanguagesService} from '../../../api/services/languages.service';
import {Language} from '../../../api/models/language';

@Component({
  selector: 'app-all-languages',
  templateUrl: './all-languages.component.html',
  styleUrls: ['./all-languages.component.css']
})
export class AllLanguagesComponent implements OnInit {

  @Input() label: string | undefined;
  @Input() selectedLanguage?: Language;
  @Output() selectedLanguageChange: EventEmitter<Language> = new EventEmitter<Language>();
  allLanguages: Language[] = [];

  constructor(private languagesService: LanguagesService) {
  }

  ngOnInit(): void {
    console.log('AllLanguagesComponent');
    console.log(this.label);
    this.languagesService.getAllLanguages().subscribe(
      (languages: Language[]) => {
        this.allLanguages = languages;
      }
    );
  }

  changeLanguage(): void {
    console.log('changeLanguage', this.selectedLanguage);
    this.selectedLanguageChange.emit(this.selectedLanguage);
  }

}
