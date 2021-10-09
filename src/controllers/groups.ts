import { Request, Response } from 'express';
import * as HttpStatus from 'http-status-codes';
import { Id } from 'objection';
import { GroupsService } from '../services';


export const list = async (req: Request, res: Response): Promise<Response> => {
  let result = {};
  try{
    const ids = req.query.ids as Id[];
    result = GroupsService.list(ids)    
  } catch (e){
    return res.status(HttpStatus.BAD_GATEWAY).json({error: HttpStatus.BAD_GATEWAY, message: e});
  }
  return res.status(HttpStatus.OK).json(result);  
};

export const get = async (req: Request, res: Response): Promise<Response> => {
  let result = {};
  try{
    const id = req.params.id;
    result = GroupsService.get(id);
  } catch (e){
    return res.status(HttpStatus.BAD_GATEWAY).json({error: HttpStatus.BAD_GATEWAY, message: e});
  }
  return res.status(HttpStatus.OK).json(result);  
};

export const create = async (
  req: Request,
  res: Response
): Promise<Response> => {

  return res.status(HttpStatus.OK).json({});
};
