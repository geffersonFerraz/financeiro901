import { Id, RelationMappings } from 'objection';
import { Wallet } from './Wallet';
import Base from './Base';

export class Group extends Base {
  id!: Id;
  nome!: string;
  telegramId!: string;
  walletId?: Wallet;
  created_at?: string;
  updated_at?: string;

  static tableName = 'groups';

  $beforeInsert() {
    this.created_at = new Date().toISOString();
    this.updated_at = new Date().toISOString();
  }

  $beforeUpdate() {
    this.updated_at = new Date().toISOString();
  }

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
