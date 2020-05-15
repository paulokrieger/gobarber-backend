import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';

@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  provider_id: string;

  /*Como tem relacionamento entre agendamentos <-> usuario
  Relacionamentos SQL:
 * Um para Um(OneToOne)
 * Um para Muitos (OneToMany)
 * Muitos para Muitos (ManyToMany)
 * Sempre pensar que está saindo do model de agendamento para o de usuario
 *
  --> Nesse caso: Muitos agendamentos para um usuário
 */
  @ManyToOne(() => User)
  @JoinColumn({ name: 'provider_id' }) //qual coluna que vai identificar qual o prestador do agendamento
  provider: User;

  @Column()
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column('timestamp with time zone')
  date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

}
/**  constructor({ provider, date }: Omit<Appointment, 'id'>) { //nao quero que crie o id, pois será gerado automaticamente
    this.id = uuid();
    this.provider = provider;
    this.date = date;
  } */


export default Appointment;
