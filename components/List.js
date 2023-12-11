import AudioManager from './../services/AudioManager.js';

export class List extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.render();

    }


    render() {
        this.shadowRoot.innerHTML = this.template;
    }

    connectedCallback() {
        const manager = new AudioManager();




        const renderFrame = () => {

            const canvas = this.shadowRoot.getElementById("canvas" + manager.trackID);

            const ctx = canvas.getContext("2d");


            let bufferLength = manager.analyserList.frequencyBinCount;

            let dataArray = new Uint8Array(bufferLength);

            const WIDTH = canvas.width;
            const HEIGHT = canvas.height;

            let barWidth = (WIDTH / bufferLength) * 2.5;
            let barHeight;
            let x = 0;
            requestAnimationFrame(renderFrame);

            x = 0;

            manager.analyserList.getByteFrequencyData(dataArray);

            ctx.fillStyle = "#303034";
            ctx.fillRect(0, 0, WIDTH, HEIGHT);

            for (var i = 0; i < bufferLength; i++) {
                barHeight = dataArray[i];

                var r = barHeight + 25 * (i / bufferLength);
                var g = 250 * (i / bufferLength);
                var b = 50;

                ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
                ctx.fillRect(x, HEIGHT - barHeight / 2.5, barWidth/2.5, barHeight / 2.5);

                x += barWidth + 1;
            }
        }

        const btns = this.shadowRoot.querySelectorAll(".btn-main");

        btns.forEach((btn) => {
            btn.addEventListener("click", () => {
               
            

                if (btn.querySelector("span").innerText === "play_arrow") {

                    btn.querySelector("span").innerText = "pause"

                    manager.trackID = parseInt(btn.getAttribute("id"))
                    manager.switchSource();
                    manager.play();
                    renderFrame();
                    this.shadowRoot.querySelector(".title-text" + manager.trackID).style.color = "#e75709";
                } else {
                    console.log("clciked")
                    manager.pause();
                    btn.querySelector("span").innerText = "play_arrow"
                    this.shadowRoot.querySelector(".title-text" + manager.trackID).style.color = "#fff";
                }
            });
        });

       manager.audio.addEventListener('play', () => {

            const btn = this.shadowRoot.querySelector(".btn-main" + manager.trackID)
            const canvass = this.shadowRoot.querySelectorAll("canvas");
            canvass.forEach((canv) => {
                const ctx = canv.getContext("2d");
                const WIDTH = canv.width;
                const HEIGHT = canv.height;
                ctx.fillStyle = "#303034";
                ctx.fillRect(0, 0, WIDTH, HEIGHT);
        
            });

            const titles = this.shadowRoot.querySelectorAll(".title-text");

            titles.forEach((title) => {
                title.style.color = "#fff";
            });

            const spans = this.shadowRoot.querySelectorAll(".btn-main span");

            spans.forEach((span) => {
                span.innerText = "play_arrow";
            })

            if (btn.querySelector("span").innerText === "play_arrow") {

                btn.querySelector("span").innerText = "pause"

              
                renderFrame();
                this.shadowRoot.querySelector(".title-text" + manager.trackID).style.color = "#e75709";
            } else {

                renderFrame();
                btn.querySelector("span").innerText = "play_arrow"
                this.shadowRoot.querySelector(".title-text" + manager.trackID).style.color = "#fff";
            }
        });
    }

    get template() {

        const manager = new AudioManager();

        let template = '';

        manager.tracks.forEach((track, i) => {
            template += `  <li>
            <div class="visual"><canvas id="canvas${i}"></canvas></div>
            <div class="image">
                <img src="https://nouhaila1998.github.io/music-player/assets/covers/cover${i + 1}.jpg" alt="music" width="30" height="30" />
            </div>
            <div class="title">
                <span class="title-text title-text${i}">${track}</span>
            </div>
            <div class="action">
                <button class="btn-main btn-main${i}" id="${i}">
                <span class="material-symbols-outlined">
                    play_arrow
                </span>
            </button>
            </div>
        </li>`
        });
        return `
            ${this.style}
            <ul>
              ${template}
             </ul>
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
      
          ul {
            list-style: none;
            max-width:325px;
          }
      
          li {
            background: #303034;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #fff;
            border-radius: 5px;
            margin: 5px;
            box-shadow: inset 0px 1px 1px #696969, 0px 5px 10px #040404;
          }
          li div {
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 3px;
          }
      
          .action{
            margin-right: 15px;
          }
          .title {
            width: 200px;
            height: 30px;
            justify-content: start;
          }
      
          .image {
            margin-left: 0;
          }
          img{
            border-radius: 6px;
          }
          canvas {
            width: 20px;
            height: 30px;
          }
          .visual {
            margin-left: 2px;
            margin-right: 3px;
          }
      
      .title-text{
        font-size: 0.8em;
      }
      
      .btn-main{
          background: linear-gradient(-60deg, #c72611,#e75709);
          border: none;
          box-shadow: 0.3em 0.3em 0.8em #151618, -0.3em -0.3em 0.5em #33353b;
          width: 2em;
          height: 2em;
          border: 0.2em #1c2023 solid; 
          border-radius: 50%;
          cursor: pointer;
        
      }
      
      .btn-main:hover{
          background: linear-gradient(60deg, #c72611,#e75709);
      }
      
      
      
      .btn-main span{
          color: #fff;
          font-size: 1em;
          display: flex;
          justify-content: center;
          align-items: center;
      }
            </style>
        `;
    }
}

customElements.define("app-list", List);