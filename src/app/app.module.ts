import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ConfigService } from './configService/config.service';
import { ObjectMakerService } from './3D-object-maker/3D-object-maker.service';
import { ObjectRendererComponent } from './3D-object-renderer/3D-object-renderer.component';

@NgModule({
  declarations: [
    AppComponent,
    ObjectRendererComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ConfigService, ObjectMakerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
