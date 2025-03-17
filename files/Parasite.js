(function(Scratch) {
  'use strict';

  class Parasite {
    getInfo() {
      return {
        id: 'parasite',
        name: 'Parasite',
        color1: '#ff4d4d',
        color2: '#cc0000',
        blocks: [
          {
            opcode: 'releaseSprite',
            blockType: Scratch.BlockType.COMMAND,
            text: 'release [SPRITE] from stage',
            arguments: {
              SPRITE: {
                type: Scratch.ArgumentType.STRING,
                menu: 'spriteMenu',
                defaultValue: 'Sprite1'
              }
            }
          },
          {
            opcode: 'cageSprite',
            blockType: Scratch.BlockType.COMMAND,
            text: 'cage [SPRITE]',
            arguments: {
              SPRITE: {
                type: Scratch.ArgumentType.STRING,
                menu: 'spriteMenu',
                defaultValue: 'Sprite1'
              }
            }
          },
          {
            opcode: 'cageAllSpritesButton',
            blockType: Scratch.BlockType.COMMAND,
            text: 'cage all sprites'
          },

          '---',

          {
            opcode: 'setParasiteSpeed',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set parasite speed to [SPEED]',
            arguments: {
              SPEED: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 2
              }
            }
          },

          {
            opcode: 'setCloneOnBounce',
            blockType: Scratch.BlockType.COMMAND,
            text: 'clone on bounce [TOGGLE]',
            arguments: {
              TOGGLE: {
                type: Scratch.ArgumentType.STRING,
                menu: 'toggleMenu',
                defaultValue: 'on'
              }
            }
          },
          {
            opcode: 'setMaxClones',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set max clones to [MAX_CLONES]',
            arguments: {
              MAX_CLONES: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 50
              }
            }
          },

          '---',

          {
            opcode: 'setGhostedClones',
            blockType: Scratch.BlockType.COMMAND,
            text: 'ghosted clones [TOGGLE]',
            arguments: {
              TOGGLE: {
                type: Scratch.ArgumentType.STRING,
                menu: 'toggleMenu',
                defaultValue: 'on'
              }
            }
          },
          {
            opcode: 'setClickToDelete',
            blockType: Scratch.BlockType.COMMAND,
            text: 'click to delete clones [TOGGLE]',
            arguments: {
              TOGGLE: {
                type: Scratch.ArgumentType.STRING,
                menu: 'toggleMenu',
                defaultValue: 'on'
              }
            }
          },
          {
            opcode: 'setDecayEnabled',
            blockType: Scratch.BlockType.COMMAND,
            text: 'decay [TOGGLE]',
            arguments: {
              TOGGLE: {
                type: Scratch.ArgumentType.STRING,
                menu: 'toggleMenu',
                defaultValue: 'on'
              }
            }
          },
          {
            opcode: 'setDecayTime',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set decay time to [DECAY]',
            arguments: {
              DECAY: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 5
              }
            }
          }
        ],
        menus: {
          spriteMenu: {
            acceptReporters: true,
            items: 'getSprites'
          },
          toggleMenu: {
            acceptReporters: false,
            items: ['on', 'off']
          }
        }
      };
    }

    constructor() {
      this.parasites = new Map();
      this.cloneOnBounceEnabled = false;
      this.clickToDeleteEnabled = false;
      this.ghostedClonesEnabled = false;
      this.decayEnabled = false;
      this.decayTime = 5;
      this.lastCloneTime = 0;
      this.parasiteSpeed = 2;
      this.cloneCooldown = 300;
      this.maxClones = 50;
    }

    setCloneOnBounce(args) {
      this.cloneOnBounceEnabled = args.TOGGLE === 'on';
    }

    setClickToDelete(args) {
      this.clickToDeleteEnabled = args.TOGGLE === 'on';
    }

    setGhostedClones(args) {
      this.ghostedClonesEnabled = args.TOGGLE === 'on';
      this._updateCloneGhosted();
    }

    setDecayEnabled(args) {
      this.decayEnabled = args.TOGGLE === 'on';
    }

    setDecayTime(args) {
      this.decayTime = Math.max(0, Number(args.DECAY));
    }

    setMaxClones(args) {
      this.maxClones = Math.max(1, Number(args.MAX_CLONES));
    }

    setParasiteSpeed(args) {
      this.parasiteSpeed = Math.max(0.1, Number(args.SPEED));
      for (const spriteName of this.parasites.keys()) {
        const parasiteData = this.parasites.get(spriteName);
        if (parasiteData) {
          parasiteData.speed = this.parasiteSpeed;
          const angle = Math.random() * Math.PI * 2;
          const speed = this.parasiteSpeed * (0.8 + Math.random() * 0.4);
          parasiteData.targetVelocityX = Math.cos(angle) * speed;
          parasiteData.targetVelocityY = Math.sin(angle) * speed;
          parasiteData.velocityX = parasiteData.targetVelocityX;
          parasiteData.velocityY = parasiteData.targetVelocityY;
          parasiteData.clones.forEach(cloneData => {
            cloneData.speed = this.parasiteSpeed;
            const cloneAngle = Math.random() * Math.PI * 2;
            const cloneSpeed = this.parasiteSpeed * (0.8 + Math.random() * 0.4);
            cloneData.targetVelocityX = Math.cos(cloneAngle) * cloneSpeed;
            cloneData.targetVelocityY = Math.sin(cloneAngle) * cloneSpeed;
            cloneData.velocityX = cloneData.targetVelocityX;
            cloneData.velocityY = cloneData.targetVelocityY;
          });
        }
      }
    }

    getSprites() {
      const sprites = Scratch.vm.runtime.targets
        .filter(target => target.isSprite && !target.isStage)
        .map(target => target.sprite.name);
      return sprites.length > 0 ? sprites : ['Sprite1'];
    }

    releaseSprite(args) {
      const spriteName = args.SPRITE;
      const sprite = this._getSpriteTarget(spriteName);
      if (!sprite || this.parasites.has(spriteName)) return;
      sprite.setVisible(false);
      const costumeDataURL = this._getCostumeDataURL(sprite);
      if (!costumeDataURL) {
        sprite.setVisible(true);
        return;
      }
      const parasite = document.createElement('img');
      parasite.src = costumeDataURL;
      Object.assign(parasite.style, {
        position: 'fixed',
        zIndex: '9999',
        pointerEvents: 'none'
      });
      const { pixelWidth, pixelHeight } = this._calculateSpriteSize(sprite);
      Object.assign(parasite.style, {
        width: `${pixelWidth}px`,
        height: `${pixelHeight}px`
      });
      const canvas = document.querySelector('canvas');
      if (!canvas) {
        sprite.setVisible(true);
        return;
      }
      const canvasRect = canvas.getBoundingClientRect();
      const originX = canvasRect.left + (sprite.x + 240) * (canvasRect.width / 480);
      const originY = canvasRect.top + (-sprite.y + 180) * (canvasRect.height / 360);
      const x = originX;
      const y = originY;
      Object.assign(parasite.style, {
        left: `${x}px`,
        top: `${y}px`
      });
      const angle = Math.random() * Math.PI * 2;
      const speed = this.parasiteSpeed * (0.8 + Math.random() * 0.4);
      const parasiteData = {
        element: parasite,
        sprite: sprite,
        originX: originX,
        originY: originY,
        state: 'wandering',
        x: x,
        y: y,
        velocityX: Math.cos(angle) * speed,
        velocityY: Math.sin(angle) * speed,
        targetVelocityX: Math.cos(angle) * speed,
        targetVelocityY: Math.sin(angle) * speed,
        direction: 1,
        width: pixelWidth,
        height: pixelHeight,
        lastDirectionChange: 0,
        momentum: 0,
        nextDirectionChange: Math.random() * 2000 + 1000,
        clones: [],
        lastCloneTime: 0,
        canClone: true,
        speed: this.parasiteSpeed,
        isClone: false,
        originalOpacity: 1,
        decayStartTime: null,
        parentIsMainClone: false
      };
      this.parasites.set(spriteName, parasiteData);
      parasite.onload = () => {
        document.body.appendChild(parasite);
        this._startParasiteAnimation(spriteName);
      };
      parasite.onerror = () => {
        parasite.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABPSURBVFhH7dKxDcAwDAOfoBVoA/W/2E8gYMDdo1esCIBhA2l4XbQDd4w+gBwAHIAcgByAHIAcgByAHIAcgByAHIAcgByAHIAcgByAHIAcgBz4A2WHB7sH6v6mAAAAAElFTkSuQmCC';
        document.body.appendChild(parasite);
        this._startParasiteAnimation(spriteName);
      };
    }

    cageSprite(args) {
      const spriteName = args.SPRITE;
      const parasiteData = this.parasites.get(spriteName);
      if (!parasiteData) return;
      parasiteData.state = 'returning';
      parasiteData.targetVelocityX = 0;
      parasiteData.targetVelocityY = 0;
      this.parasites.set(spriteName, parasiteData);
      parasiteData.clones.forEach(cloneData => {
        Object.assign(cloneData.element.style, {
          transition: 'opacity 0.5s',
          opacity: 0
        });
        setTimeout(() => {
          if (cloneData.element.parentNode) {
            cloneData.element.remove();
          }
        }, 500);
      });
      parasiteData.clones = [];
    }

    cageAllSpritesButton() {
      for (const spriteName of this.parasites.keys()) {
        this.cageSprite({ SPRITE: spriteName });
      }
    }

    _getSpriteTarget(spriteName) {
      return Scratch.vm.runtime.targets.find(
        target => target.sprite && target.sprite.name === spriteName
      );
    }

    _getCostumeDataURL(sprite) {
      if (!sprite || !sprite.getCostumes || sprite.getCostumes().length === 0) {
        return null;
      }
      const costume = sprite.getCostumes()[sprite.currentCostume];
      if (!costume || !costume.asset || !costume.asset.data) {
        return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABPSURBVFhH7dKxDcAwDAOfoBVoA/W/2E8gYMDdo1esCIBhA2l4XbQDd4w+gBwAHIAcgByAHIAcgByAHIAcgByAHIAcgByAHIAcgByAHIAcgBz4A2WHB7sH6v6mAAAAAElFTkSuQmCC';
      }
      const dataFormat = costume.asset.dataFormat || (costume.name.endsWith('.svg') ? 'svg' : 'png');
      let costumeDataURL;
      if (dataFormat === 'svg') {
        const svgString = new TextDecoder().decode(costume.asset.data);
        costumeDataURL = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgString);
      } else {
        const base64 = btoa(String.fromCharCode.apply(null, new Uint8Array(costume.asset.data)));
        costumeDataURL = `data:image/${dataFormat || 'png'};base64,${base64}`;
      }
      return costumeDataURL;
    }

    _calculateSpriteSize(sprite) {
      const costume = sprite.getCostumes()[sprite.currentCostume];
      const spriteScale = sprite.size || 100;
      const scale = spriteScale / 100;
      const baseWidth = costume.size ? costume.size[0] : (costume.rotationCenterX * 2) || 32;
      const baseHeight = costume.size ? costume.size[1] : (costume.rotationCenterY * 2) || 32;
      const bitmapResolution = costume.bitmapResolution || 1;
      const pixelWidth = baseWidth * scale * bitmapResolution;
      const pixelHeight = baseHeight * scale * bitmapResolution;
      return { pixelWidth, pixelHeight };
    }

    _updateCloneGhosted() {
      for (const spriteName of this.parasites.keys()) {
        const parasiteData = this.parasites.get(spriteName);
        if (parasiteData) {
          parasiteData.clones.forEach(cloneData => {
            cloneData.element.style.opacity = this.ghostedClonesEnabled ? 0.5 : 1;
          });
        }
      }
    }

    _startParasiteAnimation(spriteName) {
      let lastTime = performance.now();
      const animate = (currentTime) => {
        lastTime = currentTime;
        const parasiteData = this.parasites.get(spriteName);
        if (!parasiteData) return;
        const {
          element: parasite,
          sprite,
          originX,
          originY,
          state,
          width: parasiteWidth,
          height: parasiteHeight,
          nextDirectionChange,
          lastCloneTime,
          clones,
          speed: parasiteSpeed,
          canClone,
          isClone
        } = parasiteData;
        let {
          x, y,
          velocityX, velocityY,
          targetVelocityX, targetVelocityY,
          direction,
          lastDirectionChange,
          momentum
        } = parasiteData;
        const now = currentTime;

        if (state === 'wandering') {
          momentum = 0.8 + Math.random() * 0.4;
          if (now > lastDirectionChange + nextDirectionChange) {
            const angle = Math.random() * Math.PI * 2;
            const speed = parasiteSpeed * (0.8 + Math.random() * 0.4);
            targetVelocityX = Math.cos(angle) * speed;
            targetVelocityY = Math.sin(angle) * speed;
            if (Math.abs(targetVelocityX) > 0.5) {
              const newDirection = targetVelocityX > 0 ? 1 : -1;
              if (newDirection !== direction) {
                direction = newDirection;
                parasite.style.transform = direction > 0 ? 'scaleX(1)' : 'scaleX(-1)';
              }
            }
            lastDirectionChange = now;
            parasiteData.nextDirectionChange = Math.random() * 3500 + 1500;
          }
          if (Math.random() < 0.002) {
            const boostAngle = Math.random() * Math.PI * 2;
            const boostStrength = Math.random() * 2 + 2;
            targetVelocityX += Math.cos(boostAngle) * boostStrength;
            targetVelocityY += Math.sin(boostAngle) * boostStrength;
            if (Math.abs(Math.cos(boostAngle) * boostStrength) > 3) {
              const boostDir = Math.cos(boostAngle) > 0 ? 1 : -1;
              if (boostDir !== direction) {
                direction = boostDir;
                parasite.style.transform = direction > 0 ? 'scaleX(1)' : 'scaleX(-1)';
              }
            }
          }
          velocityX += (targetVelocityX - velocityX) * 0.1  * momentum;
          velocityY += (targetVelocityY - velocityY) * 0.1  * momentum;
        } else if (state === 'returning') {
          const dx = originX - x;
          const dy = originY - y;
          const distance = Math.hypot(dx, dy);
          if (distance < 3) {
            x = originX;
            y = originY;
            if (direction !== 1) {
              parasite.style.transform = 'scaleX(1)';
            }
            setTimeout(() => {
              parasite.remove();
              sprite.setVisible(true);
              this.parasites.delete(spriteName);
            }, 100);
            return;
          } else {
            const returnSpeed = Math.min(distance * 0.05, 3) ;
            const angle = Math.atan2(dy, dx);
            targetVelocityX = Math.cos(angle) * returnSpeed;
            targetVelocityY = Math.sin(angle) * returnSpeed;
            const newDirection = dx > 0 ? 1 : -1;
            if (newDirection !== direction) {
              direction = newDirection;
              parasite.style.transform = direction > 0 ? 'scaleX(1)' : 'scaleX(-1)';
            }
            velocityX += (targetVelocityX - velocityX) * 0.15 ;
            velocityY += (targetVelocityY - velocityY) * 0.15 ;
          }
        }
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        let cloned = false;
        if (!parasiteData.isClone) {
          if (x < 0) {
            if (this.cloneOnBounceEnabled && canClone && (currentTime - parasiteData.lastCloneTime > this.cloneCooldown)) {
              x = parasiteWidth * 0.2;
              this._cloneParasite(parasiteData, x, y);
              parasiteData.lastCloneTime = currentTime;
              parasiteData.canClone = false;
              cloned = true;
            }
            x = 0;
            targetVelocityX = Math.abs(targetVelocityX);
            velocityX = Math.abs(velocityX) * 0.5;
            direction = 1;
            parasite.style.transform = 'scaleX(1)';
          } else if (x > viewportWidth - parasiteWidth) {
            if (this.cloneOnBounceEnabled && canClone && (currentTime - parasiteData.lastCloneTime > this.cloneCooldown)) {
              x = viewportWidth - parasiteWidth * 0.8;
              this._cloneParasite(parasiteData, x, y);
              parasiteData.lastCloneTime = currentTime;
              parasiteData.canClone = false;
              cloned = true;
            }
            x = viewportWidth - parasiteWidth;
            targetVelocityX = -Math.abs(targetVelocityX);
            velocityX = -Math.abs(velocityX) * 0.5;
            direction = -1;
            parasite.style.transform = 'scaleX(-1)';
          }
          if (y < 0) {
            if (this.cloneOnBounceEnabled && canClone && (currentTime - parasiteData.lastCloneTime > this.cloneCooldown)) {
              y = parasiteHeight * 0.2;
              this._cloneParasite(parasiteData, x, y);
              parasiteData.lastCloneTime = currentTime;
              parasiteData.canClone = false;
              cloned = true;
            }
            y = 0;
            targetVelocityY = Math.abs(targetVelocityY);
            velocityY = Math.abs(velocityY) * 0.5;
          } else if (y > viewportHeight - parasiteHeight) {
            if (this.cloneOnBounceEnabled && canClone && (currentTime - parasiteData.lastCloneTime > this.cloneCooldown)) {
              y = viewportHeight - parasiteHeight * 0.8;
              this._cloneParasite(parasiteData, x, y);
              parasiteData.lastCloneTime = currentTime;
              parasiteData.canClone = false;
              cloned = true;
            }
            y = viewportHeight - parasiteHeight;
            targetVelocityY = -Math.abs(targetVelocityY);
            velocityY = -Math.abs(velocityY) * 0.5;
          }
        }
        if (!cloned) {
          parasiteData.canClone = true;
        }
        x += velocityX ;
        y += velocityY ;
        Object.assign(parasite.style, {
          left: `${x}px`,
          top: `${y}px`
        });

        parasiteData.clones.forEach(cloneData => {
          let {
            element: cloneParasite,
            x: cloneX, y: cloneY,
            velocityX: cloneVelocityX, velocityY: cloneVelocityY,
            targetVelocityX: cloneTargetVelocityX, targetVelocityY: cloneTargetVelocityY,
            direction: cloneDirection,
            lastDirectionChange: cloneLastDirectionChange,
            momentum: cloneMomentum,
            nextDirectionChange: cloneNextDirectionChange,
            speed: parasiteSpeed,
            decayStartTime: cloneDecayStartTime
          } = cloneData;
          let now = currentTime;

          if (this.decayEnabled && cloneDecayStartTime === null) {
            cloneData.decayStartTime = now;
          }

          if (this.decayEnabled && cloneDecayStartTime !== null) {
            const decayDuration = this.decayTime * 1000;
            if (now - cloneDecayStartTime > decayDuration) {
              Object.assign(cloneParasite.style, {
                transition: 'opacity 0.5s',
                opacity: 0
              });
              setTimeout(() => {
                if (cloneParasite.parentNode) {
                  cloneParasite.remove();
                  const index = parasiteData.clones.indexOf(cloneData);
                  if (index > -1) {
                    parasiteData.clones.splice(index, 1);
                  }
                }
              }, 500);
              return;
            }
          }

          cloneParasite.style.opacity = this.ghostedClonesEnabled ? 0.5 : 1;


          cloneMomentum = 0.8 + Math.random() * 0.4;
          if (now > cloneLastDirectionChange + cloneNextDirectionChange) {
            const angle = Math.random() * Math.PI * 2;
            const speed = parasiteSpeed * (0.8 + Math.random() * 0.4);
            cloneTargetVelocityX = Math.cos(angle) * speed;
            cloneTargetVelocityY = Math.sin(angle) * speed;
            if (Math.abs(cloneTargetVelocityX) > 0.5) {
              const newDirection = cloneTargetVelocityX > 0 ? 1 : -1;
              if (newDirection !== cloneDirection) {
                cloneDirection = newDirection;
                cloneParasite.style.transform = cloneDirection > 0 ? 'scaleX(1)' : 'scaleX(-1)';
              }
            }
            cloneLastDirectionChange = now;
            cloneData.nextDirectionChange = Math.random() * 3500 + 1500;
          }
          if (Math.random() < 0.002) {
            const boostAngle = Math.random() * Math.PI * 2;
            const boostStrength = Math.random() * 2 + 2;
            cloneTargetVelocityX += Math.cos(boostAngle) * boostStrength;
            cloneTargetVelocityY += Math.sin(boostAngle) * boostStrength;
            if (Math.abs(Math.cos(boostAngle) * boostStrength) > 3) {
              const boostDir = Math.cos(boostAngle) > 0 ? 1 : -1;
              if (boostDir !== cloneDirection) {
                cloneDirection = boostDir;
                cloneParasite.style.transform = cloneDirection > 0 ? 'scaleX(1)' : 'scaleX(-1)';
              }
            }
          }
          cloneVelocityX += (cloneTargetVelocityX - cloneVelocityX) * 0.1  * cloneMomentum;
          cloneVelocityY += (cloneTargetVelocityY - cloneVelocityY) * 0.1  * cloneMomentum;

          if (cloneX < 0) {
            cloneX = 0;
            cloneTargetVelocityX = Math.abs(cloneTargetVelocityX);
            cloneVelocityX = Math.abs(cloneVelocityX) * 0.5;
            cloneDirection = 1;
            cloneParasite.style.transform = 'scaleX(1)';
          } else if (cloneX > viewportWidth - parasiteWidth) {
            cloneX = viewportWidth - parasiteWidth;
            cloneTargetVelocityX = -Math.abs(cloneTargetVelocityX);
            cloneVelocityX = -Math.abs(cloneVelocityX) * 0.5;
            cloneDirection = -1;
            cloneParasite.style.transform = 'scaleX(-1)';
          }
          if (cloneY < 0) {
            cloneY = 0;
            cloneTargetVelocityY = Math.abs(cloneTargetVelocityY);
            cloneVelocityY = Math.abs(cloneVelocityY) * 0.5;
          } else if (cloneY > viewportHeight - parasiteHeight) {
            cloneY = viewportHeight - parasiteHeight;
            cloneTargetVelocityY = -Math.abs(cloneTargetVelocityY);
            cloneVelocityY = -Math.abs(cloneVelocityY) * 0.5;
          }
          cloneX += cloneVelocityX;
          cloneY += cloneVelocityY;

          Object.assign(cloneData, {
            x: cloneX,
            y: cloneY,
            velocityX: cloneVelocityX,
            velocityY: cloneVelocityY,
            targetVelocityX: cloneTargetVelocityX,
            targetVelocityY: cloneTargetVelocityY,
            direction: cloneDirection,
            lastDirectionChange: cloneLastDirectionChange
          });

          Object.assign(cloneParasite.style, {
            left: `${cloneX}px`,
            top: `${cloneY}px`
          });
        });

        Object.assign(this.parasites.get(spriteName), {
          x,
          y,
          velocityX,
          velocityY,
          targetVelocityX,
          targetVelocityY,
          direction,
          lastDirectionChange,
          lastCloneTime,
          canClone: parasiteData.canClone,
          momentum
        });
        requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    }

    _cloneParasite(parasiteData, x, y) {
      if (this.maxClones > 0 && parasiteData.clones.length >= this.maxClones) {
        return;
      }

      const { element: originalParasite } = parasiteData;
      const cloneParasite = originalParasite.cloneNode(true);
      Object.assign(cloneParasite.style, {
        position: 'fixed',
        zIndex: '9998',
        pointerEvents: 'auto',
        left: `${x}px`,
        top: `${y}px`,
        opacity: 0,
        transition: 'opacity 0.5s'
      });

      document.body.appendChild(cloneParasite);
      setTimeout(() => {
        cloneParasite.style.opacity = 1;
      }, 10);

      const cloneData = {
        element: cloneParasite,
        x: x,
        y: y,
        velocityX: 0,
        velocityY: 0,
        targetVelocityX: 0,
        targetVelocityY: 0,
        direction: 1,
        lastDirectionChange: 0,
        momentum: 0,
        nextDirectionChange: Math.random() * 2000 + 1000,
        isClone: true,
        lastCloneTime: 0,
        speed: parasiteData.speed,
        width: parasiteData.width,
        height: parasiteData.height,
        decayStartTime: this.decayEnabled ? performance.now() : null
      };
      cloneParasite.onclick = () => {
        Object.assign(cloneParasite.style, {
          transition: 'opacity 0.5s',
          opacity: 0
        });
        setTimeout(() => {
          if (cloneParasite.parentNode) {
            cloneParasite.remove();
            const index = parasiteData.clones.indexOf(cloneData);
            if (index > -1) {
              parasiteData.clones.splice(index, 1);
            }
          }
        }, 500);
      };
      parasiteData.clones.push(cloneData);
    }
  }

  Scratch.extensions.register(new Parasite());
})(Scratch);