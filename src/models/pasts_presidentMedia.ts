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
import { User } from './user';
import { PastsPresidents } from './pasts_presidents';

@Entity()
export class PastsPresidentMedia {
   @PrimaryGeneratedColumn()
   'id': number;

   @Column({ type: 'text' })
   'original_url': string;

//    @ManyToOne(() => PastsPresidents, (n) => n.medias, { onDelete: 'CASCADE' })
//    @JoinColumn({ name: 'mediaId' })
//    'pp_media': PastsPresidents;

//    @Column({ nullable: true })
//    'mediaId': number;

   @CreateDateColumn()
   'createdAt': Date;

   @UpdateDateColumn()
   'updatedAt': Date;

   @DeleteDateColumn()
   'deletedAt': Date;
}
