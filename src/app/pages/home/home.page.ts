import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  minigames: Array<any> = [];

  constructor(private dataService: DataService) {
    this.minigames = this.dataService.getMinigames();
  }

  getImagePath(minigameImage: string): string {
    return "../../../assets/images/" + minigameImage;
  }



}
