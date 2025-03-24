(function(Scratch) {
  'use strict';

  class Flashbang {
    getInfo() {
      return {
        id: 'flashbang',
        name: 'Flashbang',
        color1: '#2A4A41',
        color2: '#2A4A41',
        blocks: [
          {
            opcode: 'flash',
            blockType: Scratch.BlockType.COMMAND,
            text: 'flashbang for [DURATION] seconds',
            arguments: {
              DURATION: {
                type: Scratch.ArgumentType.STRING,
                menu: 'duration_options',
                defaultValue: '0.5',
              }
            }
          }
        ],
        menus: {
          duration_options: [
            '0.5', '1', '1.5', '2', '2.5', '3', '3.5', '4', '4.5', '5'
          ]
        }
      };
    }

    flash(args) {
      const durationSeconds = parseFloat(args.DURATION);
      const durationMs = durationSeconds * 1000;
      const darknessDurationSeconds = durationSeconds * 2;
      const darknessDurationMs = darknessDurationSeconds * 1000;

      const flashDiv = document.createElement('div');
      flashDiv.style.position = 'fixed';
      flashDiv.style.top = '0';
      flashDiv.style.left = '0';
      flashDiv.style.width = '100%';
      flashDiv.style.height = '100%';
      flashDiv.style.backgroundColor = 'white';
      flashDiv.style.zIndex = '10001';
      flashDiv.style.opacity = '1';
      flashDiv.style.transition = `opacity ${durationSeconds}s ease-in-out`;
      flashDiv.style.pointerEvents = 'none';

      const darknessDiv = document.createElement('div');
      darknessDiv.style.position = 'fixed';
      darknessDiv.style.top = '0';
      darknessDiv.style.left = '0';
      darknessDiv.style.width = '100%';
      darknessDiv.style.height = '100%';
      darknessDiv.style.backgroundColor = 'black';
      darknessDiv.style.zIndex = '10000';
      darknessDiv.style.opacity = '0';
      darknessDiv.style.transition = `opacity ${durationSeconds}s ease-in-out, opacity ${darknessDurationSeconds}s ease-in-out ${durationSeconds}s`;
      darknessDiv.style.pointerEvents = 'none';


      document.body.appendChild(darknessDiv);
      document.body.appendChild(flashDiv);


      darknessDiv.offsetHeight;
      flashDiv.offsetHeight;

      setTimeout(() => {
        flashDiv.style.opacity = '0';
        darknessDiv.style.opacity = '0.7';
      }, 10);

      setTimeout(() => {
        darknessDiv.style.opacity = '0';
        setTimeout(() => {
          document.body.removeChild(flashDiv);
          document.body.removeChild(darknessDiv);
        }, darknessDurationMs);
      }, durationMs + 10);
    }
  }

  Scratch.extensions.register(new Flashbang());
})(Scratch);
