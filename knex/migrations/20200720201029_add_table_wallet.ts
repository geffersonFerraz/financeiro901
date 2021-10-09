import { Wallet, Group } from '../../src/models';
import { Knex } from 'knex';

export const up = (knex: Knex): Promise<void> =>
  knex.schema.createTable(Wallet.tableName, (table: Knex.TableBuilder) => {
    table.increments();
    table.timestamps();
    table.string('title');
    table.float('saldo');
    table.float('entradas');
    table.float('saidas');
    table.integer('groupId');
    table.foreign('groupId').references('id').inTable(Group.tableName);
  });

export const down = (knex: Knex): Promise<void> =>
  knex.schema.dropTable(Wallet.tableName);
