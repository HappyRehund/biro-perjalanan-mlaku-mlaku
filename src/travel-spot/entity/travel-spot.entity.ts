// src/travel-spot/entity/travel-spot.entity.ts
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity('travel_spot')
export class TravelSpot {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 255
  })
  name: string;

  @Column({
    type: 'text'
  })
  description: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 7
  })
  latitude: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 7
  })
  longitude: number;

  @CreateDateColumn({
    name: 'created_at'
  })
  readonly createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at'
  })
  readonly updatedAt: Date;

}