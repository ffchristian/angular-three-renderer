import { Component, OnInit } from '@angular/core';

import {Scene, PerspectiveCamera, WebGLRenderer, MeshBasicMaterial} from 'three';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ObjectMakerService } from '../3D-object-maker/3D-object-maker.service';
import { ConfigService } from '../configService/config.service';

@Component({
  selector: 'renderer',
  templateUrl: './3D-object-renderer.component.html',
  styleUrls: ['./3D-object-renderer.component.css']
})
export class ObjectRendererComponent implements OnInit {
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

  constructor(public fb: FormBuilder, private configService: ConfigService) {
    this.selectedPartIndex = 0;
    this.camera = new PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    this.renderer = new WebGLRenderer();
    this.renderer.setSize( window.innerWidth, window.innerHeight );
   }

  async ngOnInit() {
    const data: any = this.configService.getConfig();
    this.parts = data.parts;
    this.colors = data.configurationInputs.find( input => input.type === "color").values;
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
    document.body.appendChild( this.renderer.domElement );
    const object: any = new ObjectMakerService(this.parts[this.selectedPartIndex].geometry,
                                                              this.scene, this.camera, this.material);
    this.shape = object.shape;
    this.scene = object.scene;
    this.camera = object.camera;
    this.animate();
  }

  onOptionsSelected(selected: number){
    this.selectedPartIndex = selected;
    this.render();
  }

  onColorSelected(selected: string){
    this.selectedColor = `#${selected.toLocaleLowerCase()}`;
    this.material.color.set(this.selectedColor);
  }

  private animate() {
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
