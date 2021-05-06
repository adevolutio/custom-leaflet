# Custom leaflet + draw + wms

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.7.

## Install
<code>
npm install @adevolutio/custom-leaflet@0.1.0
</code>

### Dependeces
<code>
npm install --save @asymmetrik/ngx-leaflet @asymmetrik/ngx-leaflet-draw leaflet-draw leaflet leaflet.markercluster leaflet.wms
</code>

### Types
<code>
npm install --save @types/leaflet @types/leaflet-draw @types/leaflet.markercluster
</code>

### Icons
<code>
ng add @angular/material<br>
In app.module.ts<br>
import {MatIconModule} from '@angular/material/icon'
</code>

---

## Options
Render draw tools @default false
* withDrawTools?: true | false;

Emmit event when zoom end, @default false.
* zoomEnd?: true | false

Base maps type:Object { name: tile}.
* baseMaps?: any; @default {}

Wms Layer with options. @default null
* wmsLayer?: any;

Draw Options type:Object. @default {}
* drawOptions?: any;

Leaflet Options.

@default <code>{
edit: {
featureGroup: null,
},
draw: false,
circle: false,
rectangle: false,
marker: false,
circlemarker: false,
}</code>
* leafletOptions?: any;

DisabledMapEvents (click, drag, zoom from map).@default false
* disabledMapEventsEmit?: true | false;

InitRectangle, Start map with initial draw rectagle design. @default false
* initRectangle?: true | false;

Have a side bar? @default null\
For floating div over map\
if set; need set left or right or both distance
* sideBar?: 'left' | 'right' | 'both';

Set position left? @default null
* leftSideBar?: number;

Set position rigth? @default null
* rigthSideBar?: number;

Draw circleMarker in center point @default false
* drawCenter?: true | false;

Draw button to reset map to center point @default false
* drawCenterBackButton?: true | false;

---


