/* eslint-disable max-classes-per-file */

globalThis.Audio = globalThis.Audio ?? class {};

export class VFAudio extends globalThis.Audio {
  play(src?: string) {
    if (src) {
      this.src = src;
    }

    return super.play();
  }

  stop(): void {
    this.pause();
    this.currentTime = 0;

    const event = new CustomEvent('stopped');
    this.dispatchEvent(event);
  }
}

class AudioService {
  public audio: VFAudio | null = null;

  public pause(): void {
    this.audio?.pause();
  }

  public stop(): void {
    this.audio?.stop();
  }

  public continue(): void {
    this.audio?.play();
  }

  public playURL = (url: string) => {
    this.play(new VFAudio(url));
  };

  public play = (audio: VFAudio) => {
    this.audio?.stop();

    this.audio = audio;
    this.audio.play();
  };
}

export const audioService = new AudioService();
