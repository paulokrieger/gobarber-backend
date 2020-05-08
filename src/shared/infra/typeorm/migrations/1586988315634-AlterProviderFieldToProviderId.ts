import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export default class AlterProviderFieldToProviderId1586988315634 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('appointments', 'provider');

    await queryRunner.addColumn
      ('appointments',
        new TableColumn({
          name: 'provider_id',
          type: 'uuid',
          isNullable: true,
        }),
      );
    await queryRunner.createForeignKey('appointments', new TableForeignKey({
      name: 'AppointmentProvider',
      columnNames: ['provider_id'], //qual coluna que irá receber a FK
      referencedColumnNames: ['id'], //nome da coluna na tabela user que representa o provider id
      referencedTableName: 'users', //qual o nome da tabela que será referenciado
      onDelete: 'SET NULL',
      /**caso usuario seja deletado
      RESCRICTED -> bloquear , nao vai deixar o user ser deletado
      SET NULL -> deixar como nulo
      CASCADE -> deletou o usuario, deleta todos os agendamentos*/
      onUpdate: 'CASCADE' //caso seja seu id alterado, tenha que refletir nos relacionamentos
    }));
  }

  //precisa desfazer na ordem reversa, precisa fazer tudo ao contrário do que o método up faz.
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('appointments', 'AppointmentProvider');

    await queryRunner.dropColumn('appointments', 'provider_id');

    await queryRunner.addColumn('appointments', new TableColumn({
      name: 'provider',
      type: 'varchar',
    }),
    )
  }

}
