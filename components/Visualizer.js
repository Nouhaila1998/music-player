import AudioManager from './../services/AudioManager.js';
export class Visualizer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.render();

    }

    connectedCallback(){
        const manager = new AudioManager();
        const canvas = this.shadowRoot.getElementById("canvas");
        $(function() {
            let visualizer = null;
            let cycleInterval = null;
            let presets = {};
            let presetKeys = [];
            let presetIndexHist = [];
            let presetIndex = 0;
            let presetCycle = true;
            let presetCycleLength = 15000;
            let presetRandom = true;
      
        
      
            function startRenderer() {
              requestAnimationFrame(() => startRenderer());
              visualizer.render();
            }
      
           
      
      
            function nextPreset(blendTime = 5.7) {
              presetIndexHist.push(presetIndex);
      
              let numPresets = presetKeys.length;
              if (presetRandom) {
                presetIndex = Math.floor(Math.random() * presetKeys.length);
              } else {
                presetIndex = (presetIndex + 1) % numPresets;
              }
      
              visualizer.loadPreset(presets[presetKeys[presetIndex]], blendTime);
           
            }
      
            function prevPreset(blendTime = 5.7) {
              let numPresets = presetKeys.length;
              if (presetIndexHist.length > 0) {
                presetIndex = presetIndexHist.pop();
              } else {
                presetIndex = ((presetIndex - 1) + numPresets) % numPresets;
              }
      
              visualizer.loadPreset(presets[presetKeys[presetIndex]], blendTime);
             
            }
      
            function restartCycleInterval() {
              if (cycleInterval) {
                clearInterval(cycleInterval);
                cycleInterval = null;
              }
      
              if (presetCycle) {
                cycleInterval = setInterval(() => nextPreset(2.7), presetCycleLength);
              }
            }
      
      
           
      
          
      
      
            function initPlayer() {
      
              presets = {};
              if (window.butterchurnPresets) {
                Object.assign(presets, butterchurnPresets.getPresets());
              }
              if (window.butterchurnPresetsExtra) {
                Object.assign(presets, butterchurnPresetsExtra.getPresets());
              }
              presets = _(presets).toPairs().sortBy(([k, v]) => k.toLowerCase()).fromPairs().value();
              presetKeys = _.keys(presets);
              presetIndex = Math.floor(Math.random() * presetKeys.length);
      
           
      
              visualizer = butterchurn.default.createVisualizer(manager.audioContext, canvas , {
                width: 500,
                height: 300,
                pixelRatio: window.devicePixelRatio || 1,
                textureRatio: 1,
              });
              nextPreset(0);
              cycleInterval = setInterval(() => nextPreset(2.7), presetCycleLength);
            }
      
            manager.audio.addEventListener("play",()=>{
                presetCycle = true
                presetCycleLength = 5000
                presetRandom = true;
                initPlayer();
                startRenderer();
                restartCycleInterval();
            })

            
            manager.audio.addEventListener("ended",()=>{
                presetCycle = true
                presetCycleLength = 5000
                presetRandom = true;
                initPlayer();
                startRenderer();
                restartCycleInterval();
            })
      
            manager.audio.addEventListener("pause",()=>{
        
                initPlayer();
               
            })
      
      
           
          });
    }

    render() {
        this.shadowRoot.innerHTML = this.template;
    }

    get template() {
        return `${this.style}
        <canvas id="canvas"></canvas>
        `;
    }

    get style() {
        return `<style>
        *{
            padding: 0;
            margin: 0;
            box-sizing: border-box;
        }
        :host{
            width: 100%;
            height: 100%;
        }
        
        .body{
            width: 100%;
            height: 100%;
            display:flex;
            justify-content:center;
            align-items:center;
        }
        canvas{
               width: 100%;
               height: 100%;
        }
        
       
        
                </style>

        `;
    }
}

customElements.define("app-visualizer", Visualizer);

