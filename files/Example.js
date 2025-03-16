(function(Scratch) {
  'use strict';

  class WindowUtil {
    getInfo() {
      return {
        id: 'windowutil',
        name: 'WindowUtil',
        color1: '#4169E1',
        color2: '#3B5998',
        color3: '#2E4070',
        blocks: [
          {
            opcode: 'showToast',
            blockType: Scratch.BlockType.COMMAND,
            text: 'Show toast message [MESSAGE]',
            arguments: {
              MESSAGE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'Hello!'
              }
            }
          },
          {
            opcode: 'getDeviceInfo',
            blockType: Scratch.BlockType.REPORTER,
            text: 'Device [INFO]',
            arguments: {
              INFO: {
                type: Scratch.ArgumentType.STRING,
                menu: 'deviceInfoMenu',
                defaultValue: 'OS'
              }
            }
          },
          {
            opcode: 'getScreenWidth',
            blockType: Scratch.BlockType.REPORTER,
            text: 'Screen width'
          },
          {
            opcode: 'getScreenHeight',
            blockType: Scratch.BlockType.REPORTER,
            text: 'Screen height'
          },
          {
            opcode: 'getWindowWidth',
            blockType: Scratch.BlockType.REPORTER,
            text: 'Window width'
          },
          {
            opcode: 'getWindowHeight',
            blockType: Scratch.BlockType.REPORTER,
            text: 'Window height'
          },
          {
            opcode: 'setWindowTitle',
            blockType: Scratch.BlockType.COMMAND,
            text: 'Set window title to [TITLE]',
            arguments: {
              TITLE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'Scratch Project'
              }
            }
          },
          {
            opcode: 'openWebpage',
            blockType: Scratch.BlockType.COMMAND,
            text: 'Open webpage [URL]',
            arguments: {
              URL: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'https://example.com'
              }
            }
          },
          {
            opcode: 'getWindowPositionX',
            blockType: Scratch.BlockType.REPORTER,
            text: 'Window position x'
          },
          {
            opcode: 'getWindowPositionY',
            blockType: Scratch.BlockType.REPORTER,
            text: 'Window position y'
          },
          {
            opcode: 'getClipboardText',
            blockType: Scratch.BlockType.REPORTER,
            text: 'Clipboard text'
          },
          {
            opcode: 'setClipboardText',
            blockType: Scratch.BlockType.COMMAND,
            text: 'Set clipboard text to [TEXT]',
            arguments: {
              TEXT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: ''
              }
            }
          },
          {
            opcode: 'showAlert',
            blockType: Scratch.BlockType.COMMAND,
            text: 'Show alert message [MESSAGE]',
            arguments: {
              MESSAGE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'Alert!'
              }
            }
          },
          {
            opcode: 'getCurrentTimestamp',
            blockType: Scratch.BlockType.REPORTER,
            text: 'Current timestamp'
          },
          {
            opcode: 'fullscreenWindow',
            blockType: Scratch.BlockType.COMMAND,
            text: 'Fullscreen window'
          },
          {
            opcode: 'getScrollY',
            blockType: Scratch.BlockType.REPORTER,
            text: 'Scroll Y position'
          },
          {
            opcode: 'reloadPage',
            blockType: Scratch.BlockType.COMMAND,
            text: 'Reload page'
          },
          {
            opcode: 'getCurrentURL',
            blockType: Scratch.BlockType.REPORTER,
            text: 'Current URL'
          },
          {
            opcode: 'setWindowWidth',
            blockType: Scratch.BlockType.COMMAND,
            text: 'Set window width to [WIDTH]',
            arguments: {
              WIDTH: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 640
              }
            }
          },
          {
            opcode: 'setWindowHeight',
            blockType: Scratch.BlockType.COMMAND,
            text: 'Set window height to [HEIGHT]',
            arguments: {
              HEIGHT: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 480
              }
            }
          },
          {
            opcode: 'setWindowPositionX',
            blockType: Scratch.BlockType.COMMAND,
            text: 'Set window position X to [X]',
            arguments: {
              X: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0
              }
            }
          },
          {
            opcode: 'setWindowPositionY',
            blockType: Scratch.BlockType.COMMAND,
            text: 'Set window position Y to [Y]',
            arguments: {
              Y: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0
              }
            }
          },
          {
            opcode: 'minimizeWindow',
            blockType: Scratch.BlockType.COMMAND,
            text: 'Minimize window'
          },
          {
            opcode: 'maximizeWindow',
            blockType: Scratch.BlockType.COMMAND,
            text: 'Maximize window'
          }
        ],
        menus: {
          deviceInfoMenu: {
            acceptReporters: false,
            items: ['OS', 'CPU', 'Architecture', 'User Agent']
          }
        }
      };
    }

    showToast(args) {
      const message = args.MESSAGE;
      const toastDiv = document.createElement('div');
      toastDiv.textContent = message;
      toastDiv.style.position = 'fixed';
      toastDiv.style.bottom = '20px';
      toastDiv.style.left = '50%';
      toastDiv.style.transform = 'translateX(-50%)';
      toastDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
      toastDiv.style.color = 'white';
      toastDiv.style.padding = '10px 20px';
      toastDiv.style.borderRadius = '5px';
      toastDiv.style.zIndex = '1000';
      document.body.appendChild(toastDiv);

      setTimeout(() => {
        document.body.removeChild(toastDiv);
      }, 3000);
    }

    getDeviceInfo(args) {
      const infoType = args.INFO;
      switch (infoType) {
        case 'OS':
          return navigator.userAgentData?.platform || navigator.platform || 'Unknown OS';
        case 'CPU':
          return navigator.hardwareConcurrency + " cores" || 'Unknown CPU';
        case 'Architecture':
          return navigator.userAgentData?.architecture || 'Unknown Architecture';
        case 'User Agent':
          return navigator.userAgent;
        default:
          return 'Unknown Info';
      }
    }

    getScreenWidth() {
      return screen.width;
    }

    getScreenHeight() {
      return screen.height;
    }

    getWindowWidth() {
      return window.innerWidth;
    }

    getWindowHeight() {
      return window.innerHeight;
    }

    setWindowTitle(args) {
      const title = args.TITLE;
      document.title = title;
    }

    openWebpage(args) {
      const url = args.URL;
      window.open(url, '_blank');
    }

    getWindowPositionX() {
      return window.screenX;
    }

    getWindowPositionY() {
      return window.screenY;
    }

    getClipboardText() {
      return navigator.clipboard.readText().catch(() => '');
    }

    setClipboardText(args) {
      const text = args.TEXT;
      navigator.clipboard.writeText(text);
    }

    showAlert(args) {
      alert(args.MESSAGE);
    }

    getCurrentTimestamp() {
      return Date.now();
    }

    fullscreenWindow() {
      if (document.fullscreenEnabled) {
        document.documentElement.requestFullscreen();
      } else {
        console.warn('Fullscreen API is not supported in this browser.');
      }
    }

    getScrollY() {
      return window.scrollY;
    }

    reloadPage() {
      window.location.reload();
    }

    getCurrentURL() {
      return window.location.href;
    }

    setWindowWidth(args) {
      const width = args.WIDTH;
      window.resizeTo(width, window.outerHeight);
    }

    setWindowHeight(args) {
      const height = args.HEIGHT;
      window.resizeTo(window.outerWidth, height);
    }

    setWindowPositionX(args) {
      const x = args.X;
      window.moveTo(x, window.screenY);
    }

    setWindowPositionY(args) {
      const y = args.Y;
      window.moveTo(window.screenX, y);
    }

    minimizeWindow() {
      // This might not work in all environments, especially browser-based Scratch
      // It's highly dependent on the window manager/OS.
      // In a browser, you might need to close and reopen a tab/window, which is not ideal.
      // For desktop-based Scratch, this might be possible via Electron APIs if available.
      // As a fallback, we can try to blur the window, or move it off-screen slightly.
      window.blur(); // Try to blur the window as a simple "minimize" effect.
    }

    maximizeWindow() {
      // Similar limitations as minimizeWindow. True maximize might be OS-dependent.
      // For browsers, we can try to make the window fullscreen or restore it to its previous size if it was maximized before.
      if (document.fullscreenEnabled) {
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen(); // Go fullscreen as "maximize"
        } else {
          document.exitFullscreen(); // Exit fullscreen to "restore" if already fullscreen
        }
      } else {
        console.warn('Fullscreen API is not supported, maximizeWindow may not work as expected.');
        // Fallback: maybe resize to screen dimensions?
        window.resizeTo(screen.width, screen.height);
      }
    }
  }

  Scratch.extensions.register(new WindowUtil());
})(Scratch);
