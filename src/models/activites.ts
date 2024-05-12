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
import { ActiviteMedia } from './activites.media';

@Entity()
export class Activites {
   @PrimaryGeneratedColumn()
   'id': number;

   @Column({type: 'text'})
   'title': string;

   @Column({type: 'text'})
   'content': string;

   @OneToMany(() => ActiviteMedia, (n) => n.activites, { cascade: true })
   'medias'?: ActiviteMedia[];

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
