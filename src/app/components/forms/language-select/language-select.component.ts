import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LanguageName } from 'src/app/api/models';

@Component({
  selector: 'app-language-select',
  templateUrl: './language-select.component.html',
  styleUrls: ['./language-select.component.css']
})
export class LanguageSelectComponent implements OnInit {

  @Input() fieldName!: string;
  @Input() parentForm!: FormGroup;
  selectedLanguageName?: LanguageName = undefined;
  languagesSelect: LanguageName[] = ['ProtoHuman', 'Titan'];

  constructor() {
  }

  ngOnInit(): void {
  }

}
