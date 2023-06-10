import validator  from 'validator'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { addNote, listNotes, removeNote, readNote } from './notes.js'

const _yargs = yargs(hideBin(process.argv))

// Adding
_yargs.command('add', 'Add new note', 
    yargs => yargs.positional('title', {
        describe: 'Title of the note',
        type: 'string'
    })
    .positional('body', {
        describe: 'Description of the note',
        type: 'string'
    }).demandOption(['title', 'body']),
    addNote
)

// Read
_yargs.command('read', 'Reading notes',
    yargs => yargs.positional('title', {
        describe: 'Title of the note',
        type: 'string'
    }).demandOption(['title']),
    readNote
)

// List
_yargs.command('list', 'Listing all notes', listNotes)

// Removing
_yargs.command('remove', 'Removing a note',
    yargs => yargs.positional('title', {
        describe: 'Title of the note',
        type: 'string'
    }),
    removeNote
)

_yargs.parse()