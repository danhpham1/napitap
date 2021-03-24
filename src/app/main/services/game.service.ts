import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IGameResponse } from '../models/game.model';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(
    private httpClient:HttpClient
  ) { }

  getListGame(){
    return this.httpClient.get<IGameResponse>(`${environment.Host}${environment.APIPrefix}${environment.APIVersion}${environment.APIListGame}`);
  }
}
