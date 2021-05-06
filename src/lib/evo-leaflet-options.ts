import {WMSOptions, tileLayer} from 'leaflet';

export interface EvoLeafletOptions {
  /**
   * Render draw tools
   *
   * @default false
   */
  withDrawTools?: true | false;
  /**
   * Filter store when zoom end.
   *
   * @default false
   */
  zoomEnd?: true | false;
  /**
   * Object.
   * { name: tile}
   * @default {}
   */
  baseMaps?: any;
  /**
   * Wms Layer with options.
   *
   * @default null
   */
  wmsLayer?: any;
  /**
   * Draw Options.
   *
   * @default {}
   */
  drawOptions?: any;
  /**
   * Leaflet Options.
   *
   * @default {
   *    edit: {
   *      featureGroup: null,
   *    },
   *    draw: false,
   *    circle: false,
   *    rectangle: false,
   *    marker: false,
   *    circlemarker: false,
   *  },
   */
  leafletOptions?: any;
  /**
   * disabledMapEvents.
   *
   * @default {
   *    false
   *    disbled click, drag, zoom from map
   */
  disabledMapEventsEmit?: true | false;
  /**
   * initRectangle.
   *
   * @default {
   *    false
   *    Start map with initial rectagle design;
   */
  initRectangle?: true | false;
  /**
   * Have a side bar?
   *
   * @default null
   * if set; need set left or right or both distance
   */
  sideBar?: 'left' | 'right' | 'both';
  /**
   * Set position left?
   *
   * @default null
   */
  leftSideBar?: number;
  /**
   * Set position rigth?
   *
   * @default null
   */
  rigthSideBar?: number;
  /**
   * Draw circleMarker in center point
   *
   * @default false
   */
  drawCenter?: true | false;
  /**
   * Draw button to reset map to center point
   *
   * @default false
   */
  drawCenterBackButton?: true | false;
}
