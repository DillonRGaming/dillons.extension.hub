(function(Scratch) {
    'use strict';
  
    const Cast = Scratch.Cast;
    const defaultOrder = 3;
  
    function weightedRandomChoice(choices) {
        const totalWeight = Object.values(choices).reduce((sum, weight) => sum + weight, 0);
        if (totalWeight <= 0) return null;
        let randomNum = Math.random() * totalWeight;
        for (const item in choices) {
            if (randomNum < choices[item]) {
                return item;
            }
            randomNum -= choices[item];
        }
        return Object.keys(choices)[0] || null;
    }
  
    class SimpleBrain {
      constructor() {
        this.brains = new Map();
      }
  
      _getBrainData(brainName, createIfNeeded = false, order = defaultOrder) {
          brainName = Cast.toString(brainName).trim();
          if (!brainName && !createIfNeeded) return null;
          if (!brainName && createIfNeeded) brainName = 'DefaultBrain';
  
          if (!this.brains.has(brainName) && createIfNeeded) {
               const safeOrder = Math.max(1, Math.round(Cast.toNumber(order)));
               this.brains.set(brainName, {
                   order: safeOrder,
                   transitions: new Map(),
                   learnedOutputs: []
               });
               Scratch.vm.emitWorkspaceUpdate();
          } else if (this.brains.has(brainName) && createIfNeeded) {
               const brain = this.brains.get(brainName);
               if (!brain.order) brain.order = Math.max(1, Math.round(Cast.toNumber(order)));
               if (!brain.transitions) brain.transitions = new Map();
               if (!brain.learnedOutputs) brain.learnedOutputs = [];
          }
          return this.brains.get(brainName) || null;
      }
  
      _trainOnOutput(brainData, outputText) {
          if (!brainData || !outputText) return;
          const order = brainData.order;
          const transitions = brainData.transitions;
          const paddedOutput = '\x00'.repeat(order) + outputText + '\x01';
          for (let i = 0; i < paddedOutput.length - order; i++) {
              const state = paddedOutput.substring(i, i + order);
              const nextChar = paddedOutput[i + order];
              if (!transitions.has(state)) {
                  transitions.set(state, new Map());
              }
              const nextCharCounts = transitions.get(state);
              nextCharCounts.set(nextChar, (nextCharCounts.get(nextChar) || 0) + 1);
          }
      }
  
      _generateResponse(brainData, prompt, maxLength) {
          if (!brainData || !brainData.transitions || brainData.transitions.size === 0) {
              return '(Brain is empty or not trained)';
          }
          const order = brainData.order;
          const transitions = brainData.transitions;
          let currentOutput = '';
          let currentState = ('\x00'.repeat(order) + prompt).slice(-order);
          for (let i = 0; i < maxLength; i++) {
              const possibleNext = transitions.get(currentState);
              if (!possibleNext || possibleNext.size === 0) break;
              const nextChar = weightedRandomChoice(Object.fromEntries(possibleNext));
              if (nextChar === null || nextChar === '\x01') break;
              currentOutput += nextChar;
              currentState = (currentState + nextChar).slice(-order);
          }
          return currentOutput;
      }
  
      getInfo() {
        return {
          id: 'simplebrain',
          name: 'SimpleBrain',
          color1: '#D8BFD8',
          color2: '#C4AEC4',
          blocks: [
            { opcode: 'createBrain', blockType: Scratch.BlockType.COMMAND, text: 'create brain named [NAME] order [ORDER]', tooltip: 'Creates a new brain. Order determines context size (2-5 recommended).', arguments: { NAME: { type: Scratch.ArgumentType.STRING, defaultValue: 'MyBrain' }, ORDER: { type: Scratch.ArgumentType.NUMBER, defaultValue: defaultOrder } } },
            { opcode: 'deleteBrain', blockType: Scratch.BlockType.COMMAND, text: 'delete brain [BRAIN_NAME]', tooltip: 'Permanently removes a brain and all its data.', arguments: { BRAIN_NAME: { type: Scratch.ArgumentType.STRING, menu: 'brainMenu' } } },
            { opcode: 'brainExists', blockType: Scratch.BlockType.BOOLEAN, text: 'brain [BRAIN_NAME] exists?', tooltip: 'Checks if a brain with the given name has been created.', arguments: { BRAIN_NAME: { type: Scratch.ArgumentType.STRING, menu: 'brainMenu' } } },
            '---',
            { opcode: 'learnOutput', blockType: Scratch.BlockType.COMMAND, text: 'learn output [OUTPUT] for brain [BRAIN_NAME]', tooltip: 'Learns character sequences from the provided output example.', arguments: { OUTPUT: { type: Scratch.ArgumentType.STRING, defaultValue: 'Hello there!' }, BRAIN_NAME: { type: Scratch.ArgumentType.STRING, menu: 'brainMenu' } } },
            { opcode: 'learnBulkOutputs', blockType: Scratch.BlockType.COMMAND, text: 'learn bulk outputs [DATA_STRING] for brain [BRAIN_NAME]', tooltip: 'Learns from multiple output examples in a JSON string (array of strings or {"output": ...}).', arguments: { DATA_STRING: { type: Scratch.ArgumentType.STRING, defaultValue: '["hello world", "goodbye world"]' }, BRAIN_NAME: { type: Scratch.ArgumentType.STRING, menu: 'brainMenu' } } },
            '---',
            { opcode: 'generateResponse', blockType: Scratch.BlockType.REPORTER, text: 'generate response to [PROMPT] for brain [BRAIN_NAME] max length [LENGTH]', tooltip: 'Generates text character by character based on learned patterns, seeded by the prompt.', disableMonitor: false, arguments: { PROMPT: { type: Scratch.ArgumentType.STRING, defaultValue: 'hello' }, BRAIN_NAME: { type: Scratch.ArgumentType.STRING, menu: 'brainMenu' }, LENGTH: { type: Scratch.ArgumentType.NUMBER, defaultValue: 50 } } },
            '---',
            { opcode: 'clearBrainData', blockType: Scratch.BlockType.COMMAND, text: 'forget all data in brain [BRAIN_NAME]', tooltip: 'Removes all learned examples and resets the brain.', arguments: { BRAIN_NAME: { type: Scratch.ArgumentType.STRING, menu: 'brainMenu' } } },
            { opcode: 'getAllLearnedOutputs', blockType: Scratch.BlockType.REPORTER, text: 'all learned outputs in brain [BRAIN_NAME]', tooltip: 'Returns all raw output examples learned by the brain as a JSON string.', disableMonitor: true, arguments: { BRAIN_NAME: { type: Scratch.ArgumentType.STRING, menu: 'brainMenu' } } },
            { opcode: 'getLearnedDataCount', blockType: Scratch.BlockType.REPORTER, text: 'number of learned outputs in brain [BRAIN_NAME]', tooltip: 'Returns how many output examples have been learned.', disableMonitor: false, arguments: { BRAIN_NAME: { type: Scratch.ArgumentType.STRING, menu: 'brainMenu' } } },
            { opcode: 'getBrainOrder', blockType: Scratch.BlockType.REPORTER, text: 'order of brain [BRAIN_NAME]', tooltip: 'Returns the Markov chain order used by this brain.', disableMonitor: false, arguments: { BRAIN_NAME: { type: Scratch.ArgumentType.STRING, menu: 'brainMenu' } } }
          ],
          menus: { brainMenu: { acceptReporters: true, items: '_getBrainNames' } }
        };
      }
  
      _getBrainNames() {
        const brainNames = Array.from(this.brains.keys());
        if (brainNames.length === 0) {
          return [{ text: '(No brains created)', value: '' }];
        }
        brainNames.sort((a, b) => a.localeCompare(b));
        return brainNames.map(name => ({ text: name, value: name }));
      }
  
      createBrain(args) {
          this._getBrainData(args.NAME, true, args.ORDER);
      }
  
      deleteBrain(args) {
         const brainName = Cast.toString(args.BRAIN_NAME);
         if (!brainName) return;
         this.brains.delete(brainName);
         Scratch.vm.emitWorkspaceUpdate();
      }
  
      brainExists(args) {
          const brainName = Cast.toString(args.BRAIN_NAME);
          return brainName ? this.brains.has(brainName) : false;
      }
  
      learnOutput(args) {
          const brainName = Cast.toString(args.BRAIN_NAME);
          const outputText = Cast.toString(args.OUTPUT);
          if (!brainName) {
               return;
          }
          const brainData = this._getBrainData(brainName);
  
          if (brainData) {
              brainData.learnedOutputs.push(outputText);
              this._trainOnOutput(brainData, outputText);
          } else {
          }
      }
  
      learnBulkOutputs(args) {
          const brainName = Cast.toString(args.BRAN_NAME);
          const dataString = Cast.toString(args.DATA_STRING);
          if (!brainName) {
               return;
          }
          const brainData = this._getBrainData(brainName);
  
          if (!brainData) {
               return;
          }
          let parsedData;
          try { parsedData = JSON.parse(dataString); }
          catch (e) { return; }
          if (!Array.isArray(parsedData)) { return; }
  
          let addedCount = 0;
          for (const item of parsedData) {
              let outputText = null;
              if (typeof item === 'string') outputText = item;
              else if (typeof item === 'object' && item !== null && typeof item.output !== 'undefined') outputText = Cast.toString(item.output);
              if (outputText !== null) {
                   brainData.learnedOutputs.push(outputText);
                   this._trainOnOutput(brainData, outputText);
                   addedCount++;
              } else { }
          }
      }
  
      generateResponse(args) {
          const brainName = Cast.toString(args.BRAIN_NAME);
          const prompt = Cast.toString(args.PROMPT);
          const maxLength = Math.max(1, Math.round(Cast.toNumber(args.LENGTH)));
          if (!brainName) return `(No brain selected)`;
  
          const brainData = this._getBrainData(brainName);
          if (!brainData) return `(Brain "${brainName}" not found)`;
  
          return this._generateResponse(brainData, prompt, maxLength);
      }
  
      clearBrainData(args) {
        const brainName = Cast.toString(args.BRAIN_NAME);
        if (!brainName) return;
        const brainData = this._getBrainData(brainName);
        if (brainData) {
          brainData.transitions.clear();
          brainData.learnedOutputs = [];
        } else {
        }
      }
  
      getAllLearnedOutputs(args) {
          const brainName = Cast.toString(args.BRAIN_NAME);
          if (!brainName) return '[]';
          const brainData = this._getBrainData(brainName);
          if (brainData && brainData.learnedOutputs) {
              try { return JSON.stringify(brainData.learnedOutputs, null, 2); }
              catch (e) { return '{"error": "Could not stringify data"}'; }
          }
          return '[]';
      }
  
      getLearnedDataCount(args) {
           const brainName = Cast.toString(args.BRAIN_NAME);
           if (!brainName) return 0;
           const brainData = this._getBrainData(brainName);
           return (brainData && brainData.learnedOutputs) ? brainData.learnedOutputs.length : 0;
      }
  
      getBrainOrder(args) {
           const brainName = Cast.toString(args.BRAIN_NAME);
           if (!brainName) return 0;
           const brainData = this._getBrainData(brainName);
           return brainData ? brainData.order : 0;
      }
  
    }
  
    Scratch.extensions.register(new SimpleBrain());
  })(Scratch);