import express from 'express'

import { postLogin, postSignUp } from '../controllers/authControllers.js'

export const authRouter = express.Router()

authRouter.post('/signup', postSignUp)

authRouter.post('/login', postLogin)
