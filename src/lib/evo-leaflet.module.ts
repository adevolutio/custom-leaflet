import { NgModule } from '@angular/core';
import { EvoLeafletComponent } from './evo-leaflet.component';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';
import {LeafletDrawModule} from '@asymmetrik/ngx-leaflet-draw';
import {CommonModule} from '@angular/common';



@NgModule({
  declarations: [EvoLeafletComponent],
  imports: [
    CommonModule,
    LeafletModule,
    LeafletDrawModule
  ],
  exports: [EvoLeafletComponent]
})
export class EvoLeafletModule { }
