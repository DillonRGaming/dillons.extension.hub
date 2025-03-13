(function(Scratch) {
    'use strict';

    const vm = Scratch.vm;

    class PangStats {
        constructor() {
            this.fpsStatType = 'Current';
            this.cpuStatType = 'Current';
            this.frameTimeStatType = 'Current';

            this.lastFrameTime = 0;
            this.frameCount = 0;
            this.accumulatedFrameTime = 0;
            this.minFps = Infinity;
            this.maxFps = 0;
            this.averageFps = 0;
            this.maxFrameTime = 0;

            this.accumulatedScriptTime = 0;
            this.maxScriptTime = 0;
            this.averageScriptTime = 0;
            this.lastScriptTime = 0;

            this.performanceLoopActive = false;
            if (!this.performanceLoopActive) {
                this.startPerformanceLoop();
            }
        }

        getInfo() {
            return {
                id: 'pangStats',
                name: 'PangStats',
                color1: '#4286f4',
                color2: '#3569c4',
                blocks: [
                    {
                        opcode: 'getFpsStat',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'FPS [FPS_STAT]',
                        arguments: {
                            FPS_STAT: {
                                type: Scratch.ArgumentType.STRING,
                                menu: 'fpsStatsMenu',
                                defaultValue: 'Current'
                            }
                        }
                    },
                    {
                        opcode: 'getCpuStat',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'CPU Script Time (ms) [CPU_STAT]',
                        arguments: {
                            CPU_STAT: {
                                type: Scratch.ArgumentType.STRING,
                                menu: 'cpuStatsMenu',
                                defaultValue: 'Current'
                            }
                        }
                    },
                    {
                        opcode: 'getFrameTimeStat',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'Frame Time (ms) [FRAME_TIME_STAT]',
                        arguments: {
                            FRAME_TIME_STAT: {
                                type: Scratch.ArgumentType.STRING,
                                menu: 'frameTimeStatsMenu',
                                defaultValue: 'Current'
                            }
                        }
                    },
                    {
                        opcode: 'resetStats',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'reset PangStats [STAT_TYPE]',
                        arguments: {
                            STAT_TYPE: {
                                type: Scratch.ArgumentType.STRING,
                                menu: 'resetStatsMenu',
                                defaultValue: 'All'
                            }
                        }
                    }
                ],
                menus: {
                    fpsStatsMenu: {
                        acceptReporters: false,
                        items: ['Current', 'Average', 'Minimum', 'Maximum']
                    },
                    cpuStatsMenu: {
                        acceptReporters: false,
                        items: ['Current', 'Average', 'Maximum']
                    },
                    frameTimeStatsMenu: {
                        acceptReporters: false,
                        items: ['Current', 'Average', 'Maximum']
                    },
                    resetStatsMenu: {
                        acceptReporters: false,
                        items: ['All', 'FPS', 'CPU', 'Frame Time']
                    }
                }
            };
        }


        performanceLoop() {
            if (!this.performanceLoopActive) return;
            const now = performance.now();
            const frameTime = now - this.lastFrameTime;
            this.lastFrameTime = now;
            if (frameTime > 0) {
                const currentFps = 1000 / frameTime;
                this.averageFps = (this.averageFps * this.frameCount + currentFps) / (this.frameCount + 1);
                this.minFps = Math.min(this.minFps, currentFps);
                this.maxFps = Math.max(this.maxFps, currentFps);
                this.frameCount++;
            }

            this.maxFrameTime = Math.max(this.maxFrameTime, frameTime);

            const scriptStartTime = performance.now();
            vm.runtime._step();
            const scriptEndTime = performance.now();
            this.lastScriptTime = scriptEndTime - scriptStartTime;
            this.accumulatedScriptTime += this.lastScriptTime;
            this.maxScriptTime = Math.max(this.maxScriptTime, this.lastScriptTime);
            this.averageScriptTime = this.accumulatedScriptTime / this.frameCount;


            requestAnimationFrame(() => this.performanceLoop());
        }


        startPerformanceLoop() {
            if (this.performanceLoopActive) return;
            this.performanceLoopActive = true;
            this.lastFrameTime = performance.now();
            requestAnimationFrame(() => this.performanceLoop());
        }

        stopPerformanceLoop() {
            this.performanceLoopActive = false;
        }

        resetStats(args) {
            const statType = args.STAT_TYPE;
            if (statType === 'All' || statType === 'FPS') {
                this.frameCount = 0;
                this.accumulatedFrameTime = 0;
                this.minFps = Infinity;
                this.maxFps = 0;
                this.averageFps = 0;
                this.maxFrameTime = 0;
            }
            if (statType === 'All' || statType === 'CPU') {
                this.accumulatedScriptTime = 0;
                this.maxScriptTime = 0;
                this.averageScriptTime = 0;
            }
            if (statType === 'All' || statType === 'Frame Time') {
                this.maxFrameTime = 0;
            }
        }


        getFpsStat(args) {
            const statType = args.FPS_STAT;
            switch (statType) {
                case 'Current': return Math.round(this.averageFps);
                case 'Average': return Math.round(this.averageFps);
                case 'Minimum': return Math.round(this.minFps);
                case 'Maximum': return Math.round(this.maxFps);
                default: return 0;
            }
        }

        getCpuStat(args) {
            const statType = args.CPU_STAT;
            switch (statType) {
                case 'Current': return this.lastScriptTime.toFixed(2);
                case 'Average': return this.averageScriptTime.toFixed(2);
                case 'Maximum': return this.maxScriptTime.toFixed(2);
                default: return 0;
            }
        }

        getFrameTimeStat(args) {
            const statType = args.FRAME_TIME_STAT;
            switch (statType) {
                case 'Current': return (this.lastFrameTime).toFixed(2);
                case 'Average': return (this.accumulatedFrameTime / this.frameCount).toFixed(2);
                case 'Maximum': return this.maxFrameTime.toFixed(2);
                default: return 0;
            }
        }
    }

    Scratch.extensions.register(new PangStats());
})(Scratch);