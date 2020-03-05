import { Component, OnInit } from '@angular/core';

import {Scene, PerspectiveCamera, WebGLRenderer, BoxGeometry, MeshBasicMaterial, Mesh, SphereGeometry, CylinderGeometry} from 'three';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { GEOMETRY } from '../consts';

@Component({
  selector: 'figure-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {
  private shape: any;
  private scene: any;
  private camera: any;
  private animated: boolean;
  private material: MeshBasicMaterial;

  public selectedPartIndex: number;
  public selectedColor: string;
  public renderer: any;
  public parts: any;
  public colors: any;
  public geometricConfigForm: FormGroup;

  constructor(public fb: FormBuilder) {
    this.selectedPartIndex = 0;
    this.camera = new PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
    this.renderer = new WebGLRenderer();
    this.renderer.setSize( window.innerWidth, window.innerHeight );
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
    this.colors = data.configurationInputs.find( input => input.type = "color").values;
    // this should go on config-form.options.ts
    this.geometricConfigForm = new FormGroup({
      parts: new FormControl(),
      colors: new FormControl(),
   });
    this.selectedPartIndex = 0;
    this.geometricConfigForm.controls.parts.patchValue(this.selectedPartIndex);
    this.material = new MeshBasicMaterial( {color: "", wireframe: true} );
    this.render();
  }

  private render(){
    this.scene = new Scene();
    switch (this.parts[this.selectedPartIndex].geometry) {
      case GEOMETRY.cube: {
        this.makeCube();
        break;
      }
      case GEOMETRY.sphere: {
        this.makeSphere();
        break;
      }
      case GEOMETRY.cylinder: {
        this.makeCylinder();
        break;
      }
    }
    this.animate();
  }
  private makeCube(){
    document.body.appendChild( this.renderer.domElement );
    const geometry = new BoxGeometry( 1, 1, 1 );
    const cube = new Mesh( geometry, this.material );
    this.shape = cube;
    this.scene.add( cube );
    this.camera.position.z = 5;
  }

  private makeSphere() {
    document.body.appendChild( this.renderer.domElement );
    const geometry = new SphereGeometry( 5, 32, 32 );
    const sphere = new Mesh( geometry, this.material );
    this.shape = sphere;
    this.scene.add( sphere );
    this.camera.position.z = 10;
  }

  private makeCylinder() {
    const geometry = new CylinderGeometry( 5, 5, 20, 32 );
    const cylinder = new Mesh( geometry, this.material );
    this.shape = cylinder;
    this.scene.add( cylinder );
    this.camera.position.z = 30;
  }

  onOptionsSelected(selected: number){
    this.selectedPartIndex = selected;
    this.render();
  }
  onColorSelected(selected: string){
    this.selectedColor = `#${selected.toLocaleLowerCase()}`;
    this.material.color.set(this.selectedColor);
  }
  onSubmit() {
    // console.log(JSON.stringify(this.form.value));
  }

  private animate () {
    if (!!this.animated) { return this.renderer.render( this.scene, this.camera );}
    const animate = () =>{
      requestAnimationFrame( animate );
      this.shape.rotation.x += 0.01;
      this.shape.rotation.y += 0.01;
      this.animated = true;
      this.renderer.render( this.scene, this.camera );
    };
    return animate();
  }
}
