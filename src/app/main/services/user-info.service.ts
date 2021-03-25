import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IUserInfoResponse } from '../models/UserInfo.model';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  constructor(
    private httpClient:HttpClient
  ) { }

  getUserInfo(appId:string,uid:any){
    // return this.httpClient.get<IUserInfoResponse>(`${environment.Host}${environment.APIPrefix}${environment.APIVersion}${environment.APIUserInfo}?app_id=${appId}&uid=${uid}&secure_hash=${environment.secureHash}`)
    return this.httpClient.get<IUserInfoResponse>(`${environment.Host}${environment.APIPrefix}${environment.APIVersion}${environment.APIUserInfo}?app_id=${appId}&uid=IGrHNTb81qdqXpHTXTdwiRTKHa92&secure_hash=${environment.secureHash}`)
  }
}
