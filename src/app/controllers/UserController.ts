import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { UserService } from '../services/UserService';
import Template from '../global/response';
import { ServerException } from '../../lib/custom-errors';
import APIError from '../global/response/apierror';
const service = new UserService();
class UserController {
  public static listAll = (req: Request, res: Response, next: any) => {
    service.get().then(users => {
      if (users && users.length > 0) {
        res.json(Template.success(users, 'Users Feated succesfully'));
      } else {
        res.json(Template.success(users, 'Users Feated succesfully'));
      }
    }).catch(err => {
      next(new ServerException('error occured'));
    })
  }

//   public static getOneUser(req: Request, res: Response, next: NextFunction){
//       service.getOne().then((data: any) => {
//           if(data){
//               res.status(200).json(data)
//           }else {
//               res.status(200).json({data : []})
//           }
//       }).catch((error: Error) => {
//           next(new Error('error'))
//       })
//   }
  public static addNew = (req: Request, res: Response, next: any) => {
    service.add(req.body).then(user => {
      if (user) {
        res.json(Template.success(user, 'Users saved succesfully'));
      }
    }).catch(err => {
      if (err.ErrorID == 2110) {
        next(new APIError(err.message, err.ErrorID));
      }
      next(new ServerException('error occured'));
    })
  }
}

export default UserController;