import { timeStamp } from 'console';
import {
   Entity,
   Column,
   PrimaryGeneratedColumn,
   CreateDateColumn,
   DeleteDateColumn,
   UpdateDateColumn,
   ManyToOne,
   JoinColumn,
   OneToMany,
} from 'typeorm';
import { User } from './user';
import { PastsPresidentMedia } from './pasts_presidentMedia';

@Entity()
export class Teams {
   @PrimaryGeneratedColumn()
   'id': number;

   @Column({ type: 'text' })
   'original_url': string;

   @Column({ type: 'text' })
   'name': string;

   @Column({ type: 'text' })
   'date': string;

   @ManyToOne(() => User, (user) => user.activites, { onDelete: 'CASCADE' })
   @JoinColumn({ name: 'userId' })
   'user': User;

   @Column({ nullable: true })
   'userId': number;

   @CreateDateColumn()
   'createdAt': Date;

   @UpdateDateColumn()
   'updatedAt': Date;

   @DeleteDateColumn()
   'deletedAt': Date;
}
