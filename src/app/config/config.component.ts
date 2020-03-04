import { Component, OnInit, AfterViewInit } from '@angular/core';

import {Scene, PerspectiveCamera, WebGLRenderer, BoxGeometry, MeshBasicMaterial, Mesh} from 'three';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { GEOMETRY } from '../consts';

@Component({
  selector: 'figure-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements AfterViewInit, OnInit {
  private cube: any;
  private scene: any;
  private camera: any;

  public selectedPartIndex: number;
  public renderer: any;
  public parts: any;
  public geometricConfigForm: FormGroup;

  constructor(public fb: FormBuilder) {
    this.selectedPartIndex = 0;
   }

  ngOnInit(){
    const data = { 
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
    this.parts = data.parts;
    // this should go on config-form.options.ts
    this.geometricConfigForm = new FormGroup({
      parts: new FormControl()
   });
    this.selectedPartIndex = 0;
    this.geometricConfigForm.controls.parts.patchValue(this.selectedPartIndex);
  }

  ngAfterViewInit() {

    this.scene = new Scene();
    this.camera = new PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
    this.renderer = new WebGLRenderer();
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    this.render();
  }
  private render(){
    switch (this.parts[this.selectedPartIndex].geometry) {
      case GEOMETRY.cube: {
        this.makeCube();
        break;
      }
    }
  }
  private makeCube(){
    document.body.appendChild( this.renderer.domElement );
    const geometry = new BoxGeometry( 1, 1, 1 );
    const material = new MeshBasicMaterial( { color: 0x00ff00 } );
    this.cube = new Mesh( geometry, material );
    this.scene.add( this.cube );

    this.camera.position.z = 5;
    this.animate();
  }

 

  onOptionsSelected(selected: number){
    this.selectedPartIndex = selected;
    this.render();
  }
  onSubmit() {
    // console.log(JSON.stringify(this.form.value));
  }

  private animate () {
    const animate = () =>{
      requestAnimationFrame( animate );
  
      this.cube.rotation.x += 0.01;
      this.cube.rotation.y += 0.01;
  
      this.renderer.render( this.scene, this.camera );
    };
    animate();
  }
}
