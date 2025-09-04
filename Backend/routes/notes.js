const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require("../models/Note");
const { body, validationResult } = require('express-validator');

// ROUTE:1 - Get All the notes Using: GET "/api/notes/fetchallnotes". Login required
router.get('/fetchallnotes', fetchuser, async (req,res)=>{
    try{
        // Log the user ID being used for the query
        console.log("Fetching notes for user ID:", req.user._id);

        const notes = await Note.find({user: req.user.id});
        console.log("Notes found:", notes);    
        res.json(notes);
    }
    catch (error){
      console.error(error.message);
      res.status(500).send("Internal Server Error occured at notes.js,  /fetchallnotes !!")
    }

})

// ROUTE:2 - Add a new note Using: POST "/api/notes/addnote". Login required
router.post('/addnote',
    fetchuser,
    [
        body('title', 'Enter a Valid title min 3').isLength({ min: 3 }),
        body('description', 'Description must be atleast 5 characters').isLength({ min: 5 })
    ], 
    async (req,res)=>{
        try{
            // Destructuring and bringing out notes componenets
            const {title, description, tag, reminder } = req.body;

            //If there are errors, return Bad request and the errors
            const error = validationResult(req);
            if (!error.isEmpty()) {
            return res.status(400).json({ errors: error.array()});
            }

            //Creating new Notes
            const note = new Note({
                title, description, tag, reminder, user: req.user.id
            })
            const savedNote = await note.save();
            res.json(savedNote)
        }
        catch (error){
            console.error(error.message);
            res.status(500).send("Internal Server Error !!")
        }       
        
})


// ROUTE:3 - Update an existing note Using: PUT "/api/notes/updatenote/:id". Login required
router.put('/updatenote/:id',
    fetchuser,
    async(req,res) => {
        try{
            // Destructuring and bringing out notes componenets
            const {title, description, tag, reminder} = req.body;

            //Create new Note object
            const newNote = {};
            if(title){newNote.title = title};
            if(description){newNote.description = description};
            if(tag){newNote.tag = tag};
            if (reminder) { newNote.reminder = reminder; }

            //Find the note and update it
            let note = await Note.findById(req.params.id);
            if(!note){return res.status(404).send("Not Found")}

            //Allow Updation only if user owns this note
            if(note.user.toString() !== req.user.id){return res.status(404).send("Not Allowed");}

            note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true})
            res.json({note});
        }
        catch (error){
            console.error(error.message);
            res.status(500).send("Internal Server Error !!")
        }   

})


// ROUTE:4 - Delete an existing note Using: DELETE "/api/notes/deletenote/:id". Login required
router.delete('/deletenote/:id',
    fetchuser,
    async(req,res) => {
        try{
            //Find the note and Delete it
            let note = await Note.findById(req.params.id);
            if(!note){return res.status(404).send("Not Found")}

            //Allow deletion only if user owns this note
            if(note.user.toString() !== req.user.id){return res.status(404).send("Not Allowed");}

            note = await Note.findByIdAndDelete(req.params.id)
            res.json({"Success": "Note has been Deleted"});
        }
        catch (error){
            console.error(error.message);
            res.status(500).send("Internal Server Error !!")
        }   

})


module.exports = router