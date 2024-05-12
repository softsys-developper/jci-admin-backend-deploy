import { timeStamp } from 'console';
import {
   Entity,
   Column,
   PrimaryGeneratedColumn,
   CreateDateColumn,
   DeleteDateColumn,
   UpdateDateColumn,
   JoinColumn,
   ManyToOne
} from 'typeorm';
import { User } from './user';

@Entity()
export class MediaSociaux {
   @PrimaryGeneratedColumn()
   'id': number;

   @Column()
   'icon': string;

   @Column()
   'content': string;

   @ManyToOne(() => User, (user) => user.activites, { onDelete: 'CASCADE' })
   @JoinColumn({ name: 'userId' })
   'user': User;

   @Column({nullable: true})
   'userId': number;

   @CreateDateColumn()
   'createdAt': Date;

   @UpdateDateColumn()
   'updatedAt': Date;

   @DeleteDateColumn()
   'deletedAt': Date;
}
