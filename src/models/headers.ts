import { timeStamp } from 'console';
import {
   Entity,
   Column,
   PrimaryGeneratedColumn,
   CreateDateColumn,
   DeleteDateColumn,
   UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Headers {
   @PrimaryGeneratedColumn()
   'id': number;

   @Column()
   'icon': string;

   @Column()
   'content': string;

   @CreateDateColumn()
   'createdAt': Date;

   @UpdateDateColumn()
   'updatedAt': Date;

   @DeleteDateColumn()
   'deletedAt': Date;
}
