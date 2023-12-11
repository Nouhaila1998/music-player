import {List} from './List.js';
import {Player} from './Player.js';
import {Controls} from './Controls.js';
import {Visualizer} from './Visualizer.js';
export class App extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.render();
    }

    render(){
        this.shadowRoot.innerHTML = this.template;
    }

    get template(){
        return `
            ${this.style}
            <main>
                <div class="container">

                    <div class="row">

                        <div class="col-lg-4 d-flex justify-content-center align-items-center">
                                <app-player></app-player>
                        </div>


                        <div class="col-lg-8">

                                <div class="row">

                                    <div class="col-lg-6 d-flex justify-content-center align-items-center">
                                        <app-list></app-list>      
                                    </div>

                                    <div class="col-lg-6 d-flex justify-content-center align-items-center">

                                   <app-visualizer></app-visualizer>
                                    </div>

                                </div>


                                <div class="row">
                                        <div class="col-lg-12 d-flex justify-content-center align-items-center">
                                           <app-controls></app-controls>
                                        </div>
                                </div>
                       
                        
                        </div>

                    </div>

                </div>
        </main>
        `;
    }

    get style(){
        return `
            <style>
                @import url("https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css");

                
                main{
                    height: 100%;
                    display:flex;
                    justify-content:center;
                    align-items:center;
                }

                body {
                    background-repeat: no-repeat;
                    background-attachment: fixed;
                    background-size: cover;
                  }
            </style>
        `;
    }
}

customElements.define("app-component", App);
