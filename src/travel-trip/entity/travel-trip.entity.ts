import { TravelPackage } from "src/travel-package/entity/travel-package.entity";
import { User } from "src/user/entity/user.entity";
import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('travel_trip')
@Index(['userTourist'])
@Index(['userEmployee'])
@Index(['travelPackage'])
@Index(['startDate'])
export class TravelTrip {

  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({
    type: 'timestamp',
    name: 'start_date'
  })
  startDate: Date

  @Column({
    type: 'timestamp',
    name: 'end_date'
  })
  endDate: Date

  @Column({
    type: 'text',
    nullable: true
  })
  notes: string | null

  @CreateDateColumn({
    name: 'created_at'
  })
  readonly createdAt: Date

  @UpdateDateColumn({
    name: 'update_at'
  })
  readonly updatedAt: Date

  @ManyToOne(() => User, {
    onDelete: 'RESTRICT',
    nullable: false
  })
  @JoinColumn({ name: 'user_tourist_id '})
  userTourist: User

  @ManyToOne(() => User, {
    onDelete: 'RESTRICT',
    nullable: false
  })
  @JoinColumn({ name: 'user_employee_id' })
  userEmployee: User

  @ManyToOne(() => TravelPackage, {
    onDelete: 'RESTRICT',
    nullable: false
  })
  @JoinColumn({ name: 'travel_package_id' })
  travelPackage: TravelPackage
}
