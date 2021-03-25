import { Component, Input, OnInit } from '@angular/core';
import { IGame } from '../../models/game.model';

@Component({
  selector: 'v-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  @Input()game!:IGame;

  @Input()isGiftCode:boolean;
  
  constructor() { 
    this.isGiftCode = false;
  }

  ngOnInit(): void {
  }

}
