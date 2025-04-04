(function(Scratch) {
    'use strict';
  
    class SplitString {
      constructor() {}
  
      splitString(args) {
        const itemIndex = Scratch.Cast.toNumber(args.ITEM);
        const text = Scratch.Cast.toString(args.TEXT);
        const separator = Scratch.Cast.toString(args.SEPARATOR);
  
        const parts = text.split(separator);
  
        if (itemIndex >= 1 && itemIndex <= parts.length) {
          return parts[itemIndex - 1];
        } else {
          return '';
        }
      }
  
      getInfo() {
        return {
          id: 'splitstring',
          name: 'Split String',
          color1: '#0388fc',
          color2: '#4391b5',
          blocks: [
            {
              opcode: 'splitString',
              blockType: Scratch.BlockType.REPORTER,
              text: 'item [ITEM] of [TEXT] split by [SEPARATOR]',
              arguments: {
                ITEM: {
                  type: Scratch.ArgumentType.NUMBER,
                  defaultValue: 1
                },
                TEXT: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: 'hello/world'
                },
                SEPARATOR: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: '/'
                }
              }
            }
          ]
        };
      }
    }
  
    Scratch.extensions.register(new SplitString());
  })(Scratch);