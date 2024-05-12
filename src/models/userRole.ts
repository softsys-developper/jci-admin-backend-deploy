import { timeStamp } from 'console';
import {
   Entity,
   Column,
   PrimaryGeneratedColumn,
   CreateDateColumn,
   DeleteDateColumn,
   UpdateDateColumn,
   OneToMany,
} from 'typeorm';
import { User } from './user';

@Entity()
export class UserRole {
   @PrimaryGeneratedColumn()
   'id': number;

   @Column()
   'name': string;

   @CreateDateColumn()
   'createdAt': Date;

   @UpdateDateColumn()
   'updatedAt': Date;

   @DeleteDateColumn()
   'deletedAt': Date;
}
