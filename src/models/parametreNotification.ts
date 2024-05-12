
import {
   Entity,
   Column,
   PrimaryGeneratedColumn,
   CreateDateColumn,
DeleteDateColumn,
UpdateDateColumn,
OneToMany,
} from 'typeorm';

@Entity()
export class ParametreNotification {
   @PrimaryGeneratedColumn()
   'id': number;

   @Column()
   'name': string;

   @Column()
   'slug': string;

   @CreateDateColumn()
   'createdAt': Date;

   @UpdateDateColumn()
   'updatedAt': Date;
   
   @DeleteDateColumn()
   'deletedAt': Date;
}
