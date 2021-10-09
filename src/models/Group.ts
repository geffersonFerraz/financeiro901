import { Id, RelationMappings } from 'objection';
import { Wallet } from './Wallet';
import Base from './Base';

export class Group extends Base {
  id!: Id;
  nome!: string;
  telegramId!: string;
  walletId!: Wallet;

  static tableName = 'groups';

  // $beforeInsert(){
  //   this.volume = this.width * this.height * this.depth;
  // }

  static get relationMappings(): RelationMappings {
    return {
      wallet: {
        relation: Base.HasOneRelation,
        modelClass: 'Group',
        join: {
          from: 'groups.id',
          to: 'wallets.groupId',
        },
      },
    };
  }
}

export default Group;
