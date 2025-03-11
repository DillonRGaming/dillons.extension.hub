(function(Scratch) {
    'use strict';
  
    class FormatNumbers {
      constructor() {
        this.useUppercase = false; // Default to lowercase
        this.decimalPlaces = 1; // Default decimal places
      }
  
      formatNumber(args) {
        let num = args.NUM;
        if (isNaN(num) || num < 1000) return num.toString(); // Return raw number if < 1000
  
        let suffixes = this.useUppercase ? ['K', 'M', 'B'] : ['k', 'm', 'b'];
        let decimalPlaces = this.decimalPlaces;
  
        function format(value, divisor, suffix) {
          let formatted = (value / divisor).toFixed(decimalPlaces);
          if (decimalPlaces === 0) formatted = Math.round(value / divisor); // Remove decimal if 0
          return formatted + suffix;
        }
  
        if (num >= 1_000_000_000) return format(num, 1_000_000_000, suffixes[2]);
        if (num >= 1_000_000) return format(num, 1_000_000, suffixes[1]);
        if (num >= 1_000) return format(num, 1_000, suffixes[0]);
  
        return num.toString();
      }
  
      setUppercase(args) {
        this.useUppercase = args.UPPERCASE === 'Uppercase';
      }
  
      setDecimalPlaces(args) {
        this.decimalPlaces = parseInt(args.DECIMALS);
      }
  
      getInfo() {
        return {
          id: "formatNumbers",
          name: "Format Numbers",
          color1: "#2ECC71", // Green theme
          color2: "#27AE60",
          blocks: [
            {
              opcode: "formatNumber",
              text: "format number [NUM]",
              blockType: Scratch.BlockType.REPORTER,
              arguments: {
                NUM: {
                  type: Scratch.ArgumentType.NUMBER,
                  defaultValue: 1000
                }
              }
            },
            {
              opcode: "setUppercase",
              text: "set format to [UPPERCASE]",
              blockType: Scratch.BlockType.COMMAND,
              arguments: {
                UPPERCASE: {
                  type: Scratch.ArgumentType.STRING,
                  menu: "caseOptions",
                  defaultValue: "Lowercase"
                }
              }
            },
            {
              opcode: "setDecimalPlaces",
              text: "set decimal places to [DECIMALS]",
              blockType: Scratch.BlockType.COMMAND,
              arguments: {
                DECIMALS: {
                  type: Scratch.ArgumentType.NUMBER,
                  menu: "decimalOptions",
                  defaultValue: 1
                }
              }
            }
          ],
          menus: {
            caseOptions: {
              acceptReporters: true,
              items: ["Lowercase", "Uppercase"]
            },
            decimalOptions: {
              acceptReporters: true,
              items: ["0", "1", "2"]
            }
          }
        };
      }
    }
  
    Scratch.extensions.register(new FormatNumbers());
  
  })(Scratch);
  