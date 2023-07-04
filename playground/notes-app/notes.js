import chalk from "chalk"
import fs from 'fs'

const saveNotes = (notes) => {
    const notesJson = JSON.stringify(notes)
    fs.writeFileSync('notes.json', notesJson)
}

const loadNotes = () => {
    try {
        return JSON.parse(fs.readFileSync('notes.json').toString())
    } catch (e) {
        return []
    }
}

const addNote = (argv) => {
    const {title, body } = argv
    const notes = loadNotes()
    const duplicateNote = notes.find(note => note.title === title)

    if(!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('New note has been added'))
    } else {
        console.log(chalk.red.inverse('Note title is taken'))
    }
}

const listNotes = () => {
    console.log(chalk.green.inverse('Your notes are'))
    loadNotes().forEach((note) => console.log(chalk.green(note.title)))
}

const readNote = (argv) => {
    const { title } = argv
    const note = loadNotes().find(note => note.title === title)
    
    console.log(!!note ? note : chalk.red.inverse('Error'))
}

const compareArrays = (a, b) => {
    return a.toString() === b.toString();
}

const removeNote = (argv) => {
    const { title } = argv
    const notes = loadNotes()

    const filteredNotes = notes.filter((note) => note.title !== title)

    if(!compareArrays(filteredNotes, notes)) {
        saveNotes(filteredNotes)
        console.log(chalk.green.inverse(`Note with title ${chalk.green(title)} has been successfully removed`))
    } else {
        console.log(chalk.red.inverse(`No title was found...`))
    }

}

export {
    addNote,
    listNotes,
    readNote,
    removeNote,
}