import {AfterViewInit, Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {EvoLeafletOptions as MapOptions} from './evo-leaflet-options';
import {control, featureGroup, latLngBounds, rectangle, tileLayer, Map, Browser, CircleMarker} from 'leaflet';
import {Subject} from 'rxjs';

@Component({
  selector: 'lib-evo-leaflet',
  templateUrl: './evo-leaflet.component.html',
  styleUrls: ['./evo-leaflet.component.scss'],
})
export class EvoLeafletComponent implements AfterViewInit, OnDestroy {
  private map: any;
  @Input() drawItems = featureGroup();
  @Input() constrolActive = false;
  @Input() center;
  @Input() markerClusterGroup;
  @Input() drawCenter: MapOptions['drawCenter'] = false;
  @Input() drawCenterBackButton: MapOptions['drawCenterBackButton'] = false;
  @Input() initRectangle: MapOptions['initRectangle'] = false;
  @Input() sideBar: MapOptions['sideBar'] = null;
  @Input() leftSideBar: MapOptions['leftSideBar'] = 0;
  @Input() rigthSideBar: MapOptions['rigthSideBar'] = 0;
  @Input() baseMap = null;
  @Input() withDrawTools: MapOptions['withDrawTools'] = false;
  @Input() wmsLayer: MapOptions['wmsLayer'] = null;
  @Input() baseMaps: MapOptions['baseMaps'];
  @Input() disabledMapEventsEmit: MapOptions['baseMaps'] = false;
  @Input() zoomControl: boolean;
  @Input() maxZoom = 17;
  @Input() minZoom = 12;
  @Input() leafletOptions: MapOptions['leafletOptions'] = {};
  @Input() drawOptions: MapOptions['drawOptions'] = {};
  @Output() getPoligonToFilter: EventEmitter<any> = new EventEmitter<any>();
  @Output() getMap: EventEmitter<any> = new EventEmitter<any>();
  circleMarker: CircleMarker;
  dOptions = null;
  private destroy$: Subject<any> = new Subject<any>();

  constructor() {
    this.leafletOptions = {
      controls: {
        layers: []
      },
      zoom: this.maxZoom,
      maxZoom: this.maxZoom,
      zoomControl: true,
      minZoom: this.minZoom,
      worldCopyJump: false,
      center: [39.664, -8.607],
      fadeAnimation: true,
      zoomAnimation: true,
      maxBounds: [
        [-90, -180],
        [90, 180],
      ],
      layers: [],
    };
  }

  ngAfterViewInit(): void {
    this.leafletOptions = {
      ...this.leafletOptions,
      zoomControl: this.zoomControl
    };
    setTimeout(() => {
      if (this.withDrawTools) {
        this.dOptions = {
          edit: {
            featureGroup: this.drawItems,
          },
          draw: {
            ...this.drawOptions
          }
        };
      } else {
        this.dOptions = {
          edit: false,
          draw: false
        };
      }
    });
  }

  showControls(): void {
    const Geoserver = this.wmsLayer;
    control.layers(
      this.baseMaps,
      Geoserver !== null ? {Geoserver} : {},
      {position: 'topleft'}).addTo(this.map);
  }

  public initConfigs(): void {
    this.disableMapEvents();
  }

  public resetMap(): void {
    this.map.setView(this.leafletOptions.center);
    this.disableMapEvents();
  }

  public disableMapEvents(): void {
    this.map.dragging.disable();
    this.map.touchZoom.disable();
    this.map.doubleClickZoom.disable();
    this.map.scrollWheelZoom.disable();
    this.map.boxZoom.disable();
    this.map.keyboard.disable();
  }

  public enableMapEvents(): void {
    this.map.dragging.enable();
    this.map.touchZoom.enable();
    this.map.doubleClickZoom.enable();
    this.map.scrollWheelZoom.enable();
    this.map.boxZoom.enable();
    this.map.keyboard.enable();
  }

  public flyTo(point: any, zoom = this.leafletOptions.zoom): void {
    this.map.setView(point, zoom);
  }

  public onMapReady(map: Map): void {
    this.map = map;
    this.getMap.emit(map);
    if (this.baseMaps === undefined || Object.keys(this.baseMaps).length === 0) {
      // tslint:disable-next-line:max-line-length
      tileLayer(`https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_nolabels/{z}/{x}/{y}${Browser.retina ? '@2x.png' : '.png'}`).addTo(this.map);
    } else {
      this.leafletOptions.controls.layers = [this.baseMaps];
      this.leafletOptions.layers = [this.baseMap];
    }

    if (this.constrolActive) {
      this.showControls();
    }

    if (this.disabledMapEventsEmit) {
      this.disableMapEvents();
    }

    if (this.center) {
      map.setView(this.center, 18);
      if (this.drawCenter) {
        this.drawCenterMarker();
      }
    }

    if (this.initRectangle) {
      if (this.sideBar) {
        this.drawRectangleFixed();
      }
    }

    if (this.wmsLayer) {
      this.wmsLayer.addTo(this.map);
    }

    if (this.drawCenterBackButton) {
      const tpl = `<div class="recenter leaflet-control">
                    <a id="back-center" class="back-center" title="Reset Center">
                    <span class="material-icons">sync</span>
                    </a>
                    </div>`;
      const parent = document.querySelector('.leaflet-top.leaflet-left');
      parent.insertAdjacentHTML('beforeend', tpl);
      document.getElementById('back-center')
        .addEventListener('click', this.resetCenter.bind(this));
    }
  }

  public onZoomEnd(): void {
  }

  drawCenterMarker(): void {
    if (this.circleMarker) {
      this.map.removeLayer(this.circleMarker);
    }
    this.circleMarker = new CircleMarker(
      this.center,
      {
        radius: 25,
        color: '#ce903c',
        stroke: true,
        weight: 4,
        fillOpacity: 0,
      }
    ).addTo(this.map);
  }

  resetCenter(): void {
    if (this.markerClusterGroup) {
      this.map.fitBounds(this.markerClusterGroup.getBounds());
    } else {
      this.map.setView(this.center, this.minZoom);
    }
    if (this.initRectangle) {
      setTimeout(() => {
        this.drawRectangleFixed();
      }, 1100);
    }
  }

  onDrawStart(): void {
    if (this.drawItems.getLayers().length > 0) {
      this.drawItems.clearLayers();
    }
  }

  onDrawCreated(evt, map = null, drawnItems = null): void {
    this.drawItems.addLayer(evt.layer);
    this.getPoligonToFilter.emit(this.createPolygonObjectParam(evt.layer.getLatLngs()));
  }

  onDrawEdited(evt): void {
    this.enableMapEvents();
    this.getPoligonToFilter.emit(this.createPolygonObjectParam(evt.layers.getLayers()[0].getLatLngs()));
  }

  onDrawEditStart(): void {
    this.disableMapEvents();
  }

  onDrawEditStop(evt): void {
  }

  onDrawDelete(): void {
    this.drawRectangleFixed();
  }

  drawRectangleFixed(): void {
    let boxBounds;

    const rOffset = this.rigthSideBar ? this.rigthSideBar : 5;
    const lOffset = this.leftSideBar ? this.leftSideBar : 5;
    const tOffset = 5;
    const bOffset = 5;

    // Calculate Bounding Box from offsets
    boxBounds = latLngBounds(
      this.map.unproject({
        x: this.map.getPixelBounds().max.x - rOffset,
        y: this.map.getPixelBounds().max.y - bOffset,
      }),
      this.map.unproject({
        x: this.map.getPixelBounds().min.x + lOffset,
        y: this.map.getPixelBounds().min.y + tOffset,
      })
    );

    // // Remove old Rectangle
    this.drawItems.clearLayers();

    // Draw Cluster Bounding Box Rectangle
    const rectangleLayer = rectangle(boxBounds, {
      className: 'rectagleFilter',
      color: '#0079ff',
      weight: 3,
      fillOpacity: 0.1,
    });
    this.drawItems.addLayer(rectangleLayer);
    this.getPoligonToFilter.emit(this.createPolygonObjectParam(rectangleLayer.getLatLngs()));
    // this.showControls();
  }

  createPolygonObjectParam(bounds): string {
    const polygon = {
      type: 'Polygon',
      coordinates: [],
    };
    const points = [];
    for (const ltln of bounds[0]) {
      points.push([
        parseFloat(ltln.lng.toFixed(6)),
        parseFloat(ltln.lat.toFixed(6)),
      ]);
    }
    points.push([
      parseFloat(bounds[0][0].lng.toFixed(6)),
      parseFloat(bounds[0][0].lat.toFixed(6)),
    ]);
    polygon.coordinates.push(points);
    return JSON.stringify(polygon);
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }
}
