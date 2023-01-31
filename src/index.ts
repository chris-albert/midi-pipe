import {MIDI} from "./MIDI";
const PassThrough = require('stream').PassThrough

console.log('MIDI Pipe')

const midi = new MIDI()

console.log(midi.getInputDevices())
console.log(midi.getOutputDevices())

const virtualStream = midi.virtualPortStream("chris midi pipe")

const pipeToPorts = [1, 2, 3, 4]

pipeToPorts.forEach(portNum => {
  const pt = new PassThrough()
  virtualStream.pipe(pt)
  pt.pipe(midi.getOutputStream(portNum))
})
