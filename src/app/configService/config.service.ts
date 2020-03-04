import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IConfig } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private _endpoint = "";

  constructor(private http: HttpClient) { }

  getConfig(){
    return this.http.get<IConfig>(this._endpoint);
  }

}
