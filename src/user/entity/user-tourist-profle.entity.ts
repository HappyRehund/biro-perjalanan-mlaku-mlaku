import { Column, CreateDateColumn, Entity, Index, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class UserTouristProfile {

  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({
    type: 'varchar',
    length: 255,
    name: 'full_name'
  })
  fullName: string

  @Column({
    type: 'varchar',
    length: 255,
    name: 'identity_number',
  })
  identityNumber: string

  @Column({
    type: 'text'
  })
  address: string

  @Column({
    type: 'varchar',
    length: 255,
    name: 'phone_number'
  })
  phoneNumber: string

  @CreateDateColumn({
    name: 'created_at'
  })
  readonly createdAt: Date

  @UpdateDateColumn({
    name: 'updated_at'
  })
  readonly updatedAt: Date

  @OneToOne(() => User, (user) => user.userTouristProfile, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'user_id' })
  @Index()
  user: User
}