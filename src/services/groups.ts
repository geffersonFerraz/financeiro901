import _ from 'lodash';
import { Id } from 'objection';
import { Group } from '../models/Group';

export const list = async (ids: any): Promise<Object> => {
    if (_.isEmpty(ids)) {
        return { result: [1, 2, 3] }
    }
    return { result: [41, 42, 43] }
};

export const get = async (id: Id): Promise<Object> => {
    if (_.isEmpty(id)) {
        throw new Error('Nenhum ID foi informado.')
    }
    return Promise.resolve({ result: [1, 2, 3] })
};



export const create = async (group: { name: string, telegramId: string }): Promise<any> => {
    const preGroup = {
        nome: group.name,
        telegramId: group.telegramId,
    }
    return Group.query().insert(preGroup);
};