import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Word } from '../models/word';

@Component({
  selector: 'app-words',
  templateUrl: './words.component.html',
  styleUrls: ['./words.component.css']
})
export class WordsComponent implements OnInit {

  words: Word[];

  constructor(private apiService: ApiService) {
    this.apiService = apiService;
    this.words = [];    
  }

  ngOnInit(): void {
    this.apiService.getWords("velv","").subscribe((words)=>{
      this.words = words;    
    });
  }

}
