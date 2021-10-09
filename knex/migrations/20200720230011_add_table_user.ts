import { Wallet, User } from '../../src/models';
import { Knex } from 'knex';

export const up = (knex: Knex): Promise<void> =>
  knex.schema.createTable(User.tableName, (table: Knex.TableBuilder) => {
    table.increments();
    table.timestamps();
    table.string('nome');
    table.string('telegramId');
    table.float('saldo');
    table.float('entradas');
    table.float('saidas');
    table.integer('walletId');
    table.foreign('walletId').references('id').inTable(Wallet.tableName);
  });

export const down = (knex: Knex): Promise<void> =>
  knex.schema.dropTable(User.tableName);
