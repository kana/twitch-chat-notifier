import { spawn } from 'child_process'
import { createHash } from 'node:crypto'
import tmi from 'tmi.js'
import playRandomSound from './sound.js'

const client = new tmi.Client({
  channels: ['whileimautomaton'],
  options: {
    // Skip unused notifications.
    skipMembership: true,
  },
})

client.on('connected', (addr, port) => {
  console.log(`*** Connected to ${addr}:${port}`)
})

client.on('message', (channel, tags, message, self) => {
  const name = tags['display-name'] ?? tags['username']
  const sentAt = new Date(
    Number.parseInt(tags['tmi-sent-ts'], 10),
  ).toISOString()
  console.log(`${sentAt} ${name}: ${message}`)

  playRandomSound(name)
})

client.connect()
