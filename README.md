# Metronome

A headless metronome built on top of the Web Audio API.

```
npm install @dougflip/metronome
```

## Basic Usage

Plays a "click" sound on each beat using the Web Audio API.
Allows you to update the tempo and volume after creation.

```tsx
import { createMetronome } from "@dougflip/metronome";

const metronome = createMetronome({
  tempo: 60, // as beats per minute
  beatsPerBar: 4,
  volume: 50, // value from 0-100
});

// the Web Audio API requires a user event to trigger sound!
// make sure you call `start` in response to a user event
function handleMetronomeStartClick() {
  metronome.start();
}

// Update tempo or volume - from form control inputs for example
function handleMetronomeUpdate({ tempo, volume }) {
  metronome.updateConfig({ tempo, volume });
}

// sometime later, when you are done
function handleMetronomeStopClick() {
  metronome.stop();
}
```

## Events

There are also several supported events which can be configured

- `onBeatStart`: A callback that fires at the start of each beat.
  Useful to trigger visual cues or other events.

- `beatInterval`: A configuration that allows you to set a specific interval of beats
  to trigger an event. For example, you can set it to fire every 4 beats.

- `maxBeats`: A configuration that allows you to set the total number of beats
  before the metronome stops automatically.
  This includes an optional `onEnd` callback that fires when the metronome stops.

```tsx
import { createMetronome } from "@dougflip/metronome";

const metronome = createMetronome({
  tempo: 60,
  volume: 50,
  beatsPerBar: 4,

  // fires on every beat
  //   - `beatsPerBar`: beat number relative to `beatsPerBar`
  //   - `totalBeats`: total number of beats since start
  onBeatStart: ({ beatNumber, totalBeats }) =>
    console.log({ beatNumber, totalBeats }),

  // fire an event every 4 beats - starting on beat 1.
  // in this case, beats 1, 5, 9, etc., corresponding to the start of every measure
  beatInterval: {
    count: 4,
    onBeatInterval: ({ currentInterval }) => console.log(currentInterval),
  },

  // play for a maximum of 10 measures (4 beatsPerBar times 10 measures)
  // the last beat will last its full length and then `onEnd` will fire
  maxBeats: {
    count: 4 * 10,
    onEnd: () => console.log("metronome has stopped"),
  },
});
```

## Local Development

```sh
# select correct node
nvm use

# install deps
npm install

# build the code
npm run build

# verify the code and build
npm run check
```

## Tests

👷 Under construction 👷

I think the state management logic could be better extracted and unit tested.
But short term, I am more interested in trying to write some functional tests
where we actually run the code in a real browser and verify it.
That is likely where I will start.

## Inspiration and Credit

An original version of this metronome was based upon:

- https://github.com/grantjames/metronome
- https://grantjam.es/creating-a-simple-metronome-using-javascript-and-the-web-audio-api/

This version was built using the same principles but adds events and state tracking.
Most of the actual code was written by Claude.ai

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.
