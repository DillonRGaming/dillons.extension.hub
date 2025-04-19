(function(Scratch) {
  'use strict';

  const Cast = Scratch.Cast;

  const svgIcon = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTMxIiBoZWlnaHQ9IjkzMSIgdmlld0JveD0iMCAwIDkzMSA5MzEiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjQ2NS41IiBjeT0iNDY1LjUiIHI9IjQ2NS41IiBmaWxsPSIjNDE5ODczIi8+CjxwYXRoIGQ9Ik03MTIuMTk2IDYzNy45OTRMNDAyLjY0MiA4NDAuODU5TDQwMS4xMzMgNDk2Ljc1Mkw3MTIuMTk2IDYzNy45OTRaTTY5Ny42MDggMzE3Ljg3N0w2NjYuODM0IDMxNi45ODFMNjk3LjYwOCAzMTcuODc3Wk0zMTUuMzE2IDIzMC4xNzRDMjk4LjE5NiAyMzEuMDQ4IDI4NC45NTUgMjE4LjM2MyAyODUuNzQyIDIwMS44NEMyODYuNTI5IDE4NS4zMTcgMzAxLjA0NSAxNzEuMjEzIDMxOC4xNjUgMTcwLjMzOUwzMTUuMzE2IDIzMC4xNzRaTTQzMi4wOTYgNjk1LjYwNUMzNzMuODMzIDY5OS42MzIgMzE1LjY0OSA2OTcuOTIyIDI3My4xMzEgNjc0LjE0NUMyMjcuMDA5IDY0OC4zNTIgMjA1LjY1NSA2MDAuNzQ0IDIxMC45MTYgNTMwLjMyTDI3Mi44MTcgNTI4LjcyM0MyNjguNjY5IDU4NC4yNDIgMjg1LjE1MyA2MDguNzIyIDMwOC4wNzEgNjIxLjUzOEMzMzQuNTkyIDYzNi4zNjkgMzc2LjY0OSA2MzkuNzg4IDQzMy43ODMgNjM1LjgzOUw0MzIuMDk2IDY5NS42MDVaTTIxMC45MTYgNTMwLjMyQzIxMy4zMTkgNDk4LjE0OSAyMjMuMjkzIDQ3MC43NTkgMjQxLjU3NiA0NDguNzc5QzI1OS43NzMgNDI2LjkwMSAyODMuNjU3IDQxMy40NDMgMzA4LjU0NiA0MDUuMDc2QzM1Ni4yNzUgMzg5LjAzIDQxNi4xNjkgMzg5LjI1NyA0NjguNjk1IDM4OS40NDFDNTI0Ljc3NCAzODkuNjM4IDU3My44MjkgMzg5Ljg1MiA2MTAuODQ0IDM3OS4wNThDNjI4LjQ4OSAzNzMuOTEzIDY0MC43MzMgMzY2LjkzMiA2NDkuMDg1IDM1OC4yOTRDNjU3LjExNiAzNDkuOTg3IDY2NC4xMDEgMzM3LjUyMiA2NjYuODM0IDMxNi45ODFMNzI4LjM4MyAzMTguNzczQzcyNC4yMTcgMzUwLjA5IDcxMi4yOTggMzc2LjI5MyA2OTIuNDY0IDM5Ni44MDVDNjcyLjk1IDQxNi45ODYgNjQ4LjM2OCA0MjguOTc1IDYyMy4yNzEgNDM2LjI5M0M1NzQuODAzIDQ1MC40MjcgNTE0LjcxMyA0NDkuNTQzIDQ2Mi4zNDkgNDQ5LjM2QzQwNi40MzMgNDQ5LjE2MyAzNTguNTg3IDQ0OS43MjYgMzIzLjY0MiA0NjEuNDczQzMwNy4xOTUgNDY3LjAwMyAyOTYuMDA5IDQ3NC4zMDYgMjg4LjQ0OCA0ODMuMzk2QzI4MC45NzIgNDkyLjM4NCAyNzQuNTAxIDUwNi4xNjkgMjcyLjgxNyA1MjguNzIzTDIxMC45MTYgNTMwLjMyWk02NjYuODM0IDMxNi45ODFDNjcxLjI3NyAyODMuNTc4IDY2Mi4wMjcgMjY0LjI5OSA2NDYuNzIxIDI1MS4zN0M2MjkuNzY0IDIzNy4wNDYgNjAyLjA4MiAyMjcuODIxIDU2NC42MTMgMjIzLjM0MkM0ODguNzY4IDIxNC4yNzYgMzkzLjYzMSAyMjYuMTczIDMxNS4zMTYgMjMwLjE3NEwzMTguMTY1IDE3MC4zMzlDMzg4Ljg2NiAxNjYuNzI3IDQ5NS4yNjcgMTUzLjk1NSA1NzguMTUzIDE2My44NjNDNjIwLjA1IDE2OC44NzEgNjYxLjAzMyAxODAuMDQzIDY5MC4xMjMgMjA0LjYxNUM3MjAuODY0IDIzMC41ODIgNzM1LjA0MyAyNjguNjk3IDcyOC4zODMgMzE4Ljc3M0w2NjYuODM0IDMxNi45ODFaIiBmaWxsPSIjRjNGM0YzIi8+Cjwvc3ZnPgo="; 
  const arrowIcon = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDMzIiBoZWlnaHQ9IjM0NyIgdmlld0JveD0iMCAwIDQzMyAzNDciIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0yNDYuODcgMzQ3QzI3Ni45ODYgMzQ3IDM1Ni42NTMgMjc1LjQ1MyA0MTUuNTU4IDIxNi4yODNDNDM4LjI4NyAxOTMuNDUzIDQzNy44MTkgMTU2LjQ3MyA0MTUuMTIgMTMzLjYxNEMzNjIuNDk5IDgwLjYyMzUgMjc4LjQ3NSAwIDI0Ni44NyAwQzIyNy4wNTQgMCAyMjEuOTg3IDI0LjcwMTkgMjIyLjI1OSA1MS4yMzQ3QzIyMi42MTYgODYuMTExIDIwMC42MTEgMTE5LjExNCAxNjUuODY4IDEyMi4xNzZDODcuMDc1NCAxMjkuMTIxIDAgMTM1Ljc5MyAwIDE3NC43MkMwIDIxNS4zOTUgMTAwLjg2NCAyMjQuMTU0IDE3Ni45MjkgMjMzLjU0NUMyMDcuMzI0IDIzNy4yOTggMjI2LjA1OCAyNjQuNzg0IDIyNS4yNzUgMjk1LjRDMjI0LjU3OSAzMjIuNjA3IDIyOC40ODIgMzQ3IDI0Ni44NyAzNDdaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K';
  
  class FormatNumbers {
    constructor() {
      this.notation = "AD Standard";
      this.decimalPlaces = 2;
    }

    convertToADStandard(number, decimalPlaces = 2) {
        if (typeof number !== 'number' || isNaN(number)) {
            return "Invalid Input";
        }
    
        if (!isFinite(number)) {
            return number.toString();
        }
    
        if (number === 0) {
            return "0";
        }
    
        const kMBd = ["", "K", "M", "B", "T", "Qa", "Qt", "Sx", "Sp", "Oc", "No", "Dc"];
        const unitPrefixes = ["U", "D", "T", "Qa", "Qt", "Sx", "Sp", "O", "N"];
        const tensPrefixes = ["Dc", "Vg", "Tg", "Qd", "Qi", "Se", "St", "Og", "Nn"];
        const hundredsPrefixes = ["Ce", "Dn", "Tc", "Qe", "Qu", "Sc", "Si", "Oe", "Ne"];
        const tier2Illions = ["MI", "MC", "NA", "PC", "FM", "AT", "ZP"];
        const tier2Cutoff = 3003 * tier2Illions.length
        if (Math.log10(Math.abs(number)) > tier2Cutoff){
          return `Il(${number})`;
        }
    
    
    
        if (Math.abs(number) < 1000) {
            return number.toFixed(decimalPlaces).replace(/\.?0+$/, "");
        }
    
        const tier = Math.max(0, Math.floor(Math.log10(Math.abs(number)) / 3));
    
    
        if (tier <= 11) {
            const scaledNumber = number / Math.pow(10, tier * 3);
            return scaledNumber.toFixed(decimalPlaces).replace(/\.?0+$/, "") + kMBd[tier];
        }
    
    
        const illionNumber = Math.floor(Math.log10(Math.abs(number)) / 3);
        let illionString = "";
    
        if (illionNumber <= 999) {
            const hundreds = Math.floor(illionNumber / 100);
            const tens = Math.floor((illionNumber % 100) / 10);
            const units = illionNumber % 10;
    
            illionString = (hundreds > 0 ? hundredsPrefixes[hundreds - 1] : "") +
                          (tens > 0 ? tensPrefixes[tens - 1] : "") +
                          (units > 0 ? unitPrefixes[units - 1] : "");
        } else {
            const tier2Index = Math.floor(illionNumber / 1000);
            const tier2Remainder = illionNumber % 1000;
    
            if (tier2Index <= tier2Illions.length) {
              illionString = tier2Illions[tier2Index-1];
    
            } else {
    
              return `Il(${number})`;
            }
    
            if (tier2Remainder > 0) {
    
              const hundreds = Math.floor(tier2Remainder / 100);
              const tens = Math.floor((tier2Remainder % 100) / 10);
              const units = tier2Remainder % 10;
    
              const remainderString = (hundreds > 0 ? hundredsPrefixes[hundreds - 1] : "") +
                                    (tens > 0 ? tensPrefixes[tens - 1] : "") +
                                    (units > 0 ? unitPrefixes[units - 1] : "");
              illionString = remainderString + "-" + illionString;
            }
    
    
    
        }
    
        const scaledNumber = number / Math.pow(10, Math.floor(Math.log10(Math.abs(number)) / 3) * 3);
        return scaledNumber.toFixed(decimalPlaces).replace(/\.?0+$/, "") + " " + illionString;
    
    }

    convertToCommaSeparated(number, decimalPlaces = 2) {
      return number.toFixed(decimalPlaces).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    }

    convertToScientificNotation(number, decimalPlaces = 2) {
      return number.toExponential(decimalPlaces);
    }

    formatNumber(args) {
      switch (args.NOTATION) {
        case 'AD Standard':
          return this.convertToADStandard(args.NUM, args.DECIMALS);
        case 'Comma Separated':
          return this.convertToCommaSeparated(args.NUM, args.DECIMALS);
        case 'Scientific Notation':
          return this.convertToScientificNotation(args.NUM, args.DECIMALS);
        default:
          return args.NUM.toFixed(args.DECIMALS);
      }
    }

    getInfo() {
      return {
        id: "formatNumbers",
        name: "FormatNumbers",
        menuIconURI: svgIcon,
        blockIconURI: svgIcon,
        color1: "#419873",
        color2: "#277B58",
        blocks: [
          {
            opcode: "formatNumber",
            text: "format number [NUM] [ARROW] [NOTATION] with [DECIMALS] decimal places",
            blockType: Scratch.BlockType.REPORTER,
            blockShape: Scratch.BlockShape.LEAF,
            arguments: {
              NUM: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1000
              },
              NOTATION: {
                type: Scratch.ArgumentType.STRING,
                menu: "notationOptions",
                defaultValue: "AD Standard"
              },
              DECIMALS: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 2
              },
              ARROW: {
                type: Scratch.ArgumentType.IMAGE,
                dataURI: arrowIcon,
                width: 20,
                height: 20
              }
            }
          }
        ],
        menus: {
          notationOptions: {
            acceptReporters: false,
            items: ["AD Standard", "Fixed Decimal", "Comma Separated", "Scientific Notation"]
          }
        },
        
      };
    }
  }

  Scratch.extensions.register(new FormatNumbers());

})(Scratch);