(function(Scratch) {
    'use strict';
  
    if (!Scratch.extensions.unsandboxed) {
        throw new Error("Leaflet extension must be run unsandboxed");
    }
  
    const vm = Scratch.vm;
    const runtime = vm.runtime;
    const Cast = Scratch.Cast;
    const ArgumentType = Scratch.ArgumentType;
    const BlockType = Scratch.BlockType;
  
    const svgIcon = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTMxIiBoZWlnaHQ9IjkzMSIgdmlld0JveD0iMCAwIDkzMSA5MzEiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjQ2NS41IiBjeT0iNDY1LjUiIHI9IjQ2NS41IiBmaWxsPSIjOENDODY0Ii8+CjxwYXRoIGQ9Ik0yMDkuMDExIDc2NC4xMTRMMTg4LjE3MSA3NTAuNjg0QzE4Ny40NjcgNzUwLjIzMSAxODcuMTIgNzQ5LjM4NyAxODcuMzAyIDc0OC41N0wxOTMuMjIgNzIxLjg5NEMxOTMuMjQ2IDcyMS43ODEgMTkzLjI4MSA3MjEuNjY5IDE5My4zMjUgNzIxLjU2MkwyMTUuMzQ2IDY2OC40NDVMMjI0LjU1OSA2NDEuMDA3TDI0OS41ODQgNTgzLjgyNkwyNzEuMzggNTQzLjI4NkMyNzEuNDUyIDU0My4xNTIgMjcxLjU0IDU0My4wMjYgMjcxLjY0MSA1NDIuOTExTDMxOC4zMzEgNDg5LjkxNUMzMTguMzk1IDQ4OS44NDIgMzE4LjQ2NCA0ODkuNzc0IDMxOC41MzggNDg5LjcxMUwzNTguOTYzIDQ1NS40NTNDMzU5LjA1OSA0NTUuMzcyIDM1OS4xNjIgNDU1LjMgMzU5LjI3MSA0NTUuMjM4TDQzMS4wNzkgNDE0LjU4OEw0OTAuNTM0IDM4OS41MTZMNTM0LjY1NyAzNzUuNTYxQzUzNi45MDMgMzc0Ljg1MSA1MzYuMjg3IDM3MS41MTkgNTMzLjkzNiAzNzEuNjU4TDQ5Ny4wMTMgMzczLjgzM0M0OTYuODY2IDM3My44NDIgNDk2LjcyMSAzNzMuODY2IDQ5Ni41OCAzNzMuOTA3TDQzMS4wNzkgMzkyLjY1TDM1OS4yNjEgNDIzLjkyM0MzNTkuMTU4IDQyMy45NjggMzU5LjA2IDQyNC4wMjEgMzU4Ljk2NiA0MjQuMDgzTDI4Ny40NSA0NzAuNzk1QzI4Ny4yNDIgNDcwLjkzMSAyODcuMDYxIDQ3MS4xMDUgMjg2LjkxNiA0NzEuMzA4TDI1NS44NDMgNTE0Ljg3N0wyMjEuNTcxIDU2NC44MDRDMjIxLjQ3MiA1NjQuOTQ5IDIyMS4zOTIgNTY1LjEwNiAyMjEuMzMzIDU2NS4yNzJMMTk4LjQ2MiA2MzAuMjUyQzE5Ny44NzkgNjMxLjkwOCAxOTUuNiA2MzIuMDY0IDE5NC43OTcgNjMwLjUwNEwxOTAuMzUxIDYyMS44NjVDMTkwLjIwNSA2MjEuNTgyIDE5MC4xMjkgNjIxLjI2OCAxOTAuMTI5IDYyMC45NVY2MTUuMzM4QzE5MC4xMjkgNjE1LjIyNCAxOTAuMTM5IDYxNS4xMSAxOTAuMTU4IDYxNC45OTdMMjAyLjU5IDU0My4wODRMMjA4LjkzNiA1MDkuMzlDMjA4Ljk1OCA1MDkuMjc3IDIwOC45ODggNTA5LjE2NiAyMDkuMDI4IDUwOS4wNTlMMjIxLjMzMyA0NzYuMTU3QzIyMS4zOTIgNDc1Ljk5OSAyMjEuNDcgNDc1Ljg1IDIyMS41NjcgNDc1LjcxMkwyNDAuMTk3IDQ0OS4wNjNMMjgzLjg4OCAzOTIuODAxQzI4My45NjYgMzkyLjcwMSAyODQuMDU0IDM5Mi42MDggMjg0LjE1IDM5Mi41MjRMMzA4LjkwNSAzNzAuODNDMzA4Ljk5NCAzNzAuNzUxIDMwOS4wOTEgMzcwLjY4MSAzMDkuMTkzIDM3MC42MkwzNzEuNDk1IDMzMy4xODFDMzcxLjU4MSAzMzMuMTI5IDM3MS42NyAzMzMuMDg0IDM3MS43NjIgMzMzLjA0Nkw0MjQuNjg1IDMxMS4yMjFDNDI0Ljc3NSAzMTEuMTg0IDQyNC44NjggMzExLjE1NCA0MjQuOTYyIDMxMS4xM0w0NzQuODg4IDI5OC42MjlMNTc1LjAyMyAyNjQuMTU1TDY0My44NjUgMjM1Ljk0OUw2OTMuOTMzIDIwNy43NDJMNzMxLjM2OSAxNzkuNjIyQzczMS40NDUgMTc5LjU2NSA3MzEuNTE3IDE3OS41MDMgNzMxLjU4NCAxNzkuNDM2TDczOS45NjggMTcxLjAzOUM3NDEuMzA0IDE2OS43IDc0My41NzkgMTcwLjc5MyA3NDMuMzcxIDE3Mi42NzJMNzQwLjg3MSAxOTUuMjA2TDcyMi4wOTYgMjgyLjk1OUw3MDYuNDg5IDM1Ny45ODVDNzA2LjQ2MyAzNTguMTEyIDcwNi40MjQgMzU4LjIzNiA3MDYuMzczIDM1OC4zNTZMNjcyLjExNSA0MzkuNDU0QzY3Mi4wNTcgNDM5LjU5MSA2NzEuOTg0IDQzOS43MjIgNjcxLjg5NyA0MzkuODQzTDYxNS43OTcgNTE3Ljg4QzYxNS43MzQgNTE3Ljk2OCA2MTUuNjY0IDUxOC4wNSA2MTUuNTg4IDUxOC4xMjZMNTcyLjAyOCA1NjEuNzUzQzU3MS45MzggNTYxLjg0MyA1NzEuODQgNTYxLjkyNCA1NzEuNzM2IDU2MS45OTVMNDc1LjA3OCA2MjcuNTc0QzQ3NC45NTEgNjI3LjY1OSA0NzQuODE2IDYyNy43MyA0NzQuNjc0IDYyNy43ODVMNDM0LjM2MSA2NDMuMzE0QzQzNC4yNTkgNjQzLjM1MyA0MzQuMTU0IDY0My4zODQgNDM0LjA0OCA2NDMuNDA2TDM0My42NjEgNjYyLjEzNUMzNDMuNTI4IDY2Mi4xNjMgMzQzLjM5MiA2NjIuMTc3IDM0My4yNTYgNjYyLjE3N0gyOTguNDk0QzI5OC4zMzcgNjYyLjE3NyAyOTguMTgxIDY2Mi4xOTUgMjk4LjAyOSA2NjIuMjMyTDI3Mi45MDQgNjY4LjIzOEMyNzIuMzUzIDY2OC4zNyAyNzEuODgzIDY2OC43MjkgMjcxLjYxMyA2NjkuMjI3TDI1NS43MzkgNjk4LjM5OEwyMzYuNzQ3IDczNy43ODJDMjM2LjY1MyA3MzcuOTc3IDIzNi41MjkgNzM4LjE1NSAyMzYuMzc4IDczOC4zMDlMMjExLjUyNyA3NjMuODI4QzIxMC44NjMgNzY0LjUxIDIwOS44MSA3NjQuNjI5IDIwOS4wMTEgNzY0LjExNFoiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo=';
    const closeIconSvgInline = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="16" height="16"><path fill="currentColor" d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>`;
  
    class Leaflet {
        constructor() {
            this.map = null;
            this.markers = {};
            this.currentLayer = null;
            this.leafletLoaded = false;
            this.modalContainer = null;
            this.mapElement = null;
            this.resizeHandle = null;
            this.frameStyle = '#ffffff';
            this.frameWidth = 600;
            this.frameHeight = 400;
            this.frameBorderColor = '#cccccc';
            this.frameBorderWidth = 1;
            this.frameBorderStyle = 'solid';
            this.frameBorderRadius = 10;
            this.closeButtonBackground = '#808080';
            this.closeButtonColor = '#000000';
            this.closeButtonAligned = 'right';
            this.closeButtonType = 'text';
            this.zoomButtonBackground = '#ffffff';
            this.zoomButtonColor = '#000000';
            this.zoomButtonSize = 30;
            this.zoomControl = null;
            this.zoomControlPosition = 'topright';
            this.isFullscreen = false;
            this.fullscreenExitKey = 'e';
            this.isDragging = false;
            this.dragOffsetX = 0;
            this.dragOffsetY = 0;
            this.isResizing = false;
            this.resizeInitialX = 0;
            this.resizeInitialY = 0;
            this.resizeInitialWidth = 0;
            this.resizeInitialHeight = 0;
            this._boundKeyDownListener = null;
            this._boundModalMouseDown = this._onModalMouseDown.bind(this);
            this._boundDocumentMouseMove = this._onDocumentMouseMove.bind(this);
            this._boundDocumentMouseUp = this._onDocumentMouseUp.bind(this);
            this._boundResizeMouseDown = this._onResizeMouseDown.bind(this);
        }
  
        initLeaflet() {
            return new Promise((resolve, reject) => {
                if (this.leafletLoaded) {
                    resolve();
                    return;
                }
                const cssLink = document.createElement('link');
                cssLink.rel = 'stylesheet';
                cssLink.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
                document.head.appendChild(cssLink);
  
                const scriptTag = document.createElement('script');
                scriptTag.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
                scriptTag.onload = () => {
                    this.leafletLoaded = true;
                    resolve();
                };
                scriptTag.onerror = (err) => {
                    reject('Failed to load Leaflet library.');
                };
                document.head.appendChild(scriptTag);
            });
        }
  
        getInfo() {
            const sizeOptions = (start, end, step) => {
                const opts = [];
                for (let i = start; i <= end; i += step) {
                    opts.push(String(i));
                }
                return opts;
            };
            const opacityOptions = () => {
                const opts = [];
                for (let i = 0; i <= 100; i += 10) {
                    opts.push(String(i));
                }
                return opts;
            };
            const strokeWeightOptions = () => {
                const opts = [];
                for (let i = 0; i <= 5; i += 1) {
                    opts.push(String(i));
                }
                return opts;
            };
  
            return {
                id: 'leaflet',
                name: 'Leaflet',
                menuIconURI: svgIcon,
                blockIconURI: svgIcon,
                color1: '#8CC864',
                color2: '#82B46A',
                blocks: [
                    { blockType: BlockType.LABEL, text: "Map Control" },
                    { opcode: 'openMap', blockType: BlockType.COMMAND, text: 'Open Map' },
                    { opcode: 'closeMap', blockType: BlockType.COMMAND, text: 'Close Map' },
                    { opcode: 'enterFullscreen', blockType: BlockType.COMMAND, text: 'Enter Map Fullscreen' },
                    { opcode: 'exitFullscreen', blockType: BlockType.COMMAND, text: 'Exit Map Fullscreen' },
                    { opcode: 'setFullscreenExitKey', blockType: BlockType.COMMAND, text: 'Set fullscreen exit key to [key]', arguments: { key: { type: ArgumentType.STRING, defaultValue: 'e' } } },
                    '---',
                    { blockType: BlockType.LABEL, text: "User Location" },
                    { opcode: 'yourLocation', blockType: BlockType.REPORTER, blockShape: Scratch.BlockShape.LEAF, text: 'your [location]', disableMonitor: true, arguments: { location: { type: ArgumentType.STRING, menu: 'locationOptions', defaultValue: 'latitude' } } },
                    '---',
                    { blockType: BlockType.LABEL, text: "Map View & Navigation" },
                    { opcode: 'setMapView', blockType: BlockType.COMMAND, text: 'Set map view to latitude [lat] longitude [lng] zoom [zoom]', arguments: { lat: { type: ArgumentType.NUMBER, defaultValue: 0 }, lng: { type: ArgumentType.NUMBER, defaultValue: 0 }, zoom: { type: ArgumentType.NUMBER, defaultValue: 1 } } },
                    { opcode: 'panTo', blockType: BlockType.COMMAND, text: 'Pan to latitude [lat] longitude [lng] over [duration] seconds', arguments: { lat: { type: ArgumentType.NUMBER, defaultValue: 0 }, lng: { type: ArgumentType.NUMBER, defaultValue: 0 }, duration: { type: ArgumentType.NUMBER, defaultValue: 1 } } },
                    { opcode: 'changeMapLatitudeBy', blockType: BlockType.COMMAND, text: 'Change map latitude by [degrees]', arguments: { degrees: { type: ArgumentType.NUMBER, defaultValue: 1 } } },
                    { opcode: 'changeMapLongitudeBy', blockType: BlockType.COMMAND, text: 'Change map longitude by [degrees]', arguments: { degrees: { type: ArgumentType.NUMBER, defaultValue: 1 } } },
                    { opcode: 'changeMapZoomBy', blockType: BlockType.COMMAND, text: 'Change map zoom by [levels]', arguments: { levels: { type: ArgumentType.NUMBER, defaultValue: 1 } } },
                    { opcode: 'getMapProperty', blockType: BlockType.REPORTER, blockShape: Scratch.BlockShape.LEAF, text: 'current map [property]', arguments: { property: { type: ArgumentType.STRING, menu: 'mapProperties', defaultValue: 'center latitude' } } },
                    '---',
                    { blockType: BlockType.LABEL, text: "Markers" },
                    { opcode: 'setMarker', blockType: BlockType.COMMAND, text: 'Define/Update marker [name] at lat [lat] lng [lng] color [color] shape [shape] size [size] stroke color [strokeColor] weight [strokeWeight] fill opacity [fillOpacity]%', arguments: { name: { type: ArgumentType.STRING, defaultValue: 'marker1' }, lat: { type: ArgumentType.NUMBER, defaultValue: 0 }, lng: { type: ArgumentType.NUMBER, defaultValue: 0 }, color: { type: ArgumentType.COLOR, defaultValue: '#ff0000' }, shape: { type: ArgumentType.STRING, menu: 'markerShapes', defaultValue: 'circle' }, size: { type: ArgumentType.STRING, menu: 'markerSizeOptions', defaultValue: '20' }, strokeColor: { type: ArgumentType.COLOR, defaultValue: '#000000' }, strokeWeight: { type: ArgumentType.STRING, menu: 'strokeWeightOptions', defaultValue: '1' }, fillOpacity: { type: ArgumentType.STRING, menu: 'opacityOptions', defaultValue: '100' } } },
                    { opcode: 'removeMarkerDefinition', blockType: BlockType.COMMAND, text: 'Remove marker definition [name]', arguments: { name: { type: ArgumentType.STRING, defaultValue: 'marker1' } } },
                    { opcode: 'removeAllMarkerDefinitions', blockType: BlockType.COMMAND, text: 'Remove all marker definitions' },
                    { opcode: 'clearMarkerFromMap', blockType: BlockType.COMMAND, text: 'Clear marker [name] from map', arguments: { name: { type: ArgumentType.STRING, defaultValue: 'marker1' } } },
                    { opcode: 'clearAllMarkersFromMap', blockType: BlockType.COMMAND, text: 'Clear all markers from map' },
                    { opcode: 'markerIsDefined', blockType: BlockType.BOOLEAN, text: 'marker [name] is defined?', arguments: { name: { type: ArgumentType.STRING, defaultValue: 'marker1' } } },
                    { opcode: 'isMarkerOnMap', blockType: BlockType.BOOLEAN, text: 'is marker [name] on map?', arguments: { name: { type: ArgumentType.STRING, defaultValue: 'marker1' } } },
                    '---',
                    { blockType: BlockType.LABEL, text: "Marker Data & GeoJSON" },
                    { opcode: 'setMarkersFromList', blockType: BlockType.COMMAND, text: 'Define markers from list (JSON) [list_data]', arguments: { list_data: { type: ArgumentType.STRING, defaultValue: '[{"name":"m1","lat":0,"lng":0,"color":"#ff0000","shape":"circle","size":20,"strokeColor":"#000000","strokeWeight":1,"fillOpacity":100}]' } } },
                    { opcode: 'getAllDefinedMarkersAsList', blockType: BlockType.REPORTER, blockShape: Scratch.BlockShape.LEAF, text: 'All defined markers as list (JSON)' },
                    { opcode: 'importMarkersFromGeoJSON', blockType: BlockType.COMMAND, text: 'Import markers from GeoJSON [geojson_string]', arguments: { geojson_string: { type: ArgumentType.STRING, defaultValue: '{"type":"FeatureCollection","features":[]}' } } },
                    { opcode: 'exportMarkersToGeoJSON', blockType: BlockType.REPORTER, blockShape: Scratch.BlockShape.LEAF, text: 'All defined markers as GeoJSON' },
                    '---',
                    { blockType: BlockType.LABEL, text: "Map Styling" },
                    { opcode: 'setTileLayer', blockType: BlockType.COMMAND, text: 'Set tile layer to [layer]', arguments: { layer: { type: ArgumentType.STRING, menu: 'tileLayers', defaultValue: 'OpenStreetMap' } } },
                    { opcode: 'setFrameSize', blockType: BlockType.COMMAND, text: 'Set map frame width to [width] height to [height]', arguments: { width: { type: ArgumentType.STRING, menu: 'sizeOptionsWidth', defaultValue: '600' }, height: { type: ArgumentType.STRING, menu: 'sizeOptionsHeight', defaultValue: '400' } } },
                    { opcode: 'setFrameStyle', blockType: BlockType.COMMAND, text: 'Set map frame background to [style]', arguments: { style: { type: ArgumentType.COLOR, defaultValue: this.frameStyle } } },
                    { opcode: 'setFrameBorder', blockType: BlockType.COMMAND, text: 'Set map frame border color [color] width [width] style [style]', arguments: { color: { type: ArgumentType.COLOR, defaultValue: this.frameBorderColor }, width: { type: ArgumentType.NUMBER, defaultValue: this.frameBorderWidth }, style: { type: ArgumentType.STRING, menu: 'borderStyles', defaultValue: this.frameBorderStyle } } },
                    { opcode: 'setFrameBorderRadius', blockType: BlockType.COMMAND, text: 'Set map frame border radius to [radius]px', arguments: { radius: { type: ArgumentType.NUMBER, defaultValue: this.frameBorderRadius } } },
                    '---',
                    { opcode: 'setCloseButtonLook', blockType: BlockType.COMMAND, text: 'Set close button type [type] alignment [alignment]', arguments: { type: { type: ArgumentType.STRING, menu: 'buttonType', defaultValue: 'text' }, alignment: { type: ArgumentType.STRING, menu: 'buttonAlignment', defaultValue: 'right' } } },
                    { opcode: 'setCloseButtonColors', blockType: BlockType.COMMAND, text: 'Set close button background [bgColor] color [color]', arguments: { bgColor: { type: ArgumentType.COLOR, defaultValue: this.closeButtonBackground }, color: { type: ArgumentType.COLOR, defaultValue: this.closeButtonColor } } },
                    '---',
                    { opcode: 'setZoomControlPosition', blockType: BlockType.COMMAND, text: 'Set zoom control position to [position]', arguments: { position: { type: ArgumentType.STRING, menu: 'zoomPositions', defaultValue: 'topright' } } },
                    { opcode: 'setZoomButtonStyle', blockType: BlockType.COMMAND, text: 'Set zoom button background [bgColor] color [color] size [size]', arguments: { bgColor: { type: ArgumentType.COLOR, defaultValue: '#ffffff' }, color: { type: ArgumentType.COLOR, defaultValue: '#000000' }, size: { type: ArgumentType.NUMBER, defaultValue: 30 } } },
                    '---',
                    { opcode: 'resetStyles', blockType: BlockType.COMMAND, text: 'Reset All Styles' },
                ],
                menus: {
                    tileLayers: ['OpenStreetMap', 'Satellite', 'Dark', 'Light', 'EsriWorldStreetMap', 'CyclOSM', 'HikeBike'],
                    locationOptions: ['latitude', 'longitude'],
                    mapProperties: ['center latitude', 'center longitude', 'zoom level', 'bounds (JSON)'],
                    sizeOptionsWidth: sizeOptions(100, 1200, 100),
                    sizeOptionsHeight: sizeOptions(100, 800, 100),
                    buttonAlignment: ['left', 'center', 'right'],
                    buttonType: ['none', 'text', 'icon', 'text and icon'],
                    borderStyles: ['solid', 'dashed', 'dotted', 'double', 'groove', 'ridge', 'inset', 'outset', 'none'],
                    zoomPositions: ['topleft', 'topright', 'bottomleft', 'bottomright', 'none'],
                    markerShapes: ['circle', 'square', 'diamond', 'pin'],
                    markerSizeOptions: sizeOptions(10, 50, 5),
                    strokeWeightOptions: strokeWeightOptions(),
                    opacityOptions: opacityOptions(),
                    markerNames: { acceptReporters: true, items: '_getMarkerNames' },
                }
            };
        }
  
        _getMarkerNames() {
            const markerKeys = Object.keys(this.markers);
            if (markerKeys.length === 0) {
                return [{ text: '(No markers defined)', value: '_NO_MARKERS_' }];
            }
            markerKeys.sort((a, b) => a.localeCompare(b));
            return markerKeys.map(name => ({ text: name, value: name }));
        }
  
        _emitWorkspaceUpdate() {
            if (Scratch.vm && typeof Scratch.vm.emitWorkspaceUpdate === 'function') {
                Promise.resolve().then(() => Scratch.vm.emitWorkspaceUpdate()).catch(() => {});
            }
        }
  
        _getCloseButtonContent() {
            if (this.closeButtonType === 'text') return 'Close';
            if (this.closeButtonType === 'icon') return closeIconSvgInline;
            if (this.closeButtonType === 'text and icon') return `Close ${closeIconSvgInline}`;
            return '';
        }
  
        _updateModalAppearance() {
            if (!this.modalContainer) return;
            Object.assign(this.modalContainer.style, {
                backgroundColor: this.frameStyle,
                border: `${this.frameBorderWidth}px ${this.frameBorderStyle} ${this.frameBorderColor}`,
                borderRadius: `${this.frameBorderRadius}px`
            });
            if (!this.isFullscreen) {
                const closeButtonHeight = this.closeButtonType === 'none' ? 0 : 40;
                Object.assign(this.modalContainer.style, {
                    width: `${this.frameWidth + (this.frameBorderWidth * 2) + 20}px`,
                    height: `${this.frameHeight + (this.frameBorderWidth * 2) + closeButtonHeight + 10}px`
                });
                if (this.mapElement) {
                    Object.assign(this.mapElement.style, {
                        width: `${this.frameWidth}px`,
                        height: `${this.frameHeight}px`
                    });
                }
            }
            this._updateCloseButton();
            if (this.map) {
                setTimeout(() => this.map.invalidateSize(), 50);
            }
        }
  
        _updateCloseButton() {
            if (!this.modalContainer) return;
            let button = this.modalContainer.querySelector('.leaflet-custom-close-button');
            if (button) button.remove();
            if (this.closeButtonType !== 'none') {
                button = document.createElement('button');
                button.className = 'leaflet-custom-close-button';
                button.style.cssText = `margin-bottom:10px;padding:5px 10px;border:none;border-radius:5px;cursor:pointer;background-color:${this.closeButtonBackground};color:${this.closeButtonColor};align-self:${this.closeButtonAligned === 'left' ? 'flex-start' : (this.closeButtonAligned === 'right' ? 'flex-end' : 'center')};display:flex;align-items:center;gap:5px;line-height:1;`;
                button.innerHTML = this._getCloseButtonContent();
                button.addEventListener('click', () => this.closeMap());
                this.modalContainer.insertBefore(button, this.modalContainer.firstChild);
            }
        }
  
        _onModalMouseDown(event) {
            if (this.isFullscreen) return;
            const target = event.target;
            const isInteractiveElement = (el) => el && (target === el || el.contains(target));
            if (isInteractiveElement(this.mapElement) || isInteractiveElement(this.resizeHandle) || isInteractiveElement(this.modalContainer.querySelector('.leaflet-custom-close-button')) || (this.zoomControl && isInteractiveElement(this.modalContainer.querySelector('.leaflet-control-zoom')))) {
                return;
            }
            this.isDragging = true;
            const rect = this.modalContainer.getBoundingClientRect();
            this.dragOffsetX = event.clientX - rect.left;
            this.dragOffsetY = event.clientY - rect.top;
            this.modalContainer.style.cursor = 'grabbing';
            document.addEventListener('mousemove', this._boundDocumentMouseMove);
            document.addEventListener('mouseup', this._boundDocumentMouseUp);
            event.preventDefault();
        }
  
        _onResizeMouseDown(event) {
            if (this.isFullscreen) return;
            this.isResizing = true;
            this.resizeInitialX = event.clientX;
            this.resizeInitialY = event.clientY;
            this.resizeInitialWidth = this.frameWidth;
            this.resizeInitialHeight = this.frameHeight;
            this.modalContainer.style.cursor = 'nwse-resize';
            document.addEventListener('mousemove', this._boundDocumentMouseMove);
            document.addEventListener('mouseup', this._boundDocumentMouseUp);
            event.preventDefault();
            event.stopPropagation();
        }
  
        _onDocumentMouseMove(event) {
            if (this.isDragging) {
                this.modalContainer.style.left = `${event.clientX - this.dragOffsetX}px`;
                this.modalContainer.style.top = `${event.clientY - this.dragOffsetY}px`;
                this.modalContainer.style.transform = 'none';
            } else if (this.isResizing) {
                this.frameWidth = Math.max(150, this.resizeInitialWidth + (event.clientX - this.resizeInitialX));
                this.frameHeight = Math.max(100, this.resizeInitialHeight + (event.clientY - this.resizeInitialY));
                this._updateModalAppearance();
            }
        }
  
        _onDocumentMouseUp() {
            const wasActive = this.isDragging || this.isResizing;
            this.isDragging = false;
            this.isResizing = false;
            this.modalContainer.style.cursor = 'grab';
            if (this.resizeHandle) this.resizeHandle.style.cursor = 'nwse-resize';
            document.removeEventListener('mousemove', this._boundDocumentMouseMove);
            document.removeEventListener('mouseup', this._boundDocumentMouseUp);
            if (wasActive && !this.isFullscreen && this.modalContainer.style.transform === 'none') {
                const rect = this.modalContainer.getBoundingClientRect();
                const translateX = (rect.left + rect.width / 2) - (window.innerWidth / 2);
                const translateY = (rect.top + rect.height / 2) - (window.innerHeight / 2);
                this.modalContainer.style.left = '50%';
                this.modalContainer.style.top = '50%';
                this.modalContainer.style.transform = `translate(calc(-50% + ${translateX}px), calc(-50% + ${translateY}px))`;
            } else if (!this.isFullscreen && !wasActive) {
                this.modalContainer.style.left = '50%';
                this.modalContainer.style.top = '50%';
                this.modalContainer.style.transform = 'translate(-50%, -50%)';
            }
        }
  
        _setupModalInteractivity() {
            if (!this.modalContainer) return;
            this.modalContainer.style.cursor = 'grab';
            this.modalContainer.addEventListener('mousedown', this._boundModalMouseDown);
            if (this.resizeHandle) this.resizeHandle.remove();
            this.resizeHandle = document.createElement('div');
            this.resizeHandle.style.cssText = `position:absolute;bottom:1px;right:1px;width:15px;height:15px;background:#8885;cursor:nwse-resize;z-index:1001;border-top-left-radius:100%;`;
            this.modalContainer.appendChild(this.resizeHandle);
            this.resizeHandle.addEventListener('mousedown', this._boundResizeMouseDown);
            if (this.isFullscreen) this.resizeHandle.style.display = 'none';
        }
  
        _removeModalInteractivity() {
            if (!this.modalContainer) return;
            this.modalContainer.removeEventListener('mousedown', this._boundModalMouseDown);
            if (this.resizeHandle) {
                this.resizeHandle.removeEventListener('mousedown', this._boundResizeMouseDown);
                this.resizeHandle.remove();
                this.resizeHandle = null;
            }
            document.removeEventListener('mousemove', this._boundDocumentMouseMove);
            document.removeEventListener('mouseup', this._boundDocumentMouseUp);
        }
  
        openMap() {
            this.initLeaflet().then(() => {
                if (this.map) this.closeMap();
                this.isFullscreen = false;
                this.modalContainer = document.createElement('div');
                this.modalContainer.style.cssText = `position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);padding:10px;box-shadow:0 4px 8px rgba(0,0,0,0.2);z-index:1000;display:flex;flex-direction:column;align-items:stretch;box-sizing:border-box;overflow:hidden;`;
                document.body.appendChild(this.modalContainer);
                this.mapElement = document.createElement('div');
                this.mapElement.id = `scratch-leaflet-map-${Date.now()}`;
                this.mapElement.style.borderRadius = 'inherit';
                this.mapElement.style.flexGrow = '1';
                this.modalContainer.appendChild(this.mapElement);
                this._updateModalAppearance();
                this.map = L.map(this.mapElement.id, { zoomControl: false }).setView([0, 0], 1);
                this.setTileLayer({ layer: 'OpenStreetMap' });
                for (const name in this.markers) {
                    if (this.markers.hasOwnProperty(name)) {
                        const markerData = this.markers[name];
                        const icon = this._makeLeafletIcon(markerData.color, markerData.shape, markerData.size, markerData.strokeColor, markerData.strokeWeight, markerData.fillOpacity);
                        markerData.leafletMarker = L.marker([markerData.lat, markerData.lng], { icon: icon }).addTo(this.map);
                    }
                }
                this.setZoomControlPosition({ position: this.zoomControlPosition });
                this._boundKeyDownListener = (event) => {
                    if (event.key.toLowerCase() === this.fullscreenExitKey && this.isFullscreen) {
                        this.exitFullscreen();
                    }
                };
                document.addEventListener('keydown', this._boundKeyDownListener);
                this._setupModalInteractivity();
            }).catch(() => {});
        }
  
        closeMap() {
            if (this.isFullscreen) this.isFullscreen = false;
            if (this._boundKeyDownListener) {
                document.removeEventListener('keydown', this._boundKeyDownListener);
                this._boundKeyDownListener = null;
            }
            this._removeModalInteractivity();
            for (const name in this.markers) {
                if (this.markers.hasOwnProperty(name)) {
                    this.markers[name].leafletMarker = null;
                }
            }
            if (this.map) {
                this.map.remove();
                this.map = null;
                this.zoomControl = null;
            }
            if (this.modalContainer) {
                this.modalContainer.remove();
                this.modalContainer = null;
                this.mapElement = null;
            }
        }
  
        setMapView(args) {
            if (this.map) {
                this.map.setView([Cast.toNumber(args.lat), Cast.toNumber(args.lng)], Cast.toNumber(args.zoom));
            }
        }
  
        panTo(args) {
            if (this.map) {
                this.map.panTo([Cast.toNumber(args.lat), Cast.toNumber(args.lng)], { animate: true, duration: Cast.toNumber(args.duration) });
            }
        }
  
        getMapProperty(args) {
            if (!this.map) return (args.property === 'bounds (JSON)') ? '{}' : 0;
            switch (args.property) {
                case 'center latitude': return this.map.getCenter().lat;
                case 'center longitude': return this.map.getCenter().lng;
                case 'zoom level': return this.map.getZoom();
                case 'bounds (JSON)':
                    try {
                        const bounds = this.map.getBounds();
                        return JSON.stringify({ neLat: bounds.getNorthEast().lat, neLng: bounds.getNorthEast().lng, swLat: bounds.getSouthWest().lat, swLng: bounds.getSouthWest().lng });
                    } catch (e) { return '{}'; }
                default: return 0;
            }
        }
  
        changeMapLatitudeBy(args) {
            if (this.map) {
                const center = this.map.getCenter();
                this.map.setView([center.lat + Cast.toNumber(args.degrees), center.lng], this.map.getZoom());
            }
        }
  
        changeMapLongitudeBy(args) {
            if (this.map) {
                const center = this.map.getCenter();
                this.map.setView([center.lat, center.lng + Cast.toNumber(args.degrees)], this.map.getZoom());
            }
        }
  
        changeMapZoomBy(args) {
            if (this.map) {
                this.map.setZoom(this.map.getZoom() + Cast.toNumber(args.levels));
            }
        }
  
        _createMarkerIconSVG(color, shape, size, strokeColor, strokeWeight, fillOpacityPercent) {
            const s = Cast.toNumber(size);
            let svgContent = '';
            const sw = Cast.toNumber(strokeWeight);
            const effectiveStroke = sw > 0 ? strokeColor : 'none';
            const fillOp = Cast.toNumber(fillOpacityPercent) / 100;
            switch (shape) {
                case 'square':
                    svgContent = `<rect x="${sw / 2}" y="${sw / 2}" width="${s - sw}" height="${s - sw}" fill="${color}" stroke="${effectiveStroke}" stroke-width="${sw}" fill-opacity="${fillOp}"/>`;
                    break;
                case 'diamond':
                    svgContent = `<polygon points="${s / 2},${sw / 2} ${s - sw / 2},${s / 2} ${s / 2},${s - sw / 2} ${sw / 2},${s / 2}" fill="${color}" stroke="${effectiveStroke}" stroke-width="${sw}" fill-opacity="${fillOp}"/>`;
                    break;
                case 'pin':
                    const headRadius = s * 0.3;
                    const pinTipY = s - sw / 2;
                    const headCenterY = headRadius + sw / 2;
                    svgContent = `<path d="M${s / 2} ${pinTipY} L${s / 2 - headRadius * 0.6} ${headCenterY + headRadius * 0.4} A${headRadius} ${headRadius} 0 1 1 ${s / 2 + headRadius * 0.6} ${headCenterY + headRadius * 0.4} Z" fill="${color}" stroke="${effectiveStroke}" stroke-width="${sw}" fill-opacity="${fillOp}"/>`;
                    break;
                default:
                    svgContent = `<circle cx="${s / 2}" cy="${s / 2}" r="${s / 2 - sw / 2}" fill="${color}" stroke="${effectiveStroke}" stroke-width="${sw}" fill-opacity="${fillOp}"/>`;
                    break;
            }
            return `<svg width="${s}" height="${s}" viewBox="0 0 ${s} ${s}" xmlns="http://www.w3.org/2000/svg">${svgContent}</svg>`;
        }
  
        _makeLeafletIcon(color, shape, size, strokeColor, strokeWeight, fillOpacity) {
            const s = Cast.toNumber(size);
            return L.divIcon({
                className: 'custom-leaflet-div-icon',
                html: this._createMarkerIconSVG(color, shape, s, strokeColor, strokeWeight, fillOpacity),
                iconSize: [s, s],
                iconAnchor: (shape === 'pin') ? [s / 2, s] : [s / 2, s / 2]
            });
        }
  
        setMarker(args) {
            const name = Cast.toString(args.name).trim();
            if (!name || name === '_NO_MARKERS_') return;
            const markerData = {
                name: name,
                lat: Cast.toNumber(args.lat),
                lng: Cast.toNumber(args.lng),
                color: Cast.toString(args.color),
                shape: Cast.toString(args.shape),
                size: Cast.toNumber(args.size),
                strokeColor: Cast.toString(args.strokeColor),
                strokeWeight: Cast.toNumber(args.strokeWeight),
                fillOpacity: Cast.toNumber(args.fillOpacity),
                leafletMarker: (this.markers[name] && this.markers[name].leafletMarker) ? this.markers[name].leafletMarker : null
            };
            if (!this.markers.hasOwnProperty(name)) {
                this._emitWorkspaceUpdate();
            }
            this.markers[name] = markerData;
            if (this.map) {
                const icon = this._makeLeafletIcon(markerData.color, markerData.shape, markerData.size, markerData.strokeColor, markerData.strokeWeight, markerData.fillOpacity);
                if (markerData.leafletMarker) {
                    markerData.leafletMarker.setLatLng([markerData.lat, markerData.lng]);
                    markerData.leafletMarker.setIcon(icon);
                } else {
                    markerData.leafletMarker = L.marker([markerData.lat, markerData.lng], { icon: icon }).addTo(this.map);
                }
            }
        }
  
        removeMarkerDefinition(args) {
            const name = Cast.toString(args.name);
            if (name === '_NO_MARKERS_' || !this.markers.hasOwnProperty(name)) return;
            const markerData = this.markers[name];
            if (markerData.leafletMarker && this.map) {
                this.map.removeLayer(markerData.leafletMarker);
            }
            delete this.markers[name];
            this._emitWorkspaceUpdate();
        }
  
        removeAllMarkerDefinitions() {
            if (this.map) {
                for (const name in this.markers) {
                    if (this.markers.hasOwnProperty(name) && this.markers[name].leafletMarker) {
                        this.map.removeLayer(this.markers[name].leafletMarker);
                    }
                }
            }
            this.markers = {};
            this._emitWorkspaceUpdate();
        }
  
        clearMarkerFromMap(args) {
            const name = Cast.toString(args.name);
            if (name === '_NO_MARKERS_' || !this.markers.hasOwnProperty(name)) return;
            const markerData = this.markers[name];
            if (markerData.leafletMarker && this.map) {
                this.map.removeLayer(markerData.leafletMarker);
                markerData.leafletMarker = null;
            }
        }
  
        clearAllMarkersFromMap() {
            if (this.map) {
                for (const name in this.markers) {
                    if (this.markers.hasOwnProperty(name) && this.markers[name].leafletMarker) {
                        this.map.removeLayer(this.markers[name].leafletMarker);
                        this.markers[name].leafletMarker = null;
                    }
                }
            }
        }
  
        markerIsDefined(args) {
            const name = Cast.toString(args.name);
            return name !== '' && name !== '_NO_MARKERS_' && this.markers.hasOwnProperty(name);
        }
  
        isMarkerOnMap(args) {
            const name = Cast.toString(args.name);
            return name !== '' && name !== '_NO_MARKERS_' && this.markers.hasOwnProperty(name) && this.markers[name].leafletMarker !== null;
        }
  
        setTileLayer(args) {
            const layerName = Cast.toString(args.layer);
            const tileLayerUrls = {
                OSM: L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '© OSM' }),
                Sat: L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', { attribution: '© Esri' }),
                Dark: L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', { attribution: '© OSM,©CARTO' }),
                Light: L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', { attribution: '© OSM,©CARTO' }),
                Esri: L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', { attribution: '© Esri' }),
                Cyclo: L.tileLayer('https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png', { attribution: '© OSM,©CyclOSM' }),
                Hike: L.tileLayer('https://tileserver.memomaps.de/tilegen/{z}/{x}/{y}.png', { attribution: '© OSM,©HikeBike' })
            };
            const nameMap = { 'OpenStreetMap':'OSM', 'Satellite':'Sat', 'Dark':'Dark', 'Light':'Light', 'EsriWorldStreetMap':'Esri', 'CyclOSM':'Cyclo', 'HikeBike':'Hike' };
            if (this.map) {
                if (this.currentLayer) this.map.removeLayer(this.currentLayer);
                this.currentLayer = tileLayerUrls[nameMap[layerName]] || tileLayerUrls.OSM;
                this.currentLayer.addTo(this.map);
            }
        }
  
        yourLocation(args) {
            return new Promise(resolve => {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                        position => resolve(args.location === 'longitude' ? position.coords.longitude : position.coords.latitude),
                        () => resolve('')
                    );
                } else {
                    resolve('');
                }
            });
        }
  
        setMarkersFromList(args) {
            const listDataString = Cast.toString(args.list_data);
            let listData;
            try {
                listData = JSON.parse(listDataString);
            } catch (e) {
                return;
            }
            if (!Array.isArray(listData)) return;
            let newMarkersAdded = false;
            listData.forEach(item => {
                if (typeof item === 'object' && item !== null && item.name) {
                    const name = Cast.toString(item.name).trim();
                    if (!name) return;
                    const markerArgs = {
                        name: name,
                        lat: Cast.toNumber(item.lat || 0),
                        lng: Cast.toNumber(item.lng || 0),
                        color: Cast.toString(item.color || '#ff0000'),
                        shape: Cast.toString(item.shape || 'circle'),
                        size: Cast.toNumber(item.size || 20),
                        strokeColor: Cast.toString(item.strokeColor || '#000000'),
                        strokeWeight: Cast.toNumber(item.strokeWeight || 1),
                        fillOpacity: Cast.toNumber(item.fillOpacity || 100)
                    };
                    if (!this.markers.hasOwnProperty(name)) newMarkersAdded = true;
                    this.setMarker(markerArgs);
                }
            });
            if (newMarkersAdded) this._emitWorkspaceUpdate();
        }
  
        getAllDefinedMarkersAsList() {
            const markerList = [];
            for (const name in this.markers) {
                if (this.markers.hasOwnProperty(name)) {
                    const data = this.markers[name];
                    markerList.push({
                        name: name, lat: data.lat, lng: data.lng, color: data.color, shape: data.shape, size: data.size,
                        strokeColor: data.strokeColor, strokeWeight: data.strokeWeight, fillOpacity: data.fillOpacity
                    });
                }
            }
            return JSON.stringify(markerList);
        }
  
        importMarkersFromGeoJSON(args) {
            const geoJsonString = Cast.toString(args.geojson_string);
            let geoJsonData;
            try {
                geoJsonData = JSON.parse(geoJsonString);
            } catch (e) {
                return;
            }
            if (geoJsonData && geoJsonData.type === 'FeatureCollection' && Array.isArray(geoJsonData.features)) {
                let newMarkersAdded = false;
                geoJsonData.features.forEach((feature, index) => {
                    if (feature.type === 'Feature' && feature.geometry && feature.geometry.type === 'Point') {
                        const coordinates = feature.geometry.coordinates;
                        const properties = feature.properties || {};
                        const name = Cast.toString(properties.name || `gjson_m_${Date.now()}_${index}`).trim();
                        if (!name) return;
                        const markerArgs = {
                            name: name,
                            lat: Cast.toNumber(coordinates[1]),
                            lng: Cast.toNumber(coordinates[0]),
                            color: Cast.toString(properties.color || '#007bff'),
                            shape: Cast.toString(properties.shape || 'circle'),
                            size: Cast.toNumber(properties.size || 20),
                            strokeColor: Cast.toString(properties.strokeColor || '#000000'),
                            strokeWeight: Cast.toNumber(properties.strokeWeight || 1),
                            fillOpacity: Cast.toNumber(properties.fillOpacity || 100)
                        };
                        if (!this.markers.hasOwnProperty(name)) newMarkersAdded = true;
                        this.setMarker(markerArgs);
                    }
                });
                if (newMarkersAdded) this._emitWorkspaceUpdate();
            }
        }
  
        exportMarkersToGeoJSON() {
            const features = [];
            for (const name in this.markers) {
                if (this.markers.hasOwnProperty(name)) {
                    const data = this.markers[name];
                    features.push({
                        type: 'Feature',
                        geometry: { type: 'Point', coordinates: [data.lng, data.lat] },
                        properties: {
                            name: name, color: data.color, shape: data.shape, size: data.size,
                            strokeColor: data.strokeColor, strokeWeight: data.strokeWeight, fillOpacity: data.fillOpacity
                        }
                    });
                }
            }
            return JSON.stringify({ type: 'FeatureCollection', features: features });
        }
  
        setFrameSize(args) {
            this.frameWidth = Math.max(150, Cast.toNumber(args.width));
            this.frameHeight = Math.max(100, Cast.toNumber(args.height));
            if (this.modalContainer && !this.isFullscreen) this._updateModalAppearance();
        }
  
        setFrameStyle(args) {
            this.frameStyle = Cast.toString(args.style);
            if (this.modalContainer) this._updateModalAppearance();
        }
  
        setFrameBorder(args) {
            this.frameBorderColor = Cast.toString(args.color);
            this.frameBorderWidth = Math.max(0, Cast.toNumber(args.width));
            this.frameBorderStyle = Cast.toString(args.style);
            if (this.modalContainer) this._updateModalAppearance();
        }
  
        setFrameBorderRadius(args) {
            this.frameBorderRadius = Math.max(0, Cast.toNumber(args.radius));
            if (this.modalContainer) this._updateModalAppearance();
        }
  
        setCloseButtonLook(args) {
            this.closeButtonType = Cast.toString(args.type);
            this.closeButtonAligned = Cast.toString(args.alignment);
            if (this.modalContainer) {
                this._updateCloseButton();
                this._updateModalAppearance();
            }
        }
  
        setCloseButtonColors(args) {
            this.closeButtonBackground = Cast.toString(args.bgColor);
            this.closeButtonColor = Cast.toString(args.color);
            if (this.modalContainer) this._updateCloseButton();
        }
  
        setZoomButtonStyle(args) {
            this.zoomButtonBackground = Cast.toString(args.bgColor);
            this.zoomButtonColor = Cast.toString(args.color);
            this.zoomButtonSize = Math.max(20, Cast.toNumber(args.size));
            this._updateZoomControlsStyle();
        }
  
        setZoomControlPosition(args) {
            const newPosition = Cast.toString(args.position);
            if (this.zoomControlPosition === newPosition && this.zoomControl && newPosition !== 'none') return;
            this.zoomControlPosition = newPosition;
            if (this.zoomControl && this.map) {
                this.map.removeControl(this.zoomControl);
            }
            this.zoomControl = null;
            if (newPosition !== 'none' && this.map) {
                this.zoomControl = L.control.zoom({ position: this.zoomControlPosition }).addTo(this.map);
                this._updateZoomControlsStyle();
            }
        }
  
        _updateZoomControlsStyle() {
            if (!this.map || !this.zoomControl || !this.modalContainer) return;
            setTimeout(() => {
                const zoomElement = this.modalContainer.querySelector('.leaflet-control-zoom');
                if (!zoomElement) return;
                zoomElement.style.border = `1px solid ${this.zoomButtonColor === '#ffffff' ? '#ccc' : this.zoomButtonColor}`;
                zoomElement.style.borderRadius = '4px';
                zoomElement.querySelectorAll('a').forEach(button => {
                    Object.assign(button.style, {
                        backgroundColor: this.zoomButtonBackground, color: this.zoomButtonColor,
                        width: `${this.zoomButtonSize}px`, height: `${this.zoomButtonSize}px`,
                        lineHeight: `${this.zoomButtonSize}px`, fontSize: `${this.zoomButtonSize * 0.7}px`,
                        border: 'none', borderRadius: '2px'
                    });
                });
            }, 0);
        }
  
        resetStyles() {
            Object.assign(this, {
                frameStyle: '#ffffff', frameWidth: 600, frameHeight: 400,
                frameBorderColor: '#cccccc', frameBorderWidth: 1, frameBorderStyle: 'solid', frameBorderRadius: 10,
                closeButtonBackground: '#808080', closeButtonColor: '#000000', closeButtonAligned: 'right', closeButtonType: 'text',
                zoomButtonBackground: '#ffffff', zoomButtonColor: '#000000', zoomButtonSize: 30, zoomControlPosition: 'topright'
            });
            if (this.modalContainer && !this.isFullscreen) this._updateModalAppearance();
            this.setZoomControlPosition({ position: this.zoomControlPosition });
        }
  
        enterFullscreen() {
            if (!this.modalContainer) return;
            this.isFullscreen = true;
            Object.assign(this.modalContainer.style, { position: 'fixed', top: '0', left: '0', transform: 'none', width: '100vw', height: '100vh', borderRadius: '0', zIndex: '1001', cursor: 'default' });
            if (this.resizeHandle) this.resizeHandle.style.display = 'none';
            const closeButtonElement = this.modalContainer.querySelector('.leaflet-custom-close-button');
            const closeButtonHeight = this.closeButtonType === 'none' ? 0 : (closeButtonElement ? closeButtonElement.offsetHeight + 10 : 0);
            if (this.mapElement) Object.assign(this.mapElement.style, { width: '100%', height: `calc(100% - ${closeButtonHeight}px)` });
            if (this.map) setTimeout(() => this.map.invalidateSize(), 100);
        }
  
        exitFullscreen() {
            if (!this.modalContainer) return;
            this.isFullscreen = false;
            Object.assign(this.modalContainer.style, { position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', zIndex: '1000', cursor: 'grab' });
            if (this.resizeHandle) this.resizeHandle.style.display = 'block';
            this._updateModalAppearance();
            if (this.map) setTimeout(() => this.map.invalidateSize(), 100);
        }
  
        setFullscreenExitKey(args) {
            this.fullscreenExitKey = Cast.toString(args.key).toLowerCase();
        }
    }
  
    Scratch.extensions.register(new Leaflet());
  })(Scratch);