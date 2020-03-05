import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IConfig } from '../3D-object-renderer/config';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private _endpoint = "";

  constructor(private http: HttpClient) { }

  getConfig() {
    // return this.http.get<IConfig>(this._endpoint);
    return { 
      "configurationInputs": [ 
        { 
          "name": "Color",
          "type": "color", 
          "values": [ 
            { 
              "label": "Red", "code": "FF0000"
            }, {
              "label": "Green", "code": "00FF00" },
            { 
              "label": "Blue", "code": "0000FF" },
            { 
              "label": "Black", "code": "000000" },
            { 
              "label": "White", "code": "FFFFFF"
            } 
          ]
        }
      ],
      "parts": [ 
        {
          "geometry": "sphere",
          "parameters": { "radius": "50" }
        }, {
          "geometry": "cube",
          "parameters": { "height": "100" } 
        }, { 
          "geometry": "cylinder", "parameters": { 
          "radius": "50", "height": "100" } 
        } 
      ] 
    }
  }

}
