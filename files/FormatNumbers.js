(function(Scratch) {
  'use strict';

  const Cast = Scratch.Cast;

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
        name: "Format Numbers",
        color1: "#2ECC71",
        color2: "#27AE60",
        blocks: [
          {
            opcode: "formatNumber",
            text: "format number [NUM] to notation [NOTATION] with [DECIMALS] decimal places",
            blockType: Scratch.BlockType.REPORTER,
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
              }
            }
          }
        ],
        menus: {
          notationOptions: {
            acceptReporters: false,
            items: ["AD Standard", "Fixed Decimal", "Comma Separated", "Scientific Notation"]
          }
        }
      };
    }
  }

  Scratch.extensions.register(new FormatNumbers());

})(Scratch);