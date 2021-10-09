import { Id, RelationMappings } from 'objection';
import { Wallet } from '.';
import Base from './Base';

export class User extends Base {
  id!: Id;
  nome!: string;
  telegramId!: string;
  saldo!: number;
  entradas!: number;
  saidas!: number;
  walletId!: Wallet;

  static tableName = 'users';

  // $beforeInsert(){
  //   this.volume = this.width * this.height * this.depth;
  // }

  static get relationMappings(): RelationMappings {
    return {
      wallet: {
        relation: Base.BelongsToOneRelation,
        modelClass: 'Wallet',
        join: {
          from: 'users.id',
          to: 'wallets.usersId',
        },
      },
    };
  }
}

export default User;
