#!/usr/bin/env node

'use strict' // 2021-04-04 09.07

void function main ()
{
    const now = new Date()
    now.setMilliseconds(0)

    process.addListener('uncaughtException', err =>
    {
        console.error(err.message || err)
        console.log('run "tbtw -help" to display the readme')
        process.exit(1)
    })

    const args = process.argv.slice(2)

    if (!args.length)
    {
        throw `tbtw timestamp1 [timestamp2]`
    }

    if (args.includes('-help'))
    {
        const readme = require('fs').readFileSync(__dirname + '/README.md', 'utf8')
        console.log(readme.match(/```([\s\S]*?)```/)[1].trim())
        process.exit()
    }

    if (args.length > 2)
    {
        throw `expected 1-2 arguments, got ${ args.length }`
    }

    for (let i = 0; i < args.length; i++)
    {
        if (
            /^\d\d:\d\d$/.test(args[i]) ||
            /^\d\d:\d\d:\d\d$/.test(args[i]) ||
            /^\d\d:\d\d:\d\d\.\d\d\d$/.test(args[i])
        )
        {
            args[i] = `${ now.getFullYear() }-${ (now.getMonth() + 1).toString().padStart(2, '0') }-${ now.getDate().toString().padStart(2, '0') }T${ args[i] }Z`
        }
        else if (
            /^\d\d\d\d$/.test(args[i]) ||
            /^\d\d\d\d-\d\d$/.test(args[i]) ||
            /^\d\d\d\d-\d\d-\d\d$/.test(args[i])
        )
        {
            args[i] = args[i] + 'T00:00Z'
        }
        else if (
            /^\d\d\d\d-\d\d-\d\dT\d\d:\d\d$/.test(args[i]) ||
            /^\d\d\d\d-\d\d-\d\dT\d\d:\d\d:\d\d$/.test(args[i])
        )
        {
            args[i] += 'Z'
        }
        else
        {
            throw `invalid timestamp format: ${ args[i] }`
        }
    }

    if (!args[1])
    {
        args[1] = `${ now.getFullYear() }-${ (now.getMonth() + 1).toString().padStart(2, '0') }-${ now.getDate().toString().padStart(2, '0') }` +
            `T${ now.getHours().toString().padStart(2, '0') }:${ now.getMinutes().toString().padStart(2, '0') }:${ now.getSeconds().toString().padStart(2, '0') }Z`
    }

    const d1 = new Date(args[0])
    const d2 = new Date(args[1])
    const t1 = d1.getTime()
    const t2 = d2.getTime()
    console.log((t1 > t2 ? d2 : d1).toISOString().replace('T', ' ').slice(0, 19))
    console.log((t1 > t2 ? d1 : d2).toISOString().replace('T', ' ').slice(0, 19))

    const diff = Math.abs(t1 - t2)
    if (!diff) return console.log('0')
    let subt = diff

    if (subt >= 86400000)
    {
        const n = Math.floor(subt / 86400000)
        process.stdout.write(`${ n } day${ n > 1 ? 's' : '' } `)
        subt = subt % 86400000
    }

    if (subt >= 3600000)
    {
        const n = Math.floor(subt / 3600000)
        process.stdout.write(`${ n } hour${ n > 1 ? 's' : '' } `)
        subt = subt % 3600000
    }

    if (subt >= 60000)
    {
        const n = Math.floor(subt / 60000)
        process.stdout.write(`${ n } minute${ n > 1 ? 's' : '' } `)
        subt = subt % 60000
    }

    if (subt)
    {
        const n = subt / 1000
        process.stdout.write(`${ n } second${ n > 1 ? 's' : '' }`)
    }

    process.stdout.write('\n')
}()