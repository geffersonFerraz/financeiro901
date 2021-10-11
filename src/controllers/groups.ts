import { Request, Response } from 'express';
import * as HttpStatus from 'http-status-codes';
import { Id } from 'objection';
import Group from '../models/Group';
import { GroupsService } from '../services';


export const list = async (req: Request, res: Response): Promise<Response> => {
  let result = {};
  try{
    const ids = req.query.ids as Id[];
    result = GroupsService.list(ids)    
  } catch (e){
    return res.status(HttpStatus.BAD_GATEWAY).json({error: HttpStatus.getStatusText(HttpStatus.BAD_GATEWAY), message: e.message});
  }
  return res.status(HttpStatus.OK).json(result);  
};

export const get = async (req: Request, res: Response): Promise<Response> => {
  let result = {};
  try{
    const id = req.params.id;
    result = await GroupsService.get(id);
  } catch (e){
    return res.status(HttpStatus.BAD_GATEWAY).json({error: HttpStatus.getStatusText(HttpStatus.BAD_GATEWAY), message: e.message});
  }
  return res.status(HttpStatus.OK).json(result);  
};

export const create = async (
  req: Request,
  res: Response
): Promise<Response> => {
  let result = {};
  try{
    const preGroup = {
      name: req.params.name,
      telegramId: req.params.telegramId
    }
    result = await GroupsService.create(preGroup);
  } catch (e){
    return res.status(HttpStatus.BAD_GATEWAY).json({error: HttpStatus.getStatusText(HttpStatus.BAD_GATEWAY), message: e.message});
  }
  return res.status(HttpStatus.OK).json(result);  
};
