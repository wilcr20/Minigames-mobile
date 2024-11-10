import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  minigames: Array<any> = [];

  constructor(
    private dataService: DataService,
    private router: Router
  ) {
    this.minigames = this.dataService.getMinigames();
  }

  getImagePath(minigameImage: string): string {
    return "../../../assets/images/" + minigameImage;
  }

  redirectPage(url: string){
    this.router.navigateByUrl(url);
  }



}
