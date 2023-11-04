import { spawn } from 'child_process'
import readline from 'node:readline'
import { stdin, stdout } from 'node:process'
import { createHash } from 'node:crypto'

import playRandomSound from './sound.js'

const rl = readline.createInterface({ input: stdin, output: stdout })

rl.prompt()
rl.on('line', (line) => {
  console.log(
    JSON.stringify(
      {
        line,
      },
      null,
      2,
    ),
  )

  playRandomSound(line)

  console.log('')

  rl.prompt()
})
