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
            }
          ],
          menus: {
            spriteMenu: {
              acceptReporters: true,
              items: 'getSprites'
            }
          }
        };
      }
  
      constructor() {
        this.parasites = new Map();
        this.lastTime = performance.now();
      }
  
      getSprites() {
        const sprites = Scratch.vm.runtime.targets
          .filter(target => target.isSprite && !target.isStage)
          .map(target => target.sprite.name);
        return sprites.length > 0 ? sprites : ['Sprite1'];
      }
  
      releaseSprite(args, util) {
        const spriteName = args.SPRITE;
        const sprite = this._getSpriteTarget(spriteName);
        if (!sprite) return;
  
        if (this.parasites.has(spriteName)) return;
  
        sprite.setVisible(false);
  
        const costumeDataURL = this._getCostumeDataURL(sprite);
        if (!costumeDataURL) {
          console.error('Failed to get costume data for sprite:', spriteName);
          sprite.setVisible(true);
          return;
        }
  
        const parasite = document.createElement('img');
        parasite.src = costumeDataURL;
        parasite.style.position = 'fixed';
        parasite.style.zIndex = '9999';
        parasite.style.pointerEvents = 'none';
  
        const { pixelWidth, pixelHeight } = this._calculateSpriteSize(sprite);
        parasite.style.width = `${pixelWidth}px`;
        parasite.style.height = `${pixelHeight}px`;
  
        const canvas = document.querySelector('canvas');
        if (!canvas) {
          console.error('No canvas found');
          sprite.setVisible(true);
          return;
        }
  
        const canvasRect = canvas.getBoundingClientRect();
        const x = canvasRect.left + (sprite.x + 240) * (canvasRect.width / 480);
        const y = canvasRect.top + (-sprite.y + 180) * (canvasRect.height / 360);
  
        parasite.style.left = `${x}px`;
        parasite.style.top = `${y}px`;
  
        const parasiteData = {
          element: parasite,
          sprite: sprite,
          originX: x,
          originY: y,
          state: 'wandering',
          x: x,
          y: y,
          velocityX: 0,
          velocityY: 0,
          targetVelocityX: 0,
          targetVelocityY: 0,
          direction: 1,
          width: pixelWidth,
          height: pixelHeight,
          lastDirectionChange: 0,
          momentum: 0,
          nextDirectionChange: Math.random() * 2000 + 1000
        };
  
        this.parasites.set(spriteName, parasiteData);
  
        parasite.onload = () => {
          document.body.appendChild(parasite);
          this._startParasiteAnimation(spriteName);
        };
  
        parasite.onerror = () => {
          console.error('Failed to load sprite costume');
          parasite.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABPSURBVFhH7dKxDcAwDAOfoBVoA/W/2E8gYMDdo1esCIBhA2l4XbQDd4w+gBwAHIAcgByAHIAcgByAHIAcgByAHIAcgByAHIAcgByAHIAcgBz4A2WHB7sH6v6mAAAAAElFTkSuQmCC';
          document.body.appendChild(parasite);
          this._startParasiteAnimation(spriteName);
        };
      }
  
      cageSprite(args, util) {
        const spriteName = args.SPRITE;
        const parasiteData = this.parasites.get(spriteName);
        if (!parasiteData) return;
  
        const sprite = parasiteData.sprite;
        const canvas = document.querySelector('canvas');
        if (canvas) {
          const canvasRect = canvas.getBoundingClientRect();
          const newOriginX = canvasRect.left + (sprite.x + 240) * (canvasRect.width / 480);
          const newOriginY = canvasRect.top + (-sprite.y + 180) * (canvasRect.height / 360);
          parasiteData.originX = newOriginX;
          parasiteData.originY = newOriginY;
        }
  
        parasiteData.state = 'returning';
        parasiteData.targetVelocityX = 0;
        parasiteData.targetVelocityY = 0;
        this.parasites.set(spriteName, parasiteData);
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
  
      _startParasiteAnimation(spriteName) {
        const animate = (currentTime) => {
          const deltaTime = (currentTime - this.lastTime) / 16.67;
          this.lastTime = currentTime;
  
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
            nextDirectionChange
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
            if (now > lastDirectionChange + nextDirectionChange) {
              const angle = Math.random() * Math.PI * 2;
              const speed = Math.random() * 2 + 1;
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
              momentum = 0.8 + Math.random() * 0.4;
              parasiteData.momentum = momentum;
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
  
            velocityX += (targetVelocityX - velocityX) * 0.07 * deltaTime * momentum;
            velocityY += (targetVelocityY - velocityY) * 0.07 * deltaTime * momentum;
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
              const returnSpeed = Math.min(distance * 0.05, 3) * deltaTime;
              const angle = Math.atan2(dy, dx);
              targetVelocityX = Math.cos(angle) * returnSpeed;
              targetVelocityY = Math.sin(angle) * returnSpeed;
              const newDirection = dx > 0 ? 1 : -1;
              if (newDirection !== direction) {
                direction = newDirection;
                parasite.style.transform = direction > 0 ? 'scaleX(1)' : 'scaleX(-1)';
              }
              velocityX += (targetVelocityX - velocityX) * 0.15 * deltaTime;
              velocityY += (targetVelocityY - velocityY) * 0.15 * deltaTime;
            }
          }
  
          x += velocityX * deltaTime;
          y += velocityY * deltaTime;
  
          const viewportWidth = window.innerWidth;
          const viewportHeight = window.innerHeight;
  
          if (x < 0) {
            x = 0;
            targetVelocityX = Math.abs(targetVelocityX);
            velocityX = Math.abs(velocityX) * 0.5;
            direction = 1;
            parasite.style.transform = 'scaleX(1)';
          } else if (x > viewportWidth - parasiteWidth) {
            x = viewportWidth - parasiteWidth;
            targetVelocityX = -Math.abs(targetVelocityX);
            velocityX = -Math.abs(velocityX) * 0.5;
            direction = -1;
            parasite.style.transform = 'scaleX(-1)';
          }
  
          if (y < 0) {
            y = 0;
            targetVelocityY = Math.abs(targetVelocityY);
            velocityY = Math.abs(velocityY) * 0.5;
          } else if (y > viewportHeight - parasiteHeight) {
            y = viewportHeight - parasiteHeight;
            targetVelocityY = -Math.abs(targetVelocityY);
            velocityY = -Math.abs(velocityY) * 0.5;
          }
  
          parasite.style.left = `${x}px`;
          parasite.style.top = `${y}px`;
  
          this.parasites.set(spriteName, {
            ...parasiteData,
            x,
            y,
            velocityX,
            velocityY,
            targetVelocityX,
            targetVelocityY,
            direction,
            lastDirectionChange
          });
          requestAnimationFrame(animate);
        };
  
        this.lastTime = performance.now();
        requestAnimationFrame(animate);
      }
    }
  
    Scratch.extensions.register(new Parasite());
  })(Scratch);
  