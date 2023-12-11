export default class AudioManager {
    constructor() {
        if (!AudioManager.instance) {
            this.#declare();

            AudioManager.instance = this;
        }

        return AudioManager.instance;
    }

    #declare() {
        this.trackID = 0;
        this.trackPlaying = false;
        this.tracks = [
            "Immortal", "No Talk", "Enough", "Skylines", "Get Through", "Lofi Mallet", "Winning"
        ];
        this.artists = [
            "NEFFEX", "VYEN", "NEFFEX", "Anno Domini Beats", "NEFFEX", "Kwon", "NEFFEX"
        ];
        this.covers = [
            "cover1", "cover2", "cover3", "cover4", "cover5", "cover6", "cover7"
        ];
        this.audioContext = new AudioContext();
        this.trackSource = "./../assets/tracks/" + this.tracks[this.trackID] + '.mp3';
        this.audio = new Audio(this.trackSource);
        this.src = this.audioContext.createMediaElementSource(this.audio);
        this.panner = this.audioContext.createStereoPanner();
        this.analyserVisualizer = this.audioContext.createAnalyser();
        this.analyserPlayer = this.audioContext.createAnalyser();
        this.analyserList = this.audioContext.createAnalyser();
        this.analyserVisualizer.fftSize = 512;
        this.analyserPlayer.fftSize = 256;
        this.analyserList.fftSize = 32;
        this.gainNode = this.audioContext.createGain();

        this.filters = [];

        const freqs = [20, 100, 300, 1000, 5000, 10000];

        for (let i = 0; i < freqs.length; i++) {
            let eq = this.audioContext.createBiquadFilter();
            eq.frequency.value = freqs[i];
            eq.type = "peaking";
            eq.gain.value = 0;
            this.filters.push(eq);

        }


        // Connect filters and panner
        this.src
            .connect(this.panner)
            .connect(this.filters[0]);

        for (var i = 0; i < this.filters.length - 1; i++) {
            this.filters[i].connect(this.filters[i + 1]);
        }

        // connect the last filter to the speakers
        this.filters[this.filters.length - 1]
            .connect(this.gainNode)
            .connect(this.analyserVisualizer)
            .connect(this.analyserList)
            .connect(this.analyserPlayer)
            .connect(this.audioContext.destination);
    }

    switchSource() {
        this.trackSource = "./../assets/tracks/" + this.tracks[this.trackID] + '.mp3';
        this.audio.src = this.trackSource;
        this.audio.load();
    }
    play() {
        if (this.audioContext.state == "suspended") {
            this.audioContext.resume();
        }
        this.audio.play();
        this.trackPlaying = true;
    }

    plus10() {
        if (this.audioContext.state == "running") {
            this.audio.currentTime += 10;
        }

    }
    minus10() {
        if (this.audioContext.state == "running") {
            this.audio.currentTime -= 10;
        }

    }


    pause() {

        this.audio.pause();
        this.trackPlaying = false;
    }


}

