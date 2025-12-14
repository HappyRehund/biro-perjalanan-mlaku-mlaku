import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { TravelPackage } from "./travel-package.entity";
import { TravelSpot } from "src/travel-spot/entity/travel-spot.entity";

@Entity('package-itinerary')
@Index(['travelPackage'])
@Index(['travelSpot'])
@Index(['travelPackage', 'daySequence'])
export class PackageItinerary {

  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({
    type: 'int',
    name: 'day_sequence'
  })
  daySequence: number

  @Column({
    type: 'time',
    name: 'start_time'
  })
  startTime: string

  @Column({
    type: 'time',
    name: 'end_time'
  })
  endTime: string

  @Column({
    type: 'text',
    name: 'activity_detail'
  })
  activityDetail: string

  @CreateDateColumn({
    name: 'created_at'
  })
  readonly createdAt: Date

  @UpdateDateColumn({
    name: 'updated_at'
  })
  readonly updatedAt: Date

  @ManyToOne(() => TravelPackage, (travelPackage) => travelPackage.itineraries, {
    onDelete: 'CASCADE',
    nullable: false
  })
  @JoinColumn({name: 'travel_package_id'})
  travelPackage: TravelPackage

  @ManyToOne(() => TravelSpot, (spot) => spot.itineraries, {
    onDelete: 'RESTRICT',
    nullable: false
  })
  @JoinColumn({ name: 'spot_id' })
  travelSpot: TravelSpot
}