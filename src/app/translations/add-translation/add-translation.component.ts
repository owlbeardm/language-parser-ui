import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import { AddWordTranslationJSON, Word } from 'src/app/models/word';

@Component({
  selector: 'app-add-translation',
  templateUrl: './add-translation.component.html',
  styleUrls: ['./add-translation.component.css']
})
export class AddTranslationComponent implements OnInit {

  newTranslationForm: FormGroup;
  @Input() word?: Word;
  @Output() translationCreated = new EventEmitter<Object>();

  constructor(private fb: FormBuilder,
    private apiService: ApiService) {
    this.newTranslationForm = fb.group({});
  }

  // lang: String,
  // pos: String,
  // wordText: String,
  // forgotten: Boolean
  ngOnInit(): void {
    const word = this.word;
    this.newTranslationForm = this.fb.group({
      translation: this.fb.group({
        wordText: [undefined, Validators.required],
        pos: word ?.partOfSpeech,
        lang: "English",
        forgotten: false,
      }),
      wordFromId: word ?.id,
      langTo: "English",
      isAltTranslation: false,
      comment: undefined,
    });
  }

  async submit(newTranslationForm: AddWordTranslationJSON) {
    // this.checkoutForm.reset();
    if (newTranslationForm.isAltTranslation) {
      newTranslationForm.altTranslation = newTranslationForm ?.translation ?.wordText;
    } else if (newTranslationForm ?.translation) {
      const exists = await this.apiService.existsWord(newTranslationForm ?.translation).toPromise();
      console.log("new translation exists ", exists);
      if (!exists) {
        const newWord = await this.apiService.addNewWord(newTranslationForm ?.translation).toPromise();
        console.log("new translation word added", exists);
      }
    }
    this.apiService.addNewTranslation(newTranslationForm).subscribe((added) => {
      console.log("new translation added ", added);
      this.translationCreated.emit();
    });
    console.log(newTranslationForm);

  }

}
