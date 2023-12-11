import AudioManager from './../services/AudioManager.js';
export class Player extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.render();

    }
    render() {
        this.shadowRoot.innerHTML = this.template;
    }


    connectedCallback() {

        const playBtn = this.shadowRoot.querySelector("#mainPlayBtn");
        const btnPrev = this.shadowRoot.querySelector("#btnPrev");
        const btnNext = this.shadowRoot.querySelector("#btnNext");
        const trackTitle = this.shadowRoot.querySelector(".track-title");
        const artistName = this.shadowRoot.querySelector(".artist-name");
        const cover = this.shadowRoot.querySelector(".cover");
        const slider = this.shadowRoot.querySelector(".slider");
        const thumb = this.shadowRoot.querySelector(".slider-thumb");
        const progress = this.shadowRoot.querySelector(".progress");
        const time = this.shadowRoot.querySelector(".time");
        const fulltime = this.shadowRoot.querySelector(".fulltime");
        const btnMinus = this.shadowRoot.querySelector("#btnMinus");
        const btnPlus = this.shadowRoot.querySelector("#btnPlus");
        const canvas = this.shadowRoot.getElementById("canvas");
        const volumeKnob = this.shadowRoot.getElementById("knob-1");
        const balanceKnob = this.shadowRoot.getElementById("knob-2");

        const manager = new AudioManager();

        trackTitle.innerText = manager.tracks[manager.trackID];
        artistName.innerText = manager.tracks[manager.trackID];

        cover.src = "https://nouhaila1998.github.io/music-player/assets/covers/" + manager.covers[manager.trackID] + '.jpg';

        progress.style.width = 0;
        thumb.style.left = 0;


        const playTrack = () => {
            if (!manager.trackPlaying) {

                manager.play();
                this.shadowRoot.querySelector("#mainPlayBtn").innerHTML = `<span class="material-symbols-outlined">
                    pause
                </span>`;

                manager.trackPlaying = true;
            }
            else {
                manager.pause();
                this.shadowRoot.querySelector("#mainPlayBtn").innerHTML = `<span class="material-symbols-outlined">
                    play_arrow
                </span>`;

                manager.trackPlaying = false;
            }

            renderFrame();
        }

        playBtn.addEventListener("click", playTrack);
        btnMinus.addEventListener("click",()=>{
            manager.minus10();
        });
        btnPlus.addEventListener("click",()=>{
            manager.plus10();
        });

        const switchTrack = () => {
            manager.switchSource();
            trackTitle.innerText = manager.tracks[manager.trackID];
            artistName.innerText = manager.tracks[manager.trackID];

            cover.src = "https://nouhaila1998.github.io/music-player/assets/covers/" + manager.covers[manager.trackID] + '.jpg';

            progress.style.width = 0;
            thumb.style.left = 0;

            manager.audio.addEventListener('loadeddata', () => {

                this.#setTime(fulltime, manager.audio.duration);
                slider.setAttribute("max", manager.audio.duration);
            });
            manager.play();
            renderFrame();

        }

        const nextTrack = () => {
            manager.trackID++;

            if (manager.trackID > manager.tracks.length - 1) {
                manager.trackID = 0;
            }

            switchTrack();
        }

        const prevTrack = () => {
            manager.trackID--;

            if (manager.trackID < 0) {
                manager.trackID = manager.tracks.length - 1;
            }

            switchTrack();
        }


        btnPrev.addEventListener("click", prevTrack);

        btnNext.addEventListener("click", nextTrack);

        manager.audio.addEventListener("timeupdate", () => {
            const currentAudioTime = Math.floor(manager.audio.currentTime);
            const timePercentage = (currentAudioTime / manager.audio.duration) * 100 + "%";
            this.#setTime(time, currentAudioTime);
            progress.style.width = timePercentage;
            thumb.style.left = timePercentage;

        });

        manager.audio.addEventListener('ended', nextTrack);


        slider.addEventListener("input", () => {
            const val = (slider.value / manager.audio.duration) * 100 + "%";
            progress.style.width = val;
            thumb.style.left = val;

            this.#setTime(time, slider.value);

            manager.audio.currentTime = slider.value;
        });

        //volume
        volumeKnob.value =50
        volumeKnob.addEventListener('input', (e)=>{
            manager.gainNode.gain.value=e.target.value/50
        })
       

        
        //volume
        volumeKnob.value =50
        volumeKnob.addEventListener('input', (e)=>{
            manager.gainNode.gain.value=e.target.value/50
        })


        //balance
        balanceKnob.value=50;
        balanceKnob.addEventListener("input",()=>{
            manager.panner.pan.value=(balanceKnob.value/100)*2-1;
           });

        const ctx = canvas.getContext("2d");


        let bufferLength = manager.analyserPlayer.frequencyBinCount;

        let dataArray = new Uint8Array(bufferLength);

        const WIDTH = canvas.width;
        const HEIGHT = canvas.height;

        let barWidth = (WIDTH / bufferLength) * 2.5;
        let barHeight;
        let x = 0;

        const renderFrame = () => {
            requestAnimationFrame(renderFrame);

            x = 0;

            manager.analyserPlayer.getByteFrequencyData(dataArray);

            ctx.fillStyle = "#26282c";
            ctx.fillRect(0, 0, WIDTH, HEIGHT);

            for (let i = 0; i < bufferLength; i++) {
                barHeight = dataArray[i];

                let r = barHeight + 25 * (i / bufferLength);
                let g = 250 * (i / bufferLength);
                let b = 50;

                ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
                ctx.fillRect(x, HEIGHT - barHeight / 3, barWidth /1.5, barHeight / 3);

                x += barWidth + 1;
            }
        }

        manager.audio.addEventListener("play", () => {
            trackTitle.innerText = manager.tracks[manager.trackID];
            artistName.innerText = manager.tracks[manager.trackID];

            cover.src = "https://nouhaila1998.github.io/music-player/assets/covers/" + manager.covers[manager.trackID] + '.jpg';

            progress.style.width = 0;
            thumb.style.left = 0;

            manager.audio.addEventListener('loadeddata', () => {

                this.#setTime(fulltime, manager.audio.duration);
                slider.setAttribute("max", manager.audio.duration);
            });
            renderFrame();
        });

      

    }

    #setTime(output, input) {
        const minutes = Math.floor(input / 60);
        const seconds = Math.floor(input % 60);
        if (seconds < 10) {
            output.innerText = minutes + ":0" + seconds;
        } else {
            output.innerText = minutes + ":" + seconds;
        }
    }





    get template() {
        return `
            ${this.style}
    <div class="player">
            <img src="https://nouhaila1998.github.io/music-player/assets/covers/cover1.jpg" class="cover" alt="cover"/>
            <h3 class="track-title">Worst Day</h3>
            <span class="artist-name">ILLINUIM</span>
            <div class="timeline-slider">
                <div class="timeline">
                    <small class="time">0:00</small>
                    <small class="fulltime">2:55</small>
                </div>
                <div class="range-slider">
                    <input type="range" min="0" max="100" value="0", class="slider">
                    <div class="slider-thumb"></div>
                    <div class="progress"></div>
                </div>
            </div>

    
        </div>

        <div class="knbs" >
            <webaudio-knob id="knob-1" src="https://nouhaila1998.github.io/music-player/assets/knobs/horn.png" min="0" max="100"></webaudio-knob>
            <webaudio-knob id="knob-2" src="https://nouhaila1998.github.io/music-player/assets/knobs/Sonatom_bipo.png" min="0" max="100"></webaudio-knob>
         </div>
       
            <div class="controls">
                <button class="btn" id="btnPrev">
                    <span class="material-symbols-outlined">
                        fast_rewind
                        </span>
                </button>
                <button class="btn" id="btnMinus">
                    <span class="material-symbols-outlined">
                    replay_10
                    </span>
                </button>
                <button class="btn btn-main" id="mainPlayBtn">
                    <span class="material-symbols-outlined">
                        play_arrow
                        </span>
                </button>
                <button class="btn" id="btnPlus">
                <span class="material-symbols-outlined">
                forward_10
                </span>
                </button>
                <button class="btn" id="btnNext">
                    <span class="material-symbols-outlined">
                        fast_forward
                        </span>
                </button>
            </div>

            <canvas id="canvas">
    
            </canvas>
        </div>
        `;
    }

    get style() {
        return `
            <style>
            @import url("https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0");
            @import url("https://fonts.googleapis.com/css2?family=Orbitron&family=Poppins&display=swap");

                * {
                box-sizing: border-box;
                margin: 0;
                padding: 0;
                font-family: "Poppins";
              }
                
              .player{
                
                margin: 0 auto;
                text-align: center;
                padding: 1.5em;
                color:#eee;
                display:flex;
                justify-content:center;
                align-items:center;
                flex-direction:column;
            }
            .cover {
               width: 7em;
               border: 0.3em #171a1d solid;
               border-radius: 50%;
               box-shadow: 0.2em 0.2em 1em #151618, -0.2em -0.2em 1em #33353b; 
            }
            h1{
                margin: 0.5em 0 0.3em 0;
            }
            
            span, small{
                color: #8c8f90;
            }

            .track-title{
                margin-top:1em;
            }
            
            .timeline-slider{
                margin: 1em auto;
                width:100%;
            }

            .balance-slider{
                margin: 1em auto;
                width:50%;
            }
            
            .timeline{
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .range-slider{
                margin-top: 0.2em;
                position: relative;
                display: flex;
                user-select: none;
            }
            .b-slider{
                margin: 0.5em auto;
            }
            .slider{
                -webkit-appearance: none;
                width: 100%;
                height: 0.4em;
                outline: none;
                border-radius: 3px;
                background: #1f1f1f;
                box-shadow: inset 3px 3px 6px #000, 1px 1px 1px #909090;
                cursor: pointer;
            }
            .slider::-webkit-slider-thumb{
                -webkit-appearance: none;
                width: 1.7em;
                height: 1.7em;
                z-index: 3;
                position: relative;
            }
            
            .timeline-slider .slider-thumb{
                position: absolute;
                width: 1.2em;
                height: 1.2em;
                background: #111;
                border-radius: 50%;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%,-50%);
                z-index: 2;
            }

          
            
            .timeline-slider .slider-thumb::before{
                content: "";
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%,-50%);
                width: 0.5em;
                height: 0.5em;
                background: #333;
                border-radius: inherit;
                transition: 0.3s;
            }

          
            
            .timeline-slider .range-slider:hover .slider-thumb:before{
                background: #e75709;
            }

          
            
            
            .progress{
                width: 25%;
                height: 0.4em;
                border-radius: 3px;
                background: linear-gradient(90deg, #c72611,#e75611);
                position: absolute;
                top:50%;
                transform: translateY(-50%);
                left: 0;
                pointer-events: none;
            
            }
            
         
            .btn{
                background: linear-gradient(-60deg, #1e1f23, #2e3137);
                border: none;
                box-shadow: 0.3em 0.3em 0.8em #151618, -0.3em -0.3em 0.5em #33353b;
                width: 2.5em;
                height: 2.5em;
                border: 0.2em #1c2023 solid; 
                border-radius: 50%;
                cursor: pointer;
            }
            
            .btn:hover{
                background: linear-gradient(60deg,#1e1f23, #2e3137);
            }
            
            .btn-main{
                background: linear-gradient(-60deg, #c72611,#e75709);
                width: 3em;
                height: 3em;
            }
            
            .btn-main:hover{
                background: linear-gradient(60deg, #c72611,#e75709);
            }
            
            .btn-main span{
                color: #fff;
                font-size:1.5em;
                display:flex;
                justify-content:center;
                align-items:center;
            }

            .btn span{
                color: #fff;
                font-size:1.2em;
                display:flex;
                justify-content:center;
                align-items:center;
            }
            .controls .btn{
                margin: 1em;
            }
            
            canvas{
                height: 100px;
                width: 100%;
                margin-top:0.5em;
            }

            webaudio-knob{
                display:block;
                margin-bottom:1em;
            }

            .knbs{
                display:flex;
                justify-content:center;
                align-items:center;
                flex-direction:column;
            }

            </style>
        `;
    }
}





customElements.define("app-player", Player);