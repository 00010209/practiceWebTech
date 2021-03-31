const express = require('express')
const router = express.Router()
const fs =require('fs')
const path = require('path')
const DB = `${ rootFolder }/data/notes.json`
const rootFolder = path.dirname(
    require.main.filename || process.require.main.filename
)

router.get('/', (req, res) => {
    
    fs.readFile(DB, (err, data) => {
        if (err) throw err

        const notes = JSON.parse(data)

        res.render('notes', { noteList: notes})
    })


    res.render('notes', { noteList: notes.length == 0 ? false :notes })
})


router.get('/:id', (req, res) => {
    const id = req.params.id

	fs.readFile(DB, (err, data) => {
        if(err) throw err
        const notes = JSON.parse(data)
        const note = notes.filter(note => note.id == id)[0]

        res.render('detail', {noteDetail: note})
    })

    res.render('detail')
})

router.get('/:id/delete', (req,res) => {
    const id = req.params.id

    fs.readFile(DB, (err, data) => {
        if(err) throw err
        const notes = JSON.parse(data)
        const filteredNotes = notes.filter(note => note.id != id)[0]

        fs.writeFile(DB, JSON.stringfy(filteredNotes), err =>{
            if (err) throw err

            res.render('notes', {noteList: filteredNotes, deletedNote: id})
        })
    })
})


module.exports = router
