import _stickyNoteService from '../services/StickyNoteService.js'
import express from 'express'
import { Authorize } from '../middleware/authorize.js'


//PUBLIC
export default class StickyNoteController {
  constructor() {
    this.router = express.Router()
      .get("", this.getAll)
      .get('/:id', this.getById)
      .use(Authorize.authenticated)
      .post('', this.create)
      .put('/:id', this.edit)
      .use(this.defaultRoute)
  }

  // this is pretty neat

  defaultRoute(req, res, next) {
    next({ status: 404, message: 'No Such Route' })
  }

  async getAll(req, res, next) {
    try {
      let data = await _stickyNoteService.getAll()
      return data
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.authorId = req.session.uid
      let data = await _stickyNoteService.create(req.body)
      return res.status(201).send(data)
    } catch (error) { next(error) }
  }

  async getById(req, res, next) {
    try {
      let data = await _stickyNoteService.getById(req.body.id)
      return res.send(data)
    } catch (error) { next(error) }
  }

  async edit(req, res, next) {
    try {
      let data = await _stickyNoteService.edit(req.params.id, req.body, req.session.uid)
      return res.send(data)
    } catch (error) { next(error) }
  }
}


