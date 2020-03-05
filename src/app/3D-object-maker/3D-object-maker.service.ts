import { Injectable } from '@angular/core';
import {
  Scene,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
  SphereGeometry,
  CylinderGeometry,
  PerspectiveCamera
} from 'three';
import { GEOMETRY } from '../consts';

@Injectable({
  providedIn: 'root'
})
export class ObjectMakerService {

  public shape: any;
  public scene: Scene;
  public camera: PerspectiveCamera;

  constructor(geometry: string, scene: Scene, camera: PerspectiveCamera, material: MeshBasicMaterial) {
    this.scene = scene;
    this.camera = camera;
    switch (geometry) {
      case GEOMETRY.cube: {
        this.makeCube(material);
        break;
      }
      case GEOMETRY.sphere: {
        this.makeSphere(material);
        break;
      }
      case GEOMETRY.cylinder: {
        this.makeCylinder(material);
        break;
      }
    }
  }

  private makeCube(material: MeshBasicMaterial) {
    const geometry = new BoxGeometry( 1, 1, 1 );
    const cube = new Mesh( geometry, material );
    this.shape = cube;
    this.scene.add( cube );
    this.camera.position.z = 5;
    return {shape: this.shape, scene: this.scene, camera: this.camera};
  }

  private makeSphere(material: MeshBasicMaterial) {
    const geometry = new SphereGeometry( 5, 32, 32 );
    const sphere = new Mesh( geometry, material );
    this.shape = sphere;
    this.scene.add( sphere );
    this.camera.position.z = 10;
    return {shape: this.shape, scene: this.scene, camera: this.camera};
  }

  private makeCylinder(material: MeshBasicMaterial) {
    const geometry = new CylinderGeometry( 5, 5, 20, 32 );
    const cylinder = new Mesh( geometry, material );
    this.shape = cylinder;
    this.scene.add( cylinder );
    this.camera.position.z = 30;
    return {shape: this.shape, scene: this.scene, camera: this.camera};
  }

}
