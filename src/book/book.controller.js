'use strict'
import Category from '../category/category.model.js'
import Book from './book.model.js'


export const test = (req, res) =>{
    console.log('test is running')
    return res.send({message: 'Test book is running'})
}

// Guardar un libro
export const saveBook = async(req, res) =>{
    try{
        let data = req.body
        let book = new Book(data)
        book.state = 'AVAILABLE'
        let category = await Category.findOne({_id: data.category})
        if(!category) return res.status(404).send({message: 'Category not found or not exist'})
        await book.save()
        return res.send({message: `Book saved succesfully: ${book.name}`})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error saving book'})
    }
}

// Editar un libro
export const editBook  = async(req, res) => {
    try{
        let { id } = req.params
        let book = await Book.findOne({_id: id})
        if(!book) return res.status(404).send({message: 'Book not exists'})
        let data = req.body
        let updatedBook = await Book.findOneAndUpdate(
            {_id: id},
            data, 
            {new:true}
        )
        return res.send({message: 'Updated book', updatedBook})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error editing book'})
    }
}


// Eliminar un book 
export const deleteBook = async(req, res) => {
    try{
        let { id } = req.params
        let book = await Book.findOneAndDelete({_id: id})
        if(!book) return res.status(404).send({message: 'Book not found and not deleted'})
        return res.send({message: `Book eliminated succesfully: ${book.name}`})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error deleted book'})
    }
}

// Buscar un libro por nombre
export const searchBook = async(req, res) => {
    try{
        let { name } = req.body
        const regex = new RegExp(name, 'i') 
        let book = await Book.find(
            {name: regex}
        ).populate('category', 'name')
        return res.send({message: 'Book found:', book})
    }catch(err){
        console.error(err)
        return res.status(404).send({message: 'Error searching book'})
    }
}

// Traer todo el catalogo de libros
export const getBooks = async(req, res) => {
    try{ 
        let book = await Book.find().populate('category', 'name')
        return res.send({message: 'Book found:', book})
    }catch(err){
        console.error(err)
        return res.status(404).send({message: 'Error searching book'})
    }
}

// Traer los libros por categorías 
export const getCategory = async(req, res) => {
    try{
        let { id } = req.params
        let category = await Book.find({category: id}).populate('category', 'name')
        if(!category) return res.status(404).send({message: 'Category not exists'})
        return res.send({message: 'Book found:', category})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error searching books'})
    }
}
