import _ from 'lodash';
import { Id } from 'objection';

export const list = async (ids: any): Promise<Object> => {
    if (!_.isEmpty(ids)){
        return {result: ids}
    }
    return {result: [1,2,3]}   
};

export const get = async (id: Id): Promise<Object> => {
    if (!_.isEmpty(id)){
        throw new Error('Nenhum ID foi informado.')
    }
    return {result: [1,2,3]}
};

export const create = async (group: any): Promise<Object> => {
    if (!_.isEmpty(group)){
        return {result: [1]}
    }else{
        return {result: []}
    }
};