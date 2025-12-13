import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Role } from "../enum/user-role.enum";
import { UserTouristProfile } from "./user-tourist-profle.entity";
import { UserEmployeeProfile } from "./user-employee-profile.entity";

@Entity()
export class User {

  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({
    unique: true
  })
  email: string

  @Column({
    unique: true
  })
  username: string

  @Column()
  password: string

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.TOURIST
  })
  role: Role

  @Column({
    name: 'is_active',
    default: true
  })
  isActive: boolean

  @Column({
    type: 'varchar',
    nullable: true,
    select: false
  })
  hashedRefreshToken: string | null

  @CreateDateColumn({
    name: 'created_at'
  })
  createdAt: Date

  @UpdateDateColumn({
    name: 'updated_at'
  })
  updatedAt: Date


  @OneToOne(() => UserTouristProfile, (userTouristProfile) => userTouristProfile.user, {
    cascade: ['update','remove']
  })
  userTouristProfile: UserTouristProfile

  @OneToOne(() => UserEmployeeProfile, (userEmployeeProfile) => userEmployeeProfile.user, {
    cascade: ['update','remove']
  })
  userEmployeeProfile: UserEmployeeProfile

}
