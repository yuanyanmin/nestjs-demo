import { Exclude } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  mobile: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  createAt: Date;

  @Column()
  updateAt: Date;
}
