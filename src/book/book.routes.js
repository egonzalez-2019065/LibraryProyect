'use strict'

import express from 'express'
import { deleteBook, editBook, getBooks, getCategory, saveBook, searchBook, test } from './book.controller.js'
import { isAdmin, validateJwt } from '../middlewares/validate-jwt.js'


const api = express.Router()

api.get('/test', test)
api.post('/saveBook', [validateJwt], [isAdmin] , saveBook)
api.put('/editBook/:id', [validateJwt], [isAdmin] , editBook)
api.delete('/deleteBook/:id', [validateJwt], [isAdmin] , deleteBook)
api.get('/searchBook', [validateJwt], searchBook)
api.get('/getBooks', [validateJwt], getBooks)
api.get('/getCategory/:id',[validateJwt], getCategory)


export default api