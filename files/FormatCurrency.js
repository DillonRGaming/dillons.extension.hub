(function(Scratch) {
    'use strict';
  
    const icon = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTMxIiBoZWlnaHQ9IjkzMSIgdmlld0JveD0iMCAwIDkzMSA5MzEiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjQ2NS41IiBjeT0iNDY1LjUiIHI9IjQ2NS41IiBmaWxsPSIjNjVDOTQzIi8+CjxwYXRoIGQ9Ik03MTIuMTk2IDYzNy45OTRMNDAyLjY0MiA4NDAuODU5TDQwMS4xMzMgNDk2Ljc1Mkw3MTIuMTk2IDYzNy45OTRaTTY5Ny42MDggMzE3Ljg3N0w2NjYuODM0IDMxNi45ODFMNjk3LjYwOCAzMTcuODc3Wk0zMTUuMzE2IDIzMC4xNzRDMjk4LjE5NiAyMzEuMDQ4IDI4NC45NTUgMjE4LjM2MyAyODUuNzQyIDIwMS44NEMyODYuNTI5IDE4NS4zMTcgMzAxLjA0NSAxNzEuMjEzIDMxOC4xNjUgMTcwLjMzOUwzMTUuMzE2IDIzMC4xNzRaTTQzMi4wOTYgNjk1LjYwNUMzNzMuODMzIDY5OS42MzIgMzE1LjY0OSA2OTcuOTIyIDI3My4xMzEgNjc0LjE0NUMyMjcuMDA5IDY0OC4zNTIgMjA1LjY1NSA2MDAuNzQ0IDIxMC45MTYgNTMwLjMyTDI3Mi44MTcgNTI4LjcyM0MyNjguNjY5IDU4NC4yNDIgMjg1LjE1MyA2MDguNzIyIDMwOC4wNzEgNjIxLjUzOEMzMzQuNTkyIDYzNi4zNjkgMzc2LjY0OSA2MzkuNzg4IDQzMy43ODMgNjM1LjgzOUw0MzIuMDk2IDY5NS42MDVaTTIxMC45MTYgNTMwLjMyQzIxMy4zMTkgNDk4LjE0OSAyMjMuMjkzIDQ3MC43NTkgMjQxLjU3NiA0NDguNzc5QzI1OS43NzMgNDI2LjkwMSAyODMuNjU3IDQxMy40NDMgMzA4LjU0NiA0MDUuMDc2QzM1Ni4yNzUgMzg5LjAzIDQxNi4xNjkgMzg5LjI1NyA0NjguNjk1IDM4OS40NDFDNTI0Ljc3NCAzODkuNjM4IDU3My44MjkgMzg5Ljg1MiA2MTAuODQ0IDM3OS4wNThDNjI4LjQ4OSAzNzMuOTEzIDY0MC43MzMgMzY2LjkzMiA2NDkuMDg1IDM1OC4yOTRDNjU3LjExNiAzNDkuOTg3IDY2NC4xMDEgMzM3LjUyMiA2NjYuODM0IDMxNi45ODFMNzI4LjM4MyAzMTguNzczQzcyNC4yMTcgMzUwLjA5IDcxMi4yOTggMzc2LjI5MyA2OTIuNDY0IDM5Ni44MDVDNjcyLjk1IDQxNi45ODYgNjQ4LjM2OCA0MjguOTc1IDYyMy4yNzEgNDM2LjI5M0M1NzQuODAzIDQ1MC40MjcgNTE0LjcxMyA0NDkuNTQzIDQ2Mi4zNDkgNDQ5LjM2QzQwNi40MzMgNDQ5LjE2MyAzNTguNTg3IDQ0OS43MjYgMzIzLjY0MiA0NjEuNDczQzMwNy4xOTUgNDY3LjAwMyAyOTYuMDA5IDQ3NC4zMDYgMjg4LjQ0OCA0ODMuMzk2QzI4MC45NzIgNDkyLjM4NCAyNzQuNTAxIDUwNi4xNjkgMjcyLjgxNyA1MjguNzIzTDIxMC45MTYgNTMwLjMyWk02NjYuODM0IDMxNi45ODFDNjcxLjI3NyAyODMuNTc4IDY2Mi4wMjcgMjY0LjI5OSA2NDYuNzIxIDI1MS4zN0M2MjkuNzY0IDIzNy4wNDYgNjAyLjA4MiAyMjcuODIxIDU2NC42MTMgMjIzLjM0MkM0ODguNzY4IDIxNC4yNzYgMzkzLjYzMSAyMjYuMTczIDMxNS4zMTYgMjMwLjE3NEwzMTguMTY1IDE3MC4zMzlDMzg4Ljg2NiAxNjYuNzI3IDQ5NS4yNjcgMTUzLjk1NSA1NzguMTUzIDE2My44NjNDNjIwLjA1IDE2OC44NzEgNjYxLjAzMyAxODAuMDQzIDY5MC4xMjMgMjA0LjYxNUM3MjAuODY0IDIzMC41ODIgNzM1LjA0MyAyNjguNjk3IDcyOC4zODMgMzE4Ljc3M0w2NjYuODM0IDMxNi45ODFaIiBmaWxsPSIjRjNGM0YzIi8+Cjwvc3ZnPgo=';
    const arrowIcon = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDMzIiBoZWlnaHQ9IjM0NyIgdmlld0JveD0iMCAwIDQzMyAzNDciIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0yNDYuODcgMzQ3QzI3Ni45ODYgMzQ3IDM1Ni42NTMgMjc1LjQ1MyA0MTUuNTU4IDIxNi4yODNDNDM4LjI4NyAxOTMuNDUzIDQzNy44MTkgMTU2LjQ3MyA0MTUuMTIgMTMzLjYxNEMzNjIuNDk5IDgwLjYyMzUgMjc4LjQ3NSAwIDI0Ni44NyAwQzIyNy4wNTQgMCAyMjEuOTg3IDI0LjcwMTkgMjIyLjI1OSA1MS4yMzQ3QzIyMi42MTYgODYuMTExIDIwMC42MTEgMTE5LjExNCAxNjUuODY4IDEyMi4xNzZDODcuMDc1NCAxMjkuMTIxIDAgMTM1Ljc5MyAwIDE3NC43MkMwIDIxNS4zOTUgMTAwLjg2NCAyMjQuMTU0IDE3Ni45MjkgMjMzLjU0NUMyMDcuMzI0IDIzNy4yOTggMjI2LjA1OCAyNjQuNzg0IDIyNS4yNzUgMjk1LjRDMjI0LjU3OSAzMjIuNjA3IDIyOC40ODIgMzQ3IDI0Ni44NyAzNDdaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K';
  
    class FormatCurrency {
      getInfo() {
        return {
          id: 'FormatCurrency',
          name: 'FormatCurrency',
          menuIconURI: icon,
          blockIconURI: icon,
          color1: '#65C943',
          color2: '#60AC47',
          blocks: [
            {
              opcode: 'convertCurrency',
              blockType: Scratch.BlockType.REPORTER,
              blockShape: Scratch.BlockShape.LEAF,
              text: 'convert [NUMBER]  [FROM_CURRENCY] [ARROW] [TO_CURRENCY] with [DECIMAL_PLACES] decimals [SYMBOL_DISPLAY]',
              arguments: {
                NUMBER: {
                  type: Scratch.ArgumentType.NUMBER,
                  defaultValue: 10
                },
                FROM_CURRENCY: {
                  type: Scratch.ArgumentType.STRING,
                  menu: 'currencies'
                },
                ARROW: {
                  type: Scratch.ArgumentType.IMAGE,
                  dataURI: arrowIcon,
                  width: 20,
                  height: 20
                },
                TO_CURRENCY: {
                  type: Scratch.ArgumentType.STRING,
                  menu: 'currencies'
                },
                DECIMAL_PLACES: {
                  type: Scratch.ArgumentType.NUMBER,
                  defaultValue: 2
                },
                SYMBOL_DISPLAY: {
                  type: Scratch.ArgumentType.STRING,
                  menu: 'symbolDisplay',
                  defaultValue: 'with symbol'
                }
              }
            }
          ],
          menus: {
            currencies: {
              acceptReporters: true,
              items: [
                { text: 'USD $', value: 'USD' },
                { text: 'EUR €', value: 'EUR' },
                { text: 'GBP £', value: 'GBP' },
                { text: 'JPY ¥', value: 'JPY' },
                { text: 'CAD $', value: 'CAD' },
                { text: 'AUD $', value: 'AUD' },
                { text: 'CHF ₣', value: 'CHF' },
                { text: 'CNY ¥', value: 'CNY' },
                { text: 'INR ₹', value: 'INR' },
                { text: 'BRL R$', value: 'BRL' },
                { text: 'KRW ₩', value: 'KRW' },
                { text: 'RUB ₽', value: 'RUB' },
                { text: 'MXN $', value: 'MXN' },
                { text: 'ZAR R', value: 'ZAR' },
                { text: 'HKD $', value: 'HKD' },
                { text: 'SGD $', value: 'SGD' },
                { text: 'NZD $', value: 'NZD' },
                { text: 'SEK kr', value: 'SEK' },
                { text: 'NOK kr', value: 'NOK' },
                { text: 'DKK kr', value: 'DKK' },
                { text: 'AED د.إ', value: 'AED' },
                { text: 'SAR ر.س', value: 'SAR' },
                { text: 'TRY ₺', value: 'TRY' },
                { text: 'IDR Rp', value: 'IDR' },
                { text: 'THB ฿', value: 'THB' },
                { text: 'PLN zł', value: 'PLN' },
                { text: 'HUF Ft', value: 'HUF' },
                { text: 'CZK Kč', value: 'CZK' },
                { text: 'ILS ₪', value: 'ILS' },
                { text: 'CLP $', value: 'CLP' },
                { text: 'PHP ₱', value: 'PHP' },
                { text: 'MYR RM', value: 'MYR' },
                { text: 'COP $', value: 'COP' },
                { text: 'RON lei', value: 'RON' },
                { text: 'ARS $', value: 'ARS' },
                { text: 'PEN S/', value: 'PEN' },
                { text: 'EGP £', value: 'EGP' },
                { text: 'VND ₫', value: 'VND' },
                { text: 'NGN ₦', value: 'NGN' },
                { text: 'BDT ৳', value: 'BDT' },
                { text: 'UAH ₴', value: 'UAH' },
                { text: 'PKR ₨', value: 'PKR' },
                { text: 'DOP RD$', value: 'DOP' },
                { text: 'LKR ₨', value: 'LKR' },
                { text: 'IRR ﷼', value: 'IRR' },
                { text: 'ETB Br', value: 'ETB' },
                { text: 'KES KSh', value: 'KES' },
                { text: 'UZS soʻm', value: 'UZS' }
              ]
            },
            symbolDisplay: {
              acceptReporters: false,
              items: [
                { text: 'with symbol', value: 'with symbol' },
                { text: 'without symbol', value: 'without symbol' }
              ]
            }
          }
        };
      }
  
      convertCurrency(args) {
        const number = args.NUMBER;
        const fromCurrencyCode = args.FROM_CURRENCY;
        const toCurrencyCode = args.TO_CURRENCY;
        const symbolDisplay = args.SYMBOL_DISPLAY;
        const decimalPlaces = args.DECIMAL_PLACES;
  
        const exchangeRates = {
          'USD': 1,
          'EUR': 0.94,
          'GBP': 0.80,
          'JPY': 150.20,
          'CAD': 1.38,
          'AUD': 1.55,
          'CHF': 0.90,
          'CNY': 7.24,
          'INR': 83.60,
          'BRL': 5.10,
          'KRW': 1350.75,
          'RUB': 94.50,
          'MXN': 17.30,
          'ZAR': 19.10,
          'HKD': 7.85,
          'SGD': 1.36,
          'NZD': 1.67,
          'SEK': 11.00,
          'NOK': 11.10,
          'DKK': 7.00,
          'AED': 3.67,
          'SAR': 3.75,
          'TRY': 32.50,
          'IDR': 15800.00,
          'THB': 36.20,
          'PLN': 4.10,
          'HUF': 350.00,
          'CZK': 22.50,
          'ILS': 3.75,
          'CLP': 870.00,
          'PHP': 56.50,
          'MYR': 4.80,
          'COP': 4100.00,
          'RON': 4.60,
          'ARS': 850.00,
          'PEN': 3.85,
          'EGP': 48.50,
          'VND': 24000.00,
          'NGN': 1050.00,
          'BDT': 110.00,
          'UAH': 39.50,
          'PKR': 280.00,
          'DOP': 59.00,
          'LKR': 300.00,
          'IRR': 42000.00,
          'ETB': 57.00,
          'KES': 130.00,
          'UZS': 12600.00
        };
  
        if (!exchangeRates[fromCurrencyCode] || !exchangeRates[toCurrencyCode]) {
          return 'Invalid Currency Code';
        }
  
        const usdValue = number / exchangeRates[fromCurrencyCode];
        const convertedValue = usdValue * exchangeRates[toCurrencyCode];
  
        if (symbolDisplay === 'with symbol') {
          const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: toCurrencyCode,
            minimumFractionDigits: decimalPlaces,
            maximumFractionDigits: decimalPlaces
          });
          return formatter.format(convertedValue);
        } else {
          const formatter = new Intl.NumberFormat('en-US', {
            style: 'decimal',
            minimumFractionDigits: decimalPlaces,
            maximumFractionDigits: decimalPlaces
          });
          return formatter.format(convertedValue);
        }
      }
    }
  
    Scratch.extensions.register(new FormatCurrency());
  })(Scratch);