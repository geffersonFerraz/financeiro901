import { Id, RelationMappings } from 'objection';
import { User } from './User';
import { Group } from './Group';
import Base from './Base';

export class Wallet extends Base {
  id!: Id;
  title!: string;
  groupId!: Group;
  users?: User[] | undefined;
  saldo!: number;
  entradas!: number;
  saidas!: number;

  static tableName = 'wallets';

  // $beforeInsert(){
  //   const payloadVolume = { value: 0 };
  //   this.users?.forEach(user => {
  //     payloadVolume.value += 1     
  //   });
  //   this.payloadVolume = payloadVolume.value;
  //   this.availableVolume = this.volume - payloadVolume.value;
  // }

  static get relationMappings(): RelationMappings {
    return {
      groups: {
        relation: Base.HasOneRelation,
        modelClass: 'Group',
        join: {
          from: 'wallets.groupId',
          to: 'groups.id'
        }
      },
      users: {
        relation: Base.HasManyRelation,
        modelClass: 'User',
        join: {
          from: 'wallets.id',
          to: 'users.walletId',
        },
      },
    };
  }
}

export default Wallet;
