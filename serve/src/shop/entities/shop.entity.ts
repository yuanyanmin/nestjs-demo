import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Shop {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  province: string;

  @Column()
  city: string;
  
  @Column()
  area: string;

  @Column()
  address: string;

  @Column()
  createAt: Date;

  @Column()
  updateAt: Date;
}
