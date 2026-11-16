/**
 * BESPOKE SUNLIT MORNING SANTOOR-HARP & CHIME AUDIO ENGINE (Web Audio API)
 * Zero external MP3 dependencies — synthesizes a crystalline morning wind-chime
 * flourish when breaking the 24K gold wax seal, followed by an uplifting
 * Dmaj7 – Bm9 – Gmaj7 – A6 sunlit acoustic santoor-harp progression.
 */
(function (root) {
  class MorningConservatoryAudio {
    constructor() {
      this.ctx = null;
      this.masterGain = null;
      this.isPlaying = false;
      this.loopTimer = null;
      this.barIndex = 0;

      // Joyful sunlit D-Major morning harp/santoor voicings (Hz)
      this.progression = [
        // Dmaj7: D4, F#4, A4, C#5, F#5
        [293.66, 369.99, 440.0, 554.37, 739.99],
        // Bm9: B3, F#4, A4, C#5, D5
        [246.94, 369.99, 440.0, 554.37, 587.33],
        // Gmaj7(#11): G3, D4, F#4, B4, C#5
        [196.0, 293.66, 369.99, 493.88, 554.37],
        // A6: A3, E4, F#4, C#5, E5
        [220.0, 329.63, 369.99, 554.37, 659.25]
      ];
    }

    init() {
      if (this.ctx) return;
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = 0.0001;
      this.masterGain.connect(this.ctx.destination);
    }

    playResonantString(freq, startTime, duration = 2.4, peakGain = 0.12) {
      if (!this.ctx || !this.masterGain) return;

      const oscFundamental = this.ctx.createOscillator();
      const oscShimmer = this.ctx.createOscillator();
      const oscFifth = this.ctx.createOscillator();
      const envGain = this.ctx.createGain();
      const shimmerGain = this.ctx.createGain();
      const fifthGain = this.ctx.createGain();

      oscFundamental.type = "sine";
      oscFundamental.frequency.setValueAtTime(freq, startTime);

      oscShimmer.type = "triangle";
      oscShimmer.frequency.setValueAtTime(freq * 2, startTime);
      shimmerGain.gain.setValueAtTime(0.16, startTime);

      oscFifth.type = "sine";
      oscFifth.frequency.setValueAtTime(freq * 3, startTime);
      fifthGain.gain.setValueAtTime(0.045, startTime);

      envGain.gain.setValueAtTime(0.0001, startTime);
      envGain.gain.exponentialRampToValueAtTime(peakGain, startTime + 0.028);
      envGain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

      oscFundamental.connect(envGain);
      oscShimmer.connect(shimmerGain);
      shimmerGain.connect(envGain);
      oscFifth.connect(fifthGain);
      fifthGain.connect(envGain);
      envGain.connect(this.masterGain);

      const stopAt = startTime + duration + 0.05;
      oscFundamental.start(startTime);
      oscShimmer.start(startTime);
      oscFifth.start(startTime);
      oscFundamental.stop(stopAt);
      oscShimmer.stop(stopAt);
      oscFifth.stop(stopAt);
    }

    playSealBreakChime() {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === "suspended") {
        this.ctx.resume().catch(() => {});
      }

      const now = this.ctx.currentTime;
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.setValueAtTime(0.12, now);

      // Sunlit D-major pentatonic / Lydian wind-chime cascade
      const chimeNotes = [587.33, 739.99, 880.0, 1108.73, 1174.66, 1479.98];
      chimeNotes.forEach((hz, idx) => {
        this.playResonantString(hz, now + idx * 0.095, 2.3, 0.115);
      });
    }

    start() {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === "suspended") {
        this.ctx.resume().catch(() => {});
      }
      if (this.isPlaying) return;

      this.isPlaying = true;
      const now = this.ctx.currentTime;
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.setValueAtTime(Math.max(this.masterGain.gain.value, 0.001), now);
      this.masterGain.gain.linearRampToValueAtTime(0.105, now + 0.75);

      const scheduleMeasure = () => {
        if (!this.isPlaying || !this.ctx) return;
        const voicing = this.progression[this.barIndex % this.progression.length];
        this.barIndex += 1;
        const t0 = this.ctx.currentTime + 0.05;

        // Warm acoustic bass resonance
        this.playResonantString(voicing[0] * 0.5, t0, 3.8, 0.095);

        // Cascading santoor-harp arpeggio
        voicing.forEach((hz, idx) => {
          this.playResonantString(hz, t0 + idx * 0.48, 2.7, 0.1);
        });

        // Delicate high sunlit bell echo
        this.playResonantString(voicing[3] * 2, t0 + 2.85, 2.1, 0.055);
      };

      scheduleMeasure();
      this.loopTimer = window.setInterval(scheduleMeasure, 3800);
    }

    stop() {
      if (!this.ctx || !this.isPlaying) return;
      this.isPlaying = false;
      if (this.loopTimer) {
        window.clearInterval(this.loopTimer);
        this.loopTimer = null;
      }
      const now = this.ctx.currentTime;
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.setValueAtTime(Math.max(this.masterGain.gain.value, 0.001), now);
      this.masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);
    }

    toggle() {
      if (this.isPlaying) {
        this.stop();
        return false;
      }
      this.start();
      return true;
    }
  }

  root.morningAudio = new MorningConservatoryAudio();
})(typeof globalThis !== "undefined" ? globalThis : window);
