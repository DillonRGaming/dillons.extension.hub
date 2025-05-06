(function(Scratch) {
  'use strict';

  const menuIconURI = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTMxIiBoZWlnaHQ9Ijk1NCIgdmlld0JveD0iMCAwIDkzMSA5NTQiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjQ2NS41IiBjeT0iNDY1LjUiIHI9IjQ2NS41IiBmaWxsPSIjMzE1NjUxIi8+CjxwYXRoIGQ9Ik0xOTMgMzc2TDI1Mi4wMzQgNTAxLjIxN0MzMzcuMTIyIDY4MS42OTggNTkzLjg3OCA2ODEuNjk4IDY3OC45NjYgNTAxLjIxN0w3MzggMzc2IiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjExMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+Cjwvc3ZnPgo=';

  const easing = {
    linear: (t) => t,

    quadIn: (t) => t * t,
    quadOut: (t) => t * (2 - t),
    quadInOut: (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),

    cubicIn: (t) => t * t * t,
    cubicOut: (t) => { t--; return t * t * t + 1; },
    cubicInOut: (t) => {
      if ((t /= 0.5) < 1) return 0.5 * t * t * t;
      return 0.5 * ((t -= 2) * t * t + 2);
    },

    sineIn: (t) => -Math.cos(t * Math.PI / 2) + 1,
    sineOut: (t) => Math.sin(t * Math.PI / 2),
    sineInOut: (t) => -0.5 * (Math.cos(Math.PI * t) - 1),

    expoIn: (t) => (t == 0 ? 0 : Math.pow(2, 10 * (t - 1))),
    expoOut: (t) => (t == 1 ? 1 : -Math.pow(2, -10 * t) + 1),
    expoInOut: (t) => {
      if (t === 0) return 0;
      if (t === 1) return 1;
      if ((t *= 2) < 1) return 0.5 * Math.pow(2, 10 * (t - 1));
      return 0.5 * (-Math.pow(2, -10 * (t - 1)) + 2);
    },

    circIn: (t) => -(Math.sqrt(1 - t * t) - 1),
    circOut: (t) => { t--; return Math.sqrt(1 - t * t); },
    circInOut: (t) => {
      if (t < 0.5) {
        const tt = t * 2;
        return -0.5 * (Math.sqrt(1 - tt * tt) - 1);
      } else {
        const tt = t * 2;
        const u = tt - 1;
        return 1 - 0.5 * Math.sqrt(1 - u * u);
      }
    },
  };

  const easeTypes = {
    'linear': 'linear',
    'quadratic': 'quad',
    'cubic': 'cubic',
    'sine': 'sine',
    'exponential': 'expo',
    'circular': 'circ',
  };

  const easeDirections = {
    'in': 'In',
    'out': 'Out',
    'in-out': 'InOut',
  };

  class TweenExtension {
    constructor(runtime) {
      this.runtime = runtime;
      this.tweens = {};
      this.tweenNames = [];

      this.createTween({ TWEEN_NAME: 'default' });
    }

    getInfo() {
      return {
        id: 'tween',
        name: 'Tween',
        menuIconURI: menuIconURI,
        blockIconURI: menuIconURI,
        color1: '#315651',
        color2: '#284843',
        blocks: [
          {
            opcode: 'createTween',
            blockType: Scratch.BlockType.COMMAND,
            text: 'create tween named [TWEEN_NAME]',
            arguments: {
              TWEEN_NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'my tween',
              },
            },
          },
          {
            opcode: 'deleteTween',
            blockType: Scratch.BlockType.COMMAND,
            text: 'delete tween named [TWEEN_NAME]',
            arguments: {
              TWEEN_NAME: {
                type: Scratch.ArgumentType.STRING,
                menu: 'tweenNameMenu',
                defaultValue: 'my tween',
              },
            },
          },
          {
            opcode: 'startTween',
            blockType: Scratch.BlockType.COMMAND,
            text: 'start tween [TWEEN_NAME] with [EASE_TYPE] ease [EASE_DIRECTION] from [START] to [END] in [DURATION] seconds',
            arguments: {
              TWEEN_NAME: {
                type: Scratch.ArgumentType.STRING,
                menu: 'tweenNameMenu',
                defaultValue: 'default',
              },
              EASE_TYPE: {
                type: Scratch.ArgumentType.STRING,
                menu: 'easeTypeMenu',
                defaultValue: 'linear',
              },
              EASE_DIRECTION: {
                type: Scratch.ArgumentType.STRING,
                menu: 'easeDirectionMenu',
                defaultValue: 'out',
              },
              START: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
              },
              END: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 100,
              },
              DURATION: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1,
              },
            },
          },
          {
            opcode: 'getCurrentTweenValue',
            blockType: Scratch.BlockType.REPORTER,
            blockShape: Scratch.BlockShape.LEAF,
            text: 'current value of tween [TWEEN_NAME]',
            disableMonitor: false,
            arguments: {
              TWEEN_NAME: {
                type: Scratch.ArgumentType.STRING,
                menu: 'tweenNameMenu',
                defaultValue: 'default',
              },
            },
          },
        ],
        menus: {
          easeTypeMenu: {
            acceptReporters: false,
            items: Object.keys(easeTypes),
          },
          easeDirectionMenu: {
            acceptReporters: false,
            items: Object.keys(easeDirections),
          },
          tweenNameMenu: 'getTweenNamesMenu',
        },
      };
    }

    getTweenNamesMenu() {
        return this.tweenNames.map(name => ({ text: name, value: name }));
    }

    createTween(args) {
      const name = Scratch.Cast.toString(args.TWEEN_NAME);
      if (!this.tweens[name]) {
        this.tweens[name] = {
          startTime: 0,
          duration: 0,
          startValue: 0,
          endValue: 0,
          easeFunction: easing.linear,
        };
        this.tweenNames.push(name);
      }
    }

    deleteTween(args) {
      const name = Scratch.Cast.toString(args.TWEEN_NAME);

      if (name === 'default') {
        return;
      }

      if (this.tweens[name]) {
        delete this.tweens[name];
        this.tweenNames = this.tweenNames.filter(tweenName => tweenName !== name);
      }
    }

    startTween(args) {
      const name = Scratch.Cast.toString(args.TWEEN_NAME);
      const state = this.tweens[name];

      if (!state) {
          return;
      }

      const easeTypeKey = args.EASE_TYPE;
      const easeDirectionKey = args.EASE_DIRECTION;
      const start = Scratch.Cast.toNumber(args.START);
      const end = Scratch.Cast.toNumber(args.END);
      const durationSeconds = Scratch.Cast.toNumber(args.DURATION);

      let easeFunctionName = easeTypes[easeTypeKey];
      if (easeTypeKey !== 'linear') {
        const directionSuffix = easeDirections[easeDirectionKey];
        if (directionSuffix) {
          easeFunctionName += directionSuffix;
        }
      } else {
          easeFunctionName = 'linear';
      }

      const selectedEaseFunction = easing[easeFunctionName] || easing.linear;

      state.startTime = Date.now();
      state.duration = durationSeconds * 1000;
      state.startValue = start;
      state.endValue = end;
      state.easeFunction = selectedEaseFunction;
    }

    getCurrentTweenValue(args) {
      const name = Scratch.Cast.toString(args.TWEEN_NAME);
      const state = this.tweens[name];

      if (!state) {
          return 0;
      }

      const { startTime, duration, startValue, endValue, easeFunction } = state;
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;

      if (duration <= 0) {
          return endValue;
      }

      let t = elapsed / duration;

      t = Math.max(0, Math.min(1, t));

      const easedT = easeFunction(t);

      const currentValue = startValue + (endValue - startValue) * easedT;

      return currentValue;
    }
  }

  Scratch.extensions.register(new TweenExtension());

})(Scratch);
