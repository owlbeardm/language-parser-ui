import { Component, OnInit } from '@angular/core';
import { LangService } from '../service/lang.service';
import { Language, AddWordJSON } from '../models/word';
import { ApiService } from '../api.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-words-list',
  templateUrl: './words-list.component.html',
  styleUrls: ['./words-list.component.css']
})
export class WordsListComponent implements OnInit {

  pos: String[];
  langs: Language[];
  newWordForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private apiService: ApiService) {
    this.langs = [];
    this.pos = [];
    this.newWordForm = this.formBuilder.group({
      lang: "",
      pos: "",
      wordText: "",
      forgotten: true
    });
  }

  ngOnInit(): void {
    this.apiService.getLanguages().subscribe((langs) => this.langs = langs);
    this.apiService.getPartsOfSpeech().subscribe((pos) => this.pos = pos);
  }

  submit(newWordData: AddWordJSON) {
    // this.checkoutForm.reset();
    console.log(newWordData);
    this.apiService.addNewWord(newWordData).subscribe((added) => {
      console.log("new  word added ", added);
    })
  }

}
