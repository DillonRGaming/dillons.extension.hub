class WebBlocks {
  constructor() {
    this.container = null;
    this.scriptElement = null;
  }

  getInfo() {
    return {
      id: 'webblocks',
      name: 'WebBlocks',
      color1: '#36454F',

      blocks: [
        {
          opcode: 'runHTML',
          blockType: Scratch.BlockType.COMMAND,
          text: 'Run HTML [HTML]',
          arguments: {
            HTML: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: '<h1>Hello World!</h1>'
            }
          },
          color1: '#e34c26',
          color2: '#c44120',
          color3: '#9f3417',
        },
        {
          opcode: 'runCSS',
          blockType: Scratch.BlockType.COMMAND,
          text: 'Run CSS [CSS]',
          arguments: {
            CSS: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'h1 { color: red; }'
            }
          },
          color1: '#2965f1',
          color2: '#2053c5',
          color3: '#1a429c',
        },
        {
          opcode: 'runJS',
          blockType: Scratch.BlockType.COMMAND,
          text: 'Run JS [JS]',
          arguments: {
            JS: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'console.log("Hello World!");'
            }
          },
          color1: '#f4cf19',
          color2: '#d4b81a',
          color3: '#b09a15',
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

  runHTML(args) {
    this._ensureContainer();
    if (this.container) {
      this.container.innerHTML = args.HTML;
      this.container.style.pointerEvents = 'auto';
    }
  }

  runCSS(args) {
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
