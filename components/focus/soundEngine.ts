"use client";

// Web Audio API ambient sound synthesis engine
// Generates soothing rain, wind/forest, coffeehouse low-rumble, and vinyl crackle
// No external mp3 downloads required, works offline & cross-platform!

class AmbientSoundEngine {
  private ctx: AudioContext | null = null;
  private currentType: string = "none";
  private gainNode: GainNode | null = null;
  private noiseNode: AudioNode | null = null;
  private filterNode: BiquadFilterNode | null = null;
  private intervalId: NodeJS.Timeout | null = null;

  private initContext() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  public play(type: "none" | "rain" | "coffee" | "forest" | "vinyl", volume = 0.5) {
    this.stop();
    this.currentType = type;

    if (type === "none") return;

    this.initContext();
    if (!this.ctx) return;

    // Master Gain
    this.gainNode = this.ctx.createGain();
    this.gainNode.gain.setValueAtTime(volume * 0.4, this.ctx.currentTime);
    this.gainNode.connect(this.ctx.destination);

    // Buffer size: 2 seconds
    const bufferSize = this.ctx.sampleRate * 2;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);

    // Generate Pink / Brown noise for organic textures
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      if (type === "rain") {
        // Pink noise approximation for rainfall
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
        b6 = white * 0.115926;
      } else if (type === "forest") {
        // Soft brown noise for rustling wind
        b0 = (b0 + 0.02 * white) / 1.02;
        data[i] = b0 * 3.5;
      } else if (type === "coffee") {
        // Low ambient rumble for coffeehouse background
        b0 = (b0 + 0.03 * white) / 1.03;
        data[i] = b0 * 2.8;
      } else {
        // Vinyl crackle (occasional pops + low dust)
        const isPop = Math.random() < 0.0008;
        data[i] = isPop ? (Math.random() * 2 - 1) * 0.9 : white * 0.02;
      }
    }

    const noiseSource = this.ctx.createBufferSource();
    noiseSource.buffer = buffer;
    noiseSource.loop = true;

    // Filter Node for realistic sound shaping
    this.filterNode = this.ctx.createBiquadFilter();

    if (type === "rain") {
      this.filterNode.type = "lowpass";
      this.filterNode.frequency.setValueAtTime(1400, this.ctx.currentTime);
    } else if (type === "forest") {
      this.filterNode.type = "bandpass";
      this.filterNode.frequency.setValueAtTime(450, this.ctx.currentTime);
      this.filterNode.Q.setValueAtTime(1.2, this.ctx.currentTime);
    } else if (type === "coffee") {
      this.filterNode.type = "lowpass";
      this.filterNode.frequency.setValueAtTime(500, this.ctx.currentTime);
    } else if (type === "vinyl") {
      this.filterNode.type = "bandpass";
      this.filterNode.frequency.setValueAtTime(2200, this.ctx.currentTime);
    }

    noiseSource.connect(this.filterNode);
    this.filterNode.connect(this.gainNode);
    noiseSource.start();
    this.noiseNode = noiseSource;
  }

  public setVolume(volume: number) {
    if (this.gainNode && this.ctx) {
      this.gainNode.gain.setValueAtTime(volume * 0.4, this.ctx.currentTime);
    }
  }

  public stop() {
    if (this.noiseNode) {
      try {
        (this.noiseNode as AudioBufferSourceNode).stop();
        this.noiseNode.disconnect();
      } catch (e) {
        // ignore already stopped
      }
      this.noiseNode = null;
    }
    if (this.filterNode) {
      this.filterNode.disconnect();
      this.filterNode = null;
    }
    if (this.gainNode) {
      this.gainNode.disconnect();
      this.gainNode = null;
    }
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.currentType = "none";
  }
}

export const soundEngine = typeof window !== "undefined" ? new AmbientSoundEngine() : null;
