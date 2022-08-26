import {OnChanges, OnInit, SimpleChanges, Component} from '@angular/core';
import {PosService} from "../../../api/services/pos.service";
import {Pos} from "../../../api/models/pos";
import {Language} from "../../../api/models/language";

@Component({ template: '' })
export abstract class WordNewDetailed implements OnInit, OnChanges {


  poses: Pos[] = [];

  protected constructor(protected posService: PosService) {
  }

  abstract get getLanguage(): Language;

  ngOnInit(): void {
    this.loadPos(this.getLanguage.id);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.language && changes.language.currentValue) {
      console.log('WordNewDetailed', changes, changes.language.currentValue);
      this.loadPos(changes.language.currentValue.id);
    }
  }

  loadPos(langId: number | undefined): void {
    if (langId) {
      this.posService.getAllPosByLanguage({languageId: langId}).subscribe(poses => {
        this.poses = poses.sort((a, b) => a.name ? a.name.localeCompare(b.name ? b.name : '') : -1);
      });
    } else {
      console.log("Can't load pos for null language")
      this.poses = [];
    }
  }
}
