#!/usr/bin/env node
const build = require("./index")
const args = process.argv.slice(2)
build(args[0], args[1])
