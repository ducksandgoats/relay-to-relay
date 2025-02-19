#!/usr/bin/env node

import minimist from 'minimist'
import {Server} from '../index.js'
// import path from 'path'
// import fs from 'fs'

const argv = minimist(process.argv.slice(2), {
  alias: {
    h: 'help',
    v: 'version'
  },
  boolean: [
    'help',
    // 'turnon',
    // 'turnoff',
    'version',
    'ev',
    'relay'
  ],
  string: [
    'domain',
    'host',
    'hashes',
    'server'
  ],
  default: {
    'port': 10509,
    'host': '0.0.0.0',
    'domain': '',
    'hashes': '',
    'user': {},
    'init': true,
    'timer': {},
    'limit': {},
    'ev': false,
    'relay': false,
    'server': '0.0.0.0'
  }
})

if (argv.version) {
  console.log(require('../package.json').version)
  process.exit(0)
}

if (argv.help) {
  console.log((() => {
  /*
  bittorrent-tracker - Start a bittorrent tracker server

  Usage:
    bittorrent-tracker [OPTIONS]

  If no --http, --udp, or --ws option is supplied, all tracker types will be started.

  Options:
    -p, --port [number]           change the port [default: 8000]
        --http-hostname [string]  change the http server hostname [default: '::']
        --udp-hostname [string]   change the udp hostname [default: '0.0.0.0']
        --udp6-hostname [string]  change the udp6 hostname [default: '::']
        --trust-proxy             trust 'x-forwarded-for' header from reverse proxy
        --interval                client announce interval (ms) [default: 600000]
        --http                    enable http server
        --udp                     enable udp server
        --ws                      enable websocket server
        --stats                   enable web-based statistics (default: true)
    -q, --quiet                   only show error output
    -s, --silent                  show no output
    -v, --version                 print the current version

  */
  }).toString().split(/\n/).slice(2, -2).join('\n'))
  process.exit(0)
}

const server = new Server({
  timer: argv['timer'],
  trustProxy: argv['trust-proxy'],
  domain: argv['domain'],
  host: argv['host'],
  port: argv['port'],
  hashes: argv['hashes'],
  init: argv['init'],
  domain: argv['domain']
})

server.on('listening', (which) => {
  console.log('listening', which)
})

if(argv['ev']){
  server.on('ev', (e) => {
    console.log(e)
  })
}

server.on('error', (err) => {
  console.error('close', err)
})

server.on('close', (which) => {
  console.log('close', which)
})