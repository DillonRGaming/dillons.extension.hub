(function(Scratch) {
  'use strict';

  class SpeechExtended {
    getInfo() {
      return {
        id: 'SpeechExtended',
        name: 'Speech Extended',
        blocks: [
          {
            opcode: 'sayText',
            blockType: Scratch.BlockType.COMMAND,
            text: 'say [TEXT]',
            arguments: {
              TEXT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'Hello!'
              }
            }
          },
          {
            opcode: 'sayTextForSeconds',
            blockType: Scratch.BlockType.COMMAND,
            text: 'say [TEXT] for [SECONDS] seconds',
            arguments: {
              TEXT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'Hello!'
              },
              SECONDS: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 3
              }
            }
          },
          {
            opcode: 'thinkText',
            blockType: Scratch.BlockType.COMMAND,
            text: 'think [TEXT]',
            arguments: {
              TEXT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'Hmm...'
              }
            }
          }
        ]
      };
    }

    sayText(args, util) {
      const text = args.TEXT;
      const target = util.target;
      if (!target) return;
      const stage = Scratch.vm.runtime.renderer.canvas.parentNode;
      if (!stage) return;
      this._showBubble(stage, target, text, 'speech');
    }

    sayTextForSeconds(args, util) {
      const text = args.TEXT;
      const seconds = args.SECONDS;
      const target = util.target;
      if (!target) return;
      const stage = Scratch.vm.runtime.renderer.canvas.parentNode;
      if (!stage) return;
      this._showBubble(stage, target, text, 'speech', seconds);
    }

    thinkText(args, util) {
      const text = args.TEXT;
      const target = util.target;
      if (!target) return;
      const stage = Scratch.vm.runtime.renderer.canvas.parentNode;
      if (!stage) return;
      this._showBubble(stage, target, text, 'thought');
    }

    _showBubble(stage, target, text, type, duration = 3) {
      const bubble = document.createElement('div');
      bubble.className = 'speech-bubble';
      bubble.textContent = text;

      Object.assign(bubble.style, {
        position: 'absolute',
        backgroundColor: 'white',
        color: 'black',
        border: '1px solid black',
        borderRadius: type === 'speech' ? '10px' : '20px',
        padding: '8px 12px',
        whiteSpace: 'nowrap',
        zIndex: '100',
        fontStyle: type === 'thought' ? 'italic' : 'normal'
      });

      const spriteBounds = target.getBounds();
      const stageRect = stage.getBoundingClientRect();
      const spriteRight = stageRect.left + spriteBounds.right;
      const spriteTop = stageRect.top + spriteBounds.top;

      bubble.style.left = `${spriteRight + 10}px`;
      bubble.style.top = `${spriteTop - bubble.offsetHeight / 2}px`;

      stage.appendChild(bubble);

      setTimeout(() => {
        if (stage.contains(bubble)) {
          stage.removeChild(bubble);
        }
      }, duration * 1000);
    }
  }

  Scratch.extensions.register(new SpeechExtended());
})(Scratch);
