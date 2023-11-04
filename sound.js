import { spawn } from 'child_process'
import { createHash } from 'node:crypto'
import { debounce } from 'lodash-es'

function playRandomSound(string) {
  const sum = createHash('sha256')
    .update(string)
    .digest()
    .reduce((acc, x) => acc + x, 0)

  const type = 'square'
  const gain = '-24'
  const tone1 = 12 - (sum % 25)
  const tone2 = tone1 - (1 + (sum % 12))
  const command = `
    synth 0.12 ${type} %${tone1} gain ${gain} :
    synth 0.12 ${type} %${tone2} gain ${gain} delay 0.06
  `
    .replace(/\n/g, '')
    .trim()
    .split(/ +/g)

  // SoX
  spawn('play', ['-n', ...command])
}

// Play a sound immediately unless another is played within last 1 second.
export default debounce(playRandomSound, 1000, {
  leading: true,
  trailing: false,
})
