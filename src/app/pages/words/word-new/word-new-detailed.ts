import {WordsService} from "../../../api/services/words.service";
import {PosService} from "../../../api/services/pos.service";
import {Pos} from "../../../api/models/pos";

export abstract class WordNewDetailed {

  poses: Pos[] = [];

  constructor(protected posService: PosService) {
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
