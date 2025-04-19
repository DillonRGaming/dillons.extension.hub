(function(Scratch) {
  const svgIcon = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTMxIiBoZWlnaHQ9IjkzMSIgdmlld0JveD0iMCAwIDkzMSA5MzEiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjQ2NS41IiBjeT0iNDY1LjUiIHI9IjQ2NS41IiBmaWxsPSIjOENDODY0Ii8+CjxwYXRoIGQ9Ik0yMDkuMDExIDc2NC4xMTRMMTg4LjE3MSA3NTAuNjg0QzE4Ny40NjcgNzUwLjIzMSAxODcuMTIgNzQ5LjM4NyAxODcuMzAyIDc0OC41N0wxOTMuMjIgNzIxLjg5NEMxOTMuMjQ2IDcyMS43ODEgMTkzLjI4MSA3MjEuNjY5IDE5My4zMjUgNzIxLjU2MkwyMTUuMzQ2IDY2OC40NDVMMjI0LjU1OSA2NDEuMDA3TDI0OS41ODQgNTgzLjgyNkwyNzEuMzggNTQzLjI4NkMyNzEuNDUyIDU0My4xNTIgMjcxLjU0IDU0My4wMjYgMjcxLjY0MSA1NDIuOTExTDMxOC4zMzEgNDg5LjkxNUMzMTguMzk1IDQ4OS44NDIgMzE4LjQ2NCA0ODkuNzc0IDMxOC41MzggNDg5LjcxMUwzNTguOTYzIDQ1NS40NTNDMzU5LjA1OSA0NTUuMzcyIDM1OS4xNjIgNDU1LjMgMzU5LjI3MSA0NTUuMjM4TDQzMS4wNzkgNDE0LjU4OEw0OTAuNTM0IDM4OS41MTZMNTM0LjY1NyAzNzUuNTYxQzUzNi45MDMgMzc0Ljg1MSA1MzYuMjg3IDM3MS41MTkgNTMzLjkzNiAzNzEuNjU4TDQ5Ny4wMTMgMzczLjgzM0M0OTYuODY2IDM3My44NDIgNDk2LjcyMSAzNzMuODY2IDQ5Ni41OCAzNzMuOTA3TDQzMS4wNzkgMzkyLjY1TDM1OS4yNjEgNDIzLjkyM0MzNTkuMTU4IDQyMy45NjggMzU5LjA2IDQyNC4wMjEgMzU4Ljk2NiA0MjQuMDgzTDI4Ny40NSA0NzAuNzk1QzI4Ny4yNDIgNDcwLjkzMSAyODcuMDYxIDQ3MS4xMDUgMjg2LjkxNiA0NzEuMzA4TDI1NS44NDMgNTE0Ljg3N0wyMjEuNTcxIDU2NC44MDRDMjIxLjQ3MiA1NjQuOTQ5IDIyMS4zOTIgNTY1LjEwNiAyMjEuMzMzIDU2NS4yNzJMMTk4LjQ2MiA2MzAuMjUyQzE5Ny44NzkgNjMxLjkwOCAxOTUuNiA2MzIuMDY0IDE5NC43OTcgNjMwLjUwNEwxOTAuMzUxIDYyMS44NjVDMTkwLjIwNSA2MjEuNTgyIDE5MC4xMjkgNjIxLjI2OCAxOTAuMTI5IDYyMC45NVY2MTUuMzM4QzE5MC4xMjkgNjE1LjIyNCAxOTAuMTM5IDYxNS4xMSAxOTAuMTU4IDYxNC45OTdMMjAyLjU5IDU0My4wODRMMjA4LjkzNiA1MDkuMzlDMjA4Ljk1OCA1MDkuMjc3IDIwOC45ODggNTA5LjE2NiAyMDkuMDI4IDUwOS4wNTlMMjIxLjMzMyA0NzYuMTU3QzIyMS4zOTIgNDc1Ljk5OSAyMjEuNDcgNDc1Ljg1IDIyMS41NjcgNDc1LjcxMkwyNDAuMTk3IDQ0OS4wNjNMMjgzLjg4OCAzOTIuODAxQzI4My45NjYgMzkyLjcwMSAyODQuMDU0IDM5Mi42MDggMjg0LjE1IDM5Mi41MjRMMzA4LjkwNSAzNzAuODNDMzA4Ljk5NCAzNzAuNzUxIDMwOS4wOTEgMzcwLjY4MSAzMDkuMTkzIDM3MC42MkwzNzEuNDk1IDMzMy4xODFDMzcxLjU4MSAzMzMuMTI5IDM3MS42NyAzMzMuMDg0IDM3MS43NjIgMzMzLjA0Nkw0MjQuNjg1IDMxMS4yMjFDNDI0Ljc3NSAzMTEuMTg0IDQyNC44NjggMzExLjE1NCA0MjQuOTYyIDMxMS4xM0w0NzQuODg4IDI5OC42MjlMNTc1LjAyMyAyNjQuMTU1TDY0My44NjUgMjM1Ljk0OUw2OTMuOTMzIDIwNy43NDJMNzMxLjM2OSAxNzkuNjIyQzczMS40NDUgMTc5LjU2NSA3MzEuNTE3IDE3OS41MDMgNzMxLjU4NCAxNzkuNDM2TDczOS45NjggMTcxLjAzOUM3NDEuMzA0IDE2OS43IDc0My41NzkgMTcwLjc5MyA3NDMuMzcxIDE3Mi42NzJMNzQwLjg3MSAxOTUuMjA2TDcyMi4wOTYgMjgyLjk1OUw3MDYuNDg5IDM1Ny45ODVDNzA2LjQ2MyAzNTguMTEyIDcwNi40MjQgMzU4LjIzNiA3MDYuMzczIDM1OC4zNTZMNjcyLjExNSA0MzkuNDU0QzY3Mi4wNTcgNDM5LjU5MSA2NzEuOTg0IDQzOS43MjIgNjcxLjg5NyA0MzkuODQzTDYxNS43OTcgNTE3Ljg4QzYxNS43MzQgNTE3Ljk2OCA2MTUuNjY0IDUxOC4wNSA2MTUuNTg4IDUxOC4xMjZMNTcyLjAyOCA1NjEuNzUzQzU3MS45MzggNTYxLjg0MyA1NzEuODQgNTYxLjkyNCA1NzEuNzM2IDU2MS45OTVMNDc1LjA3OCA2MjcuNTc0QzQ3NC45NTEgNjI3LjY1OSA0NzQuODE2IDYyNy43MyA0NzQuNjc0IDYyNy43ODVMNDM0LjM2MSA2NDMuMzE0QzQzNC4yNTkgNjQzLjM1MyA0MzQuMTU0IDY0My4zODQgNDM0LjA0OCA2NDMuNDA2TDM0My42NjEgNjYyLjEzNUMzNDMuNTI4IDY2Mi4xNjMgMzQzLjM5MiA2NjIuMTc3IDM0My4yNTYgNjYyLjE3N0gyOTguNDk0QzI5OC4zMzcgNjYyLjE3NyAyOTguMTgxIDY2Mi4xOTUgMjk4LjAyOSA2NjIuMjMyTDI3Mi45MDQgNjY4LjIzOEMyNzIuMzUzIDY2OC4zNyAyNzEuODgzIDY2OC43MjkgMjcxLjYxMyA2NjkuMjI3TDI1NS43MzkgNjk4LjM5OEwyMzYuNzQ3IDczNy43ODJDMjM2LjY1MyA3MzcuOTc3IDIzNi41MjkgNzM4LjE1NSAyMzYuMzc4IDczOC4zMDlMMjExLjUyNyA3NjMuODI4QzIxMC44NjMgNzY0LjUxIDIwOS44MSA3NjQuNjI5IDIwOS4wMTEgNzY0LjExNFoiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo=';

  const closeIconSvgInline = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="16" height="16"><path fill="currentColor" d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>`;

  class Leaflet {
      constructor() {
          this.map = null;
          this.markers = [];
          this.currentLayer = null;
          this.leafletLoaded = false;
          this.modalContainer = null;
          this.frameStyle = '#ffffff';
          this.frameWidth = 600;
          this.frameHeight = 400;
          this.closeButtonBackground = '#808080';
          this.closeButtonColor = '#000000';
          this.closeButtonAligned = 'right';
          this.closeButtonType = 'icon';
          this.zoomButtonBackground = '#ffffff';
          this.zoomButtonColor = '#000000';
          this.zoomButtonSize = 30;
      }

      initLeaflet() {
          return new Promise((resolve, reject) => {
              if (this.leafletLoaded) {
                  resolve();
                  return;
              }

              const leafletCSS = document.createElement('link');
              leafletCSS.rel = 'stylesheet';
              leafletCSS.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
              leafletCSS.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
              leafletCSS.crossOrigin = 'anonymous';
              document.head.appendChild(leafletCSS);

              const leafletJS = document.createElement('script');
              leafletJS.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
              leafletJS.integrity = 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=';
              leafletJS.crossOrigin = 'anonymous';
              leafletJS.onload = () => {
                  this.leafletLoaded = true;
                  resolve();
              };
              leafletJS.onerror = () => reject('Failed to load Leaflet');
              document.head.appendChild(leafletJS);
          });
      }

      getInfo() {
          const sizeOptionsWidth = [];
          for (let i = 0; i <= 1200; i += 100) sizeOptionsWidth.push(String(i));
          const sizeOptionsHeight = [];
          for (let i = 0; i <= 600; i += 100) sizeOptionsHeight.push(String(i));
          const zoomSizeOptions = ['20', '30', '40', '50'];

          return {
              id: 'leaflet',
              name: 'Leaflet',
              color1: '#8CC864',
              color2: '#82B46A',
              menuIconURI: svgIcon,
              blocks: [
                  {
                      opcode: 'openMap',
                      blockType: Scratch.BlockType.COMMAND,
                      text: 'Open Map',
                      blockIconURI: svgIcon
                  },
                  {
                      opcode: 'closeMap',
                      blockType: Scratch.BlockType.COMMAND,
                      text: 'Close Map',
                      blockIconURI: svgIcon
                  },
                  '---',
                  {
                      opcode: 'setMapView',
                      blockType: Scratch.BlockType.COMMAND,
                      text: 'Set map view to latitude [lat] longitude [lng] zoom [zoom]',
                      arguments: {
                          lat: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                          lng: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                          zoom: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 }
                      },
                      blockIconURI: svgIcon
                  },
                  {
                      opcode: 'setTileLayer',
                      blockType: Scratch.BlockType.COMMAND,
                      text: 'Set tile layer to [layer]',
                      arguments: {
                          layer: { type: Scratch.ArgumentType.STRING, menu: 'tileLayers', defaultValue: 'OpenStreetMap' }
                      },
                      blockIconURI: svgIcon
                  },
                  '---',
                  {
                      opcode: 'addMarker',
                      blockType: Scratch.BlockType.COMMAND,
                      text: 'Add marker at latitude [lat] longitude [lng] with popup [popup]',
                      arguments: {
                          lat: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                          lng: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                          popup: { type: Scratch.ArgumentType.STRING, defaultValue: 'Hello World!' }
                      },
                      blockIconURI: svgIcon
                  },
                  {
                      opcode: 'addMarkerIcon',
                      blockType: Scratch.BlockType.COMMAND,
                      text: 'Add marker with color [icon] at latitude [lat] longitude [lng] with popup [popup]',
                      arguments: {
                          icon: { type: Scratch.ArgumentType.STRING, menu: 'markerIcons', defaultValue: 'red' },
                          lat: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                          lng: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                          popup: { type: Scratch.ArgumentType.STRING, defaultValue: 'Hello World!' }
                      },
                      blockIconURI: svgIcon
                  },
                  {
                      opcode: 'clearMarkers',
                      blockType: Scratch.BlockType.COMMAND,
                      text: 'Clear all markers',
                      blockIconURI: svgIcon
                  },
                  '---',
                  {
                      opcode: 'yourLocation',
                      blockType: Scratch.BlockType.REPORTER,
                      blockShape: Scratch.BlockShape.LEAF,
                      text: 'your [location]',
                      disableMonitor: true,
                      arguments: {
                          location: { type: Scratch.ArgumentType.STRING, menu: 'locationOptions', defaultValue: 'latitude' }
                      },
                      blockIconURI: svgIcon
                  },
                  '---',
                  {
                      opcode: 'setFrameSize',
                      blockType: Scratch.BlockType.COMMAND,
                      text: 'Set map frame width to [width] height to [height]',
                      arguments: {
                          width: { type: Scratch.ArgumentType.STRING, menu: 'sizeOptionsWidth', defaultValue: '600' },
                          height: { type: Scratch.ArgumentType.STRING, menu: 'sizeOptionsHeight', defaultValue: '600' }
                      },
                      blockIconURI: svgIcon
                  },
                  {
                      opcode: 'setFrameStyle',
                      blockType: Scratch.BlockType.COMMAND,
                      text: 'Set map frame style to [style]',
                      arguments: {
                          style: { type: Scratch.ArgumentType.COLOR, defaultValue: this.frameStyle }
                      },
                      blockIconURI: svgIcon
                  },
                  {
                      opcode: 'setCloseButtonBackground',
                      blockType: Scratch.BlockType.COMMAND,
                      text: 'Set Close Button Background to [color]',
                      arguments: {
                          color: { type: Scratch.ArgumentType.COLOR, defaultValue: this.closeButtonBackground }
                      },
                      blockIconURI: svgIcon
                  },
                  {
                      opcode: 'setCloseButtonColor',
                      blockType: Scratch.BlockType.COMMAND,
                      text: 'Set Close Button Color to [color]',
                      arguments: {
                          color: { type: Scratch.ArgumentType.COLOR, defaultValue: this.closeButtonColor }
                      },
                      blockIconURI: svgIcon
                  },
                  {
                      opcode: 'setCloseButtonAlignment',
                      blockType: Scratch.BlockType.COMMAND,
                      text: 'Set Close Button Alignment to [alignment]',
                      arguments: {
                          alignment: { type: Scratch.ArgumentType.STRING, menu: 'buttonAlignment', defaultValue: 'center' }
                      },
                      blockIconURI: svgIcon
                  },
                  {
                      opcode: 'setCloseButtonType',
                      blockType: Scratch.BlockType.COMMAND,
                      text: 'Set Close Button Type to [type]',
                      arguments: {
                          type: { type: Scratch.ArgumentType.STRING, menu: 'buttonType', defaultValue: 'text' }
                      },
                      blockIconURI: svgIcon
                  },
                  {
                      opcode: 'resetStyles',
                      blockType: Scratch.BlockType.COMMAND,
                      text: 'Reset Styles',
                      blockIconURI: svgIcon
                  }
              ],
              menus: {
                  tileLayers: ['OpenStreetMap', 'Satellite', 'Dark', 'Light', 'EsriWorldStreetMap', 'CyclOSM', 'HikeBike'],
                  markerIcons: ['red', 'green', 'blue', 'yellow'],
                  locationOptions: ['longitude', 'latitude'],
                  sizeOptionsWidth: sizeOptionsWidth,
                  sizeOptionsHeight: sizeOptionsHeight,
                  buttonAlignment: ['left', 'center', 'right'],
                  buttonType: ['text', 'icon', 'text and icon'],
                  zoomSizeOptions: zoomSizeOptions
              }
          };
      }

      yourLocation(args) {
          return new Promise((resolve) => {
              if (navigator.geolocation) {
                  navigator.geolocation.getCurrentPosition(
                      (position) => resolve(args.location === 'longitude' ? position.coords.longitude : position.coords.latitude),
                      () => { alert('Error getting location'); resolve(''); }
                  );
              } else {
                  alert('Geolocation not supported');
                  resolve('');
              }
          });
      }

      updateCloseButton() {
          if (!this.modalContainer) return;
          const closeButton = this.modalContainer.querySelector('button');
          if (closeButton) {
              closeButton.style.backgroundColor = this.closeButtonBackground;
              closeButton.style.color = this.closeButtonColor;
              closeButton.style.alignSelf = this.closeButtonAligned === 'left' ? 'flex-start' : (this.closeButtonAligned === 'right' ? 'flex-end' : 'center');
              closeButton.style.display = 'flex';
              closeButton.style.alignItems = 'center';
              closeButton.style.gap = '5px';

              let buttonContent = '';
              if (this.closeButtonType === 'text') {
                  buttonContent = 'Close Map';
              } else if (this.closeButtonType === 'icon') {
                  buttonContent = closeIconSvgInline;
              } else {
                  buttonContent = `Close Map ${closeIconSvgInline}`;
              }
              closeButton.innerHTML = buttonContent;
          }
      }

      openMap() {
          this.initLeaflet()
              .then(() => {
                  if (this.map) this.closeMap();

                  this.modalContainer = document.createElement('div');
                  this.modalContainer.style.cssText = `
                      position: fixed;
                      top: 50%;
                      left: 50%;
                      transform: translate(-50%, -50%);
                      background-color: ${this.frameStyle};
                      padding: 10px;
                      box-shadow: 0 4px 8px rgba(0,0,0,0.2);
                      z-index: 1000;
                      border-radius: 10px;
                      display: flex;
                      flex-direction: column;
                      align-items: center;
                  `;
                  document.body.appendChild(this.modalContainer);

                  const closeButton = document.createElement('button');
                  closeButton.style.cssText = `
                      margin-bottom: 10px;
                      padding: 5px 10px;
                      border: none;
                      border-radius: 5px;
                      cursor: pointer;
                      background-color: ${this.closeButtonBackground};
                      color: ${this.closeButtonColor};
                      align-self: ${this.closeButtonAligned === 'left' ? 'flex-start' : (this.closeButtonAligned === 'right' ? 'flex-end' : 'center')};
                      display: flex;
                      align-items: center;
                      gap: 5px;
                  `;
                  this.updateCloseButton();
                  closeButton.addEventListener('click', () => this.closeMap());
                  this.modalContainer.appendChild(closeButton);

                  const mapElement = document.createElement('div');
                  mapElement.id = 'map';
                  mapElement.style.width = `${this.frameWidth}px`;
                  mapElement.style.height = `${this.frameHeight}px`;
                  mapElement.style.borderRadius = '10px';
                  this.modalContainer.appendChild(mapElement);

                  this.map = L.map('map', { zoomControl: false }).setView([0, 0], 1);
                  this.setTileLayer({layer: 'OpenStreetMap'});
              })
              .catch(error => alert(error));
      }

      setMapView(args) {
          if (this.map) this.map.setView([Scratch.Cast.toNumber(args.lat), Scratch.Cast.toNumber(args.lng)], Scratch.Cast.toNumber(args.zoom));
      }

      addMarker(args) {
          if (this.map) {
              const marker = L.marker([Scratch.Cast.toNumber(args.lat), Scratch.Cast.toNumber(args.lng)])
                  .addTo(this.map)
                  .bindPopup(Scratch.Cast.toString(args.popup));
              this.markers.push(marker);
          }
      }

      addMarkerIcon(args) {
          if (this.map) {
              const icon = L.divIcon({
                  className: 'custom-marker',
                  html: `<div style="background-color: ${Scratch.Cast.toString(args.icon)}; width: 20px; height: 20px; border-radius: 50%; border: 1px solid black;"></div>`,
                  iconSize: [22, 22],
                  iconAnchor: [11, 11],
                  popupAnchor: [0, -11]
              });
              const marker = L.marker([Scratch.Cast.toNumber(args.lat), Scratch.Cast.toNumber(args.lng)], { icon })
                  .addTo(this.map)
                  .bindPopup(Scratch.Cast.toString(args.popup));
              this.markers.push(marker);
          }
      }

      clearMarkers() {
          this.markers.forEach(marker => this.map.removeLayer(marker));
          this.markers = [];
      }

      setTileLayer(args) {
          const layerName = Scratch.Cast.toString(args.layer);
          const tileLayers = {
              OpenStreetMap: L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                  attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              }),
              Satellite: L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
                  attribution: 'Tiles © Esri'
              }),
              Dark: L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
                  attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> © <a href="https://carto.com/attributions">CARTO</a>',
                  subdomains: 'abcd'
              }),
              Light: L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
                  attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> © <a href="https://carto.com/attributions">CARTO</a>',
                  subdomains: 'abcd'
              }),
              EsriWorldStreetMap: L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
                  attribution: 'Tiles © Esri'
              }),
              CyclOSM: L.tileLayer('https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png', {
                  attribution: '<a href="https://github.com/cyclosm/cyclosm-cartocss-style/releases" title="CyclOSM - Open Bicycle map">CyclOSM</a> | Map data: © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              }),
              HikeBike: L.tileLayer('https://tileserver.memomaps.de/tilegen/{z}/{x}/{y}.png', {
                  attribution: 'Hike & Bike Map'
              })
          };

          if (this.map) {
              if (this.currentLayer) this.map.removeLayer(this.currentLayer);
              this.currentLayer = tileLayers[layerName] || tileLayers['OpenStreetMap'];
              this.currentLayer.addTo(this.map);
          }
      }

      setFrameSize(args) {
          this.frameWidth = Scratch.Cast.toNumber(args.width);
          this.frameHeight = Scratch.Cast.toNumber(args.height);
          if (this.modalContainer) {
              const mapElement = this.modalContainer.querySelector('#map');
              if (mapElement) {
                  mapElement.style.width = `${this.frameWidth}px`;
                  mapElement.style.height = `${this.frameHeight}px`;
              }
          }
      }

      setFrameStyle(args) {
          this.frameStyle = Scratch.Cast.toString(args.style);
          if (this.modalContainer) this.modalContainer.style.backgroundColor = this.frameStyle;
      }

      setCloseButtonBackground(args) {
          this.closeButtonBackground = Scratch.Cast.toString(args.color);
          this.updateCloseButton();
      }

      setCloseButtonColor(args) {
          this.closeButtonColor = Scratch.Cast.toString(args.color);
          this.updateCloseButton();
      }

      setCloseButtonAlignment(args) {
          this.closeButtonAligned = Scratch.Cast.toString(args.alignment);
          this.updateCloseButton();
      }

      setCloseButtonType(args) {
          this.closeButtonType = Scratch.Cast.toString(args.type);
          this.updateCloseButton();
      }

      resetStyles() {
          this.frameStyle = '#ffffff';
          this.frameWidth = 600;
          this.frameHeight = 400;
          this.closeButtonBackground = '#808080';
          this.closeButtonColor = '#000000';
          this.closeButtonAligned = 'right';
          this.closeButtonType = 'icon';
          this.zoomButtonBackground = '#ffffff';
          this.zoomButtonColor = '#000000';
          this.zoomButtonSize = 30;

          if (this.modalContainer) {
              this.modalContainer.style.backgroundColor = this.frameStyle;
              const mapElement = this.modalContainer.querySelector('#map');
              if (mapElement) {
                  mapElement.style.width = `${this.frameWidth}px`;
                  mapElement.style.height = `${this.frameHeight}px`;
              }
              this.updateCloseButton();
          }
      }

      closeMap() {
          if (this.map) {
              this.map.remove();
              this.map = null;
          }
          if (this.modalContainer) {
              this.modalContainer.remove();
              this.modalContainer = null;
          }
          this.leafletLoaded = false;
      }
  }

  Scratch.extensions.register(new Leaflet());
})(Scratch);