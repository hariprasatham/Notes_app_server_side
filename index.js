require('dotenv').config();
const cors = require('cors')
const express = require('express')
const connectDB = require('./connectDB')
const Notes = require('./models/Notes')

const app = express()
const PORT = process.env.PORT || 8000;

connectDB()
app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())

// get all notes
app.get("/api/notes", async(req, res)=>{
    
    try {
        const data = await Notes.find({})
        if(!data){
            throw new Error("An error occurred while fetching notes")
        }
        res.status(200).json({success: true, data})
    } catch (error) {
        res.status(500).json({success: false, message: "An error occurred while fetching note"})
    }
})

//get note by id
app.get("/api/notes/:id", async(req, res)=>{
    const id = req.params.id
    try {
        const data = await Notes.findById(id)
        if(!data){
            throw new Error("An error occurred while fetching notes")
        }
        res.status(200).json({success: true, data})
    } catch (error) {
        res.status(500).json({success: false, message: "An error occurred while fetching note"})
    }
})

//create note
app.post("/api/notes", async(req, res)=>{
    const {title, description} = req.body
    try {
        const data = await Notes.create({title, description})
        if(!data){
            throw new Error("An error occurred while creating note")
        }
        res.status(201).json({success: true, message: "Successfully created", data})
    } catch (error) {
        res.status(500).json({success: false, message: "An error occurred while creating a note"})
    }
})


//update note
app.put("/api/notes/:id", async(req, res)=>{
    const id = req.params.id
    const {title, description} = req.body
    try {
        const data = await Notes.findByIdAndUpdate(id, {title, description})

        if(!data){
            throw new Error("An error occurred while updating note")
        }
        res.status(200).json({success: true, message: "Successfully Updated", data})
    } catch (error) {
        res.status(500).json({success: false, message: "An error occurred while updating a note"})
    }
})

//delete note
app.delete("/api/notes/:id", async(req, res)=>{
    const id = req.params.id
    try {
        const data = await Notes.findByIdAndDelete(id)
        if(!data){
            throw new Error("An error occurred while deleting a note")
        }
        res.status(200).json({success: true, message: "Successfully Deleted", data})
    } catch (error) {
        res.status(500).json({success: false, message: "An error occurred while deleting a note"})
    }
})


app.get("/", (req, res)=>{
    res.json("Hello")
})

app.get("*", (req, res)=>{
    res.status(404).json({success: false, message: "Not Found"})
})
app.listen(PORT, ()=>{console.log(`Listening port ${PORT}`)})
