/**
 * Generates the audible click sound for a single metronome beat.
 *
 * Responsible only for sound synthesis (oscillator + gain envelope).
 * Does not know anything about tempo, beat counting, or scheduling —
 * that stays in the metronome itself.
 */

const ACCENT_FREQUENCY_HZ = 1000;
const REGULAR_FREQUENCY_HZ = 800;
const CLICK_DURATION_SECONDS = 0.03;
const GAIN_RAMP_TARGET = 0.001;

export interface ClickSoundOptions {
  /** AudioContext time at which the click should sound. */
  time: number;
  /** Whether this click is the first beat of a bar (higher pitch). */
  isAccent: boolean;
  /** Volume in the 0–1 range. */
  volume: number;
}

/**
 * Creates a click sound generator bound to a given AudioContext.
 */
export function createSoundGenerator(audioContext: AudioContext) {
  const play = ({ time, isAccent, volume }: ClickSoundOptions): void => {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.frequency.value = isAccent
      ? ACCENT_FREQUENCY_HZ
      : REGULAR_FREQUENCY_HZ;

    gainNode.gain.setValueAtTime(volume, time);
    gainNode.gain.exponentialRampToValueAtTime(
      GAIN_RAMP_TARGET,
      time + CLICK_DURATION_SECONDS,
    );

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start(time);
    oscillator.stop(time + CLICK_DURATION_SECONDS);
  };

  return { play };
}

export type SoundGenerator = ReturnType<typeof createSoundGenerator>;
