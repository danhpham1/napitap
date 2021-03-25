import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IGame } from '../../models/game.model';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'v-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  listGame:Array<IGame>;

  isNotGame:boolean;

  subscription:Subscription;

  constructor(
    private gameService:GameService
  ) { 
    this.listGame = [];
    this.subscription = new Subscription();
    this.isNotGame = false;
  }

  ngOnInit(): void {
    this.getGames();
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }

  private getGames(){
    let gameSub = this.gameService.getListGame().subscribe(rs=>{
      if(rs.data.length >= 1){
        this.listGame = rs.data;
      }else{
        this.isNotGame = true
      }
    })
    this.subscription.add(gameSub);
  }

}
