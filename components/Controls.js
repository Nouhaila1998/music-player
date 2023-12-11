import AudioManager from './../services/AudioManager.js';
export class Controls extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.render();

    }

    connectedCallback() {
        const manager = new AudioManager();
        const sliders = this.shadowRoot.querySelectorAll("webaudio-slider");
        for (let i = 0; i < sliders.length; i++) {

            sliders[i].addEventListener("input", () => {
                manager.filters[i].gain.value = ( sliders[i].value / 100) * 30;
            })
        }
    }

    render() {
        this.shadowRoot.innerHTML = this.template;
    }
//20, 100, 300, 1000, 5000, 20000
    get template() {
        return `${this.style}

    <div class="row">
        <div class="col-lg-1 m-4 d-flex justify-content-center align-items-center flex-column">
       

            <webaudio-slider midilearn="true" midicc="1.23" src="https://nouhaila1998.github.io/music-player/assets/knobs/vsliderbody.png" value="0" min="0" max="100" step="1"
            basewidth="24" baseheight="128" knobwidth="24" knobheight="24" ditchLength="100"></webaudio-slider>
            <span class="freq">20Hz</span>
        </div>

        <div class="col-lg-1 m-4 d-flex justify-content-center align-items-center flex-column">
          

            <webaudio-slider midilearn="true" midicc="1.23" src="https://nouhaila1998.github.io/music-player/assets/knobs/vsliderbody.png" value="0" min="0" max="100" step="1"
            basewidth="24" baseheight="128" knobwidth="24" knobheight="24" ditchLength="100"></webaudio-slider>
            <span class="freq">100Hz</span>
        </div>

        <div class="col-lg-1 m-4 d-flex justify-content-center align-items-center flex-column">
           

            <webaudio-slider midilearn="true" midicc="1.23" src="https://nouhaila1998.github.io/music-player/assets/knobs/vsliderbody.png" value="0" min="0" max="100" step="1"
            basewidth="24" baseheight="128" knobwidth="24" knobheight="24" ditchLength="100"></webaudio-slider>
            <span class="freq">300Hz</span>
        </div>

        <div class="col-lg-1 m-4 d-flex justify-content-center align-items-center flex-column">
          

            <webaudio-slider midilearn="true" midicc="1.23" src="https://nouhaila1998.github.io/music-player/assets/knobs/vsliderbody.png" value="0" min="0" max="100" step="1"
            basewidth="24" baseheight="128" knobwidth="24" knobheight="24" ditchLength="100"></webaudio-slider>
            <span class="freq">1000Hz</span>
        </div>
        <div class="col-lg-1 m-4 d-flex justify-content-center align-items-center flex-column">
          

          <webaudio-slider midilearn="true" midicc="1.23" src="https://nouhaila1998.github.io/music-player/assets/knobs/vsliderbody.png" value="0" min="0" max="100" step="1"
          basewidth="24" baseheight="128" knobwidth="24" knobheight="24" ditchLength="100"></webaudio-slider>
          <span class="freq">5000Hz</span>
      </div>
      <div class="col-lg-1 m-4 d-flex justify-content-center align-items-center flex-column">
          

          <webaudio-slider midilearn="true" midicc="1.23" src="https://nouhaila1998.github.io/music-player/assets/knobs/vsliderbody.png" value="0" min="0" max="100" step="1"
          basewidth="24" baseheight="128" knobwidth="24" knobheight="24" ditchLength="100"></webaudio-slider>
          <span class="freq">10000Hz</span>
      </div>
        
        
    </div>

        `;
    }

    get style() {
        return `

        <style>

        @import url("https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css");
     
        
        /*=================== Button ====================*/
        
        :host{
            margin:5em;
        }
        /*================ Range sliders ================*/
        .freq {
            font-size: 0.7em;
            font-family: sans-serif;
            color:#fcbb5a;
            font-weight:bold;
            margin-top:1em;
        }
    
       

        </style>
        `;
    }
}

customElements.define("app-controls", Controls);