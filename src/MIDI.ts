import {Stream} from "ts-stream";

const midi = require('midi')

export class MIDI {

  input: any
  output: any

  constructor() {
    console.log("MIDI initialize")
    this.input = new midi.Input()
    this.output = new midi.Output()
  }

  getInputDevices(): Array<string> {
    const input = new midi.Input()
    const devices: Array<string> = []
    const inputCount = input.getPortCount()
    for(let i = 0; i < inputCount; i++) {
      devices.push(input.getPortName(i))
    }
    return devices
  }

  getOutputDevices(): Array<string> {
    const devices: Array<string> = []
    const outputCount = this.output.getPortCount()
    for(let i = 0; i < outputCount; i++) {
      devices.push(this.output.getPortName(i))
    }
    return devices
  }

  getOutputStream(index: number): Stream<any> {
    const output = new midi.Output()
    output.openPort(index)
    return midi.createWriteStream(output)
  }

  virtualPortStream(name: string): Stream<any> {
    const input = new midi.Input();
    input.openVirtualPort(name)
    return midi.createReadStream(input)
  }
}