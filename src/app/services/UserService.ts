import {  getRepository } from 'typeorm'
import { Request } from 'express'
import {User} from '../models/entities/User'
import APIError from '../global/response/apierror'
import Err from '../global/response/apierror'

export class UserService {
    async get(): Promise<User[] | null > {
        try {
            const userRepo = getRepository(User)
            return await userRepo.find({})
        } catch (e) {
            throw new Error(e)
            // return Promise.reject(new APIError('User Already exists', ''))
        }
    }

    async add(data: any): Promise<User>{
        try {
            const user = new User()
            user.role = data.role
            const userRepo = getRepository(User)
            const newUser = await userRepo.save(user)   
            return newUser
        } catch (e) {
            return Promise.reject(new APIError('User Already exist', 1001))
            // throw new Error(e)
        }
    }
}