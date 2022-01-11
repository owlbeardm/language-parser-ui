import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
//TODO: add new api
// import { AddWordTranslationJSON, WordJSON } from 'src/app/api/models';
// import { ApiService } from 'src/app/api/services';

@Component({
  selector: 'app-add-translation',
  templateUrl: './add-translation.component.html',
  styleUrls: ['./add-translation.component.css']
})
export class AddTranslationComponent implements OnInit {

  newTranslationForm: FormGroup;
  // @Input() word?: WordJSON;
  @Output() translationCreated = new EventEmitter<Object>();

  constructor(private fb: FormBuilder
    /*private apiService: ApiService*/) {
    this.newTranslationForm = fb.group({});
  }

  // lang: String,
  // pos: String,
  // wordText: String,
  // forgotten: Boolean
  ngOnInit(): void {
    // const word = this.word;
    this.newTranslationForm = this.fb.group({
      translation: this.fb.group({
        wordText: [undefined, Validators.required],
        // pos: word ?.partOfSpeech,
        lang: "English",
        makeForgotten: false,
      }),
      // wordFromId: word ?.id,
      langTo: "English",
      isAltTranslation: false,
      comment: undefined,
    });
  }

  async submit(newTranslationForm:any) {
    // this.checkoutForm.reset();
    if (newTranslationForm.isAltTranslation) {
      newTranslationForm.altTranslation = newTranslationForm ?.translation ?.wordText;
      delete newTranslationForm.translation;
    } else if (newTranslationForm.translation) {
      newTranslationForm.translation["originIds"] = [];
      // const exists = await this.apiService.postApiWordsExists(newTranslationForm.translation).toPromise();
      // console.log("new translation exists ", exists);
      // if (!exists) {
      //   const newWord = await this.apiService.postApiWords(newTranslationForm.translation).toPromise();
      //   console.log("new translation word added", exists);
      // }
    }
    // this.apiService.postApiTranslation(newTranslationForm).subscribe((added) => {
    //   console.log("new translation added ", added);
    //   this.translationCreated.emit();
    // });
    console.log(newTranslationForm);

  }

}
