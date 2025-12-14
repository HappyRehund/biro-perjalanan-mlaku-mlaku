import { Column, CreateDateColumn, Entity, Index, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { PackageItinerary } from "./package-intinerary.entity";

@Entity('travel_package')
@Index(['createdAt'])
export class TravelPackage {

  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({
    type: 'varchar',
    length: 255
  })
  name: string

  @Column({
    type: 'text'
  })
  description: string

  @Column({
    type: 'varchar',
    length: 100
  })
  country: string

  @Column({
    type: 'varchar',
    length: 100
  })
  province: string

  @Column({
    type: 'varchar',
    length: 100
  })
  city: string

  @Column({
    type: 'decimal',
    precision: 15,
    scale: 2
  })
  basePrice: number

  @Column({
    type: 'int',
    name: 'duration_days'
  })
  durationDays: number

  @CreateDateColumn({
    name: 'created_at'
  })
  readonly createdAt: Date

  @UpdateDateColumn({
    name: 'updated_at'
  })
  readonly updatedAt: Date

  @OneToMany(() => PackageItinerary, (itinerary) => itinerary.travelPackage, {
    cascade: ['insert', 'update', 'remove']
  })
  itineraries: PackageItinerary[]
}