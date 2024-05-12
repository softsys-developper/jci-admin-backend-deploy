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
} from 'typeorm';
import { Activites } from './activites';

@Entity()
export class ActiviteMedia {
   @PrimaryGeneratedColumn()
   'id': number;

   @Column({ type: 'text' })
   'original_url': string;

   @ManyToOne(() => Activites, (n) => n.medias, { onDelete: 'CASCADE' })
   @JoinColumn({ name: 'activiteId' })
   'activites': Activites;

   @Column()
   'activiteId': number;

   @CreateDateColumn()
   'createdAt': Date;

   @UpdateDateColumn()
   'updatedAt': Date;

   @DeleteDateColumn()
   'deletedAt': Date;
}
