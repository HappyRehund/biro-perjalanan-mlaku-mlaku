// src/travel-spot/entity/travel-spot.entity.ts
import { PackageItinerary } from "src/travel-package/entity/package-intinerary.entity";
import { Column, CreateDateColumn, Entity, Index, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity('travel_spot')
@Index(['name', 'city'], { unique: true })
@Index(['createdAt'])
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
    type: 'varchar',
    length: 100
  })
  city: string

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

  @OneToMany(() => PackageItinerary, (itinerary) => itinerary.travelSpot)
  itineraries: PackageItinerary[];

}