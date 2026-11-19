class SoundEffectsManager {
  private ctx: AudioContext | null = null;
  public muted = false;

  private getContext(): AudioContext | null {
    if (this.muted || typeof window === 'undefined') return null;
    try {
      if (!this.ctx) {
        const AudioCtx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (!AudioCtx) return null;
        this.ctx = new AudioCtx();
      }
      if (this.ctx.state === 'suspended') {
        void this.ctx.resume();
      }
      return this.ctx;
    } catch {
      return null;
    }
  }

  private playTone(
    freq: number,
    duration: number,
    type: OscillatorType = 'sine',
    delay = 0,
    gainPeak = 0.12
  ) {
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime + delay;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(gainPeak, now + 0.018);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + duration + 0.02);
  }

  public playTap() {
    this.playTone(523.25, 0.11, 'sine', 0, 0.1);
  }

  public playCoinAdd() {
    this.playTone(659.25, 0.09, 'triangle', 0, 0.1);
    this.playTone(880, 0.14, 'sine', 0.055, 0.09);
  }

  public playRemove() {
    this.playTone(440, 0.08, 'sine', 0, 0.08);
    this.playTone(349.23, 0.11, 'sine', 0.04, 0.07);
  }

  public playCorrect() {
    this.playTone(523.25, 0.13, 'triangle', 0, 0.11);
    this.playTone(659.25, 0.13, 'triangle', 0.09, 0.11);
    this.playTone(783.99, 0.24, 'sine', 0.18, 0.13);
  }

  public playCelebrate() {
    this.playTone(523.25, 0.12, 'triangle', 0, 0.11);
    this.playTone(659.25, 0.12, 'triangle', 0.08, 0.11);
    this.playTone(783.99, 0.12, 'triangle', 0.16, 0.11);
    this.playTone(1046.5, 0.34, 'sine', 0.24, 0.14);
  }

  public playGentleRetry() {
    this.playTone(392, 0.14, 'sine', 0, 0.08);
    this.playTone(329.63, 0.2, 'sine', 0.11, 0.07);
  }
}

export const soundFx = new SoundEffectsManager();

export function speakIndonesian(text: string) {
  if (soundFx.muted || typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return;
  }
  try {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'id-ID';
    utterance.rate = 0.92;
    utterance.pitch = 1.05;
    window.speechSynthesis.speak(utterance);
  } catch {
    // Graceful fallback if speech synthesis is unavailable
  }
}
