(function(Scratch) {
    'use strict';
  
    const Cast = Scratch.Cast;
  
    const svgIcon = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTMxIiBoZWlnaHQ9IjkzMSIgdmlld0JveD0iMCAwIDkzMSA5MzEiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjQ2NS41IiBjeT0iNDY1LjUiIHI9IjQ2NS41IiBmaWxsPSIjRjI2N0FDIi8+CjxwYXRoIGQ9Ik0zMTAuNzA0IDU4NS4yOTZDMjczLjk3NCA1NDguNTY2IDI1MS43MzggNTAwLjA1MiAyNDcuNjc2IDQ0OC42MzlDMjQ2LjkzIDQzOS4xOTQgMjU0LjY4MSA0MzEuNSAyNjQuMTU2IDQzMS41VjQzMS41QzI3My42MzEgNDMxLjUgMjgxLjIyOSA0MzkuMTk5IDI4Mi4xMTQgNDQ4LjYzMkMyODYuMDg2IDQ5MC45MzEgMzA0LjY3NCA1MzAuNzQxIDMzNC45NjcgNTYxLjAzNEMzNjkuMzIxIDU5NS4zODggNDE1LjkxNiA2MTQuNjg4IDQ2NC41IDYxNC42ODhDNTEzLjA4NCA2MTQuNjg4IDU1OS42NzkgNTk1LjM4OCA1OTQuMDMzIDU2MS4wMzRDNjI0LjMyNiA1MzAuNzQxIDY0Mi45MTQgNDkwLjkzMSA2NDYuODg2IDQ0OC42MzJDNjQ3Ljc3MSA0MzkuMTk5IDY1NS4zNjkgNDMxLjUgNjY0Ljg0NCA0MzEuNVY0MzEuNUM2NzQuMzE5IDQzMS41IDY4Mi4wNyA0MzkuMTk0IDY4MS4zMjQgNDQ4LjYzOUM2NzcuMjYyIDUwMC4wNTIgNjU1LjAyNiA1NDguNTY2IDYxOC4yOTYgNTg1LjI5NkM1NzcuNTA3IDYyNi4wODUgNTIyLjE4NSA2NDkgNDY0LjUgNjQ5QzQwNi44MTUgNjQ5IDM1MS40OTMgNjI2LjA4NSAzMTAuNzA0IDU4NS4yOTZaIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjY0Ii8+CjxlbGxpcHNlIGN4PSI0NjQuNSIgY3k9IjQyMS41IiByeD0iMTE0LjUiIHJ5PSIxMTMuNSIgZmlsbD0id2hpdGUiLz4KPGNpcmNsZSBjeD0iNDY0LjUiIGN5PSIyNDkuNSIgcj0iMTE0LjUiIGZpbGw9IndoaXRlIi8+CjxyZWN0IHg9IjM1MCIgeT0iMjQ4IiB3aWR0aD0iMjI5IiBoZWlnaHQ9IjE4MyIgZmlsbD0id2hpdGUiLz4KPHJlY3QgeD0iNDExIiB5PSI2NDkiIHdpZHRoPSIxMDgiIGhlaWdodD0iMTQ4IiByeD0iNiIgZmlsbD0id2hpdGUiLz4KPHJlY3QgeD0iMzczIiB5PSI3MzgiIHdpZHRoPSIxODUiIGhlaWdodD0iNTkiIHJ4PSIxNCIgZmlsbD0id2hpdGUiLz4KPC9zdmc+Cg==";
  
    class VoiceRecognitionExtension {
      constructor(runtime) {
        this.runtime = runtime;
  
        this._recognition = null;
        this.lastWord = '';
        this.fullTranscript = '';
        this.isListening = false;
        this.currentUtteranceFinalized = true;
        this.blankingTimeoutId = null;
        this.previousDetectedWord = '';

        this._audioContext = null;
        this._analyser = null;
        this._microphone = null;
        this.loudness = 0;
  
        this._initRecognition();
        this._setupAudio();
      }

      _setupAudio() {
        try {
            window.AudioContext = window.AudioContext || window.webkitAudioContext;
            this._audioContext = new AudioContext();
            this._analyser = this._audioContext.createAnalyser();
            this._analyser.fftSize = 2048;
            const bufferLength = this._analyser.frequencyBinCount;
            this._dataArray = new Uint8Array(bufferLength);
        } catch (e) {
            console.warn('Web Audio API is not supported in this browser.');
            return;
        }
      }
  
      _initRecognition() {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
          console.error("Speech Recognition API not supported.");
          return;
        }
  
        this._recognition = new SpeechRecognition();
        this._recognition.interimResults = true;
        this._recognition.lang = 'en-US';
        this._recognition.continuous = true;
  
        this._recognition.onresult = (event) => {
          let interimTranscript = '';
          let latestTranscriptForLastWord = '';
  
          for (let i = event.resultIndex; i < event.results.length; ++i) {
            const result = event.results[i];
            const transcript = result[0].transcript;
            latestTranscriptForLastWord = transcript.trim();
  
            if (result.isFinal) {
              const finalTranscriptPart = transcript.trim();
              if (finalTranscriptPart) {
                  if (this.fullTranscript && !this.fullTranscript.endsWith(' ')) {
                      this.fullTranscript += ' ';
                  }
                  this.fullTranscript += finalTranscriptPart;
              }
              this.currentUtteranceFinalized = true;
            } else {
              interimTranscript += transcript;
              this.currentUtteranceFinalized = false;
            }
          }
  
          if (latestTranscriptForLastWord) {
              const words = latestTranscriptForLastWord.split(' ');
              const currentWord = words[words.length - 1] || '';
  
              this.lastWord = currentWord;
              this.previousDetectedWord = currentWord;
          } else if (!this.currentUtteranceFinalized) {
          } else {
          }
        };
  
        this._recognition.onerror = (event) => {
          console.error(`Speech recognition error: ${event.error}`);
          if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
              this.isListening = false;
              if (this.blankingTimeoutId) {
                  clearTimeout(this.blankingTimeoutId);
                  this.blankingTimeoutId = null;
              }
          }
        };
  
        this._recognition.onstart = () => {
          console.log('Speech recognition started (continuous, interim)');
          this.isListening = true;
          this.lastWord = '';
          this.fullTranscript = '';
          this.previousDetectedWord = '';
          this.currentUtteranceFinalized = true;
          if (this.blankingTimeoutId) {
            clearTimeout(this.blankingTimeoutId);
            this.blankingTimeoutId = null;
          }

          if (this._audioContext) {
            navigator.mediaDevices.getUserMedia({ audio: true, video: false })
              .then((stream) => {
                this._microphone = this._audioContext.createMediaStreamSource(stream);
                this._microphone.connect(this._analyser);
              })
              .catch((err) => {
                console.error('Error getting microphone permission:', err);
              });
          }
        };
  
        this._recognition.onend = () => {
          console.log('Speech recognition ended');
          this.isListening = false;
          if (this.blankingTimeoutId) {
            clearTimeout(this.blankingTimeoutId);
            this.blankingTimeoutId = null;
          }
          if (this._microphone) {
            this._microphone.disconnect();
            this._microphone = null;
          }
        };
      }
  
      startListening() {
        if (!this._recognition) {
          console.error("Recognition not initialized.");
          return;
        }
        if (this.isListening) {
          console.log("Already listening.");
          return;
        }
        try {
          this.fullTranscript = '';
          this.lastWord = '';
          this.previousDetectedWord = '';
          if (this.blankingTimeoutId) {
              clearTimeout(this.blankingTimeoutId);
              this.blankingTimeoutId = null;
          }
          this._recognition.start();
        } catch (e) {
          console.error(`Error starting recognition: ${e.message}`);
          this.isListening = false;
        }
      }
  
      stopListening() {
        if (!this._recognition || !this.isListening) {
          return;
        }
        if (this.blankingTimeoutId) {
            clearTimeout(this.blankingTimeoutId);
            this.blankingTimeoutId = null;
        }
        this._recognition.stop();
      }
  
      getLastWord() {
        return this.lastWord;
      }
  
      getFullTranscript() {
          return this.fullTranscript;
      }
  
      getIsListeningState() {
        return this.isListening;
      }

      getLoudness() {
        if (!this._analyser || !this._dataArray) return 0;
        this._analyser.getByteFrequencyData(this._dataArray);
        let sum = 0;
        for (let i = 0; i < this._dataArray.length; i++) {
          sum += this._dataArray[i];
        }
        this.loudness = sum / this._dataArray.length;
        return Math.round(this.loudness * 10) / 10;
      }
  
      getInfo() {
        return {
          id: "voiceRecognitionLiveBlank",
          name: "VoiceRecognition",
          menuIconURI: svgIcon,
          blockIconURI: svgIcon,
          color1: "#FF69B4",
          color2: "#EA25A1",
  
          blocks: [
            {
              opcode: "startListening",
              blockType: Scratch.BlockType.COMMAND,
              text: "start listening continuously",
            },
            {
              opcode: "stopListening",
              blockType: Scratch.BlockType.COMMAND,
              text: "stop listening",
            },
            {
              opcode: "getLastWord",
              blockType: Scratch.BlockType.REPORTER,
              blockShape: Scratch.BlockShape.LEAF,
              text: "last spoken word",
            },
            {
              opcode: "getFullTranscript",
              blockType: Scratch.BlockType.REPORTER,
              blockShape: Scratch.BlockShape.LEAF,
              text: "full transcript",
            },
            {
              opcode: "getLoudness",
              blockType: Scratch.BlockType.REPORTER,
              blockShape: Scratch.BlockShape.LEAF,
              text: "loudness",
            },
            {
              opcode: "getIsListeningState",
              blockType: Scratch.BlockType.BOOLEAN,
              text: "is listening?",
            }
          ],
        };
      }
    }
  
    Scratch.extensions.register(new VoiceRecognitionExtension(Scratch.vm.runtime));
  
  })(Scratch);