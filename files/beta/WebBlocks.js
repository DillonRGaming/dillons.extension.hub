(function(Scratch) {
  'use strict';

  const svgIcon = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTU4IiBoZWlnaHQ9IjkzMSIgdmlld0JveD0iMCAwIDk1OCA5MzEiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjQ2NS41IiBjeT0iNDY1LjUiIHI9IjQ2NS41IiBmaWxsPSIjMzY0NTRGIi8+CjxwYXRoIGQ9Ik0zMzguMiAyMzMuMkMzNDEuNCAyMjkuNDY3IDM0NS45MzMgMjI3LjYgMzUxLjggMjI3LjZDMzU3LjY2NyAyMjcuNiAzNjYuMiAyMzAuMjY3IDM3Ny40IDIzNS42QzM4OS4xMzMgMjQwLjkzMyAzOTguNDY3IDI0OC40IDQwNS40IDI1OEM0MTIuODY3IDI2Ny42IDQxNi42IDI3NC44IDQxNi42IDI3OS42QzQxNi42IDI4My44NjcgNDE1IDI4Ny42IDQxMS44IDI5MC44TDI1MC4yIDQ3MEw0MTQuMiA2MzguOEM0MTcuNCA2NDIgNDE5IDY0NiA0MTkgNjUwLjhDNDE5IDY1NS4wNjcgNDE1LjI2NyA2NjIuMjY3IDQwNy44IDY3Mi40QzQwMC4zMzMgNjgyIDM5MSA2ODkuNDY3IDM3OS44IDY5NC44QzM2OC42IDY5OS42IDM2MC4wNjcgNzAyIDM1NC4yIDcwMkMzNDguODY3IDcwMiAzNDQuMzMzIDcwMC4xMzMgMzQwLjYgNjk2LjRMMTU1LjggNDkxLjZDMTQ4LjMzMyA0ODQuMTMzIDE0NC42IDQ3Ny40NjcgMTQ0LjYgNDcxLjZDMTQ0LjYgNDY1LjczMyAxNDcuMjY3IDQ2MC4xMzMgMTUyLjYgNDU0LjhMMzM4LjIgMjMzLjJaTTc5OC41IDQ1NC44QzgwMy44MzMgNDYwLjEzMyA4MDYuNSA0NjUuNzMzIDgwNi41IDQ3MS42QzgwNi41IDQ3Ny40NjcgODAyLjc2NyA0ODQuMTMzIDc5NS4zIDQ5MS42TDYxMC41IDY5Ni40QzYwNi43NjcgNzAwLjEzMyA2MDEuOTY3IDcwMiA1OTYuMSA3MDJDNTkwLjc2NyA3MDIgNTgyLjIzMyA2OTkuNiA1NzAuNSA2OTQuOEM1NTkuMyA2ODkuNDY3IDU0OS45NjcgNjgyIDU0Mi41IDY3Mi40QzUzNS41NjcgNjYyLjI2NyA1MzIuMSA2NTUuMDY3IDUzMi4xIDY1MC44QzUzMi4xIDY0NiA1MzMuNyA2NDIgNTM2LjkgNjM4LjhMNzAwLjkgNDcwTDUzOS4zIDI5MC44QzUzNi4xIDI4Ny42IDUzNC41IDI4My44NjcgNTM0LjUgMjc5LjZDNTM0LjUgMjc0LjggNTM3Ljk2NyAyNjcuNiA1NDQuOSAyNThDNTUyLjM2NyAyNDguNCA1NjEuNyAyNDEuMiA1NzIuOSAyMzYuNEM1ODQuNjMzIDIzMS4wNjcgNTkzLjE2NyAyMjguNCA1OTguNSAyMjguNEM2MDQuMzY3IDIyOC40IDYwOS4xNjcgMjMwIDYxMi45IDIzMy4yTDc5OC41IDQ1NC44WiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+Cg==";

  class WebBlocks {
    constructor() {
      this.container = null;
      this.scriptElement = null;
    }

    getInfo() {
      return {
        id: 'webblocks',
        name: 'WebBlocks',
        menuIconURI: svgIcon,
        blockIconURI: svgIcon,
        color1: '#36454F',
        blocks: [
          {
            opcode: 'displayHTML',
            blockType: Scratch.BlockType.COMMAND,
            text: 'display HTML [HTML]',
            arguments: {
              HTML: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '<h1>Hello World!</h1>'
              }
            }
          },
          {
            opcode: 'displayCSS',
            blockType: Scratch.BlockType.COMMAND,
            text: 'display CSS [CSS]',
            arguments: {
              CSS: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'h1 { color: red; }'
              }
            }
          },
          {
            opcode: 'runJS',
            blockType: Scratch.BlockType.COMMAND,
            text: 'run JS [JS]',
            arguments: {
              JS: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'console.log("Hello World!");'
              }
            }
          },
          {
            opcode: 'stopCode',
            blockType: Scratch.BlockType.BUTTON,
            text: 'Stop Code',
          }
        ]
      };
    }

    _ensureContainer() {
      if (!this.container) {
        this.container = document.createElement('div');
        this.container.style.position = 'absolute';
        this.container.style.top = '0';
        this.container.style.left = '0';
        this.container.style.width = '480px';
        this.container.style.height = '360px';
        this.container.style.overflow = 'hidden';
        this.container.style.pointerEvents = 'auto';
        this.container.style.zIndex = '1000';
        this.container.style.background = 'transparent';

        const stageWrapper = document.querySelector('[class^="stage_stage_"]');
        if (stageWrapper) {
          stageWrapper.appendChild(this.container);
        } else {
          console.error('Stage wrapper not found. Ensure unsandboxed mode and correct DOM structure.');
        }
      }
    }

    displayHTML(args) {
      this._ensureContainer();
      if (this.container) {
        this.container.innerHTML = args.HTML;
        this.container.style.pointerEvents = 'auto';
      }
    }

    displayCSS(args) {
      this._ensureContainer();
      if (this.container) {
        const existingStyle = this.container.querySelector('style');
        if (existingStyle) existingStyle.remove();
        const style = document.createElement('style');
        style.textContent = args.CSS;
        this.container.appendChild(style);
      }
    }

    runJS(args) {
      this._ensureContainer();
      setTimeout(() => {
        try {
          eval(args.JS);
        } catch (e) {
          console.error('JS Error:', e);
        }
      }, 100);
    }

    stopCode() {
      if (this.container) {
        this.container.remove();
        this.container = null;
        this.scriptElement = null;
      }
    }
  }

  Scratch.extensions.register(new WebBlocks());
})(Scratch);
