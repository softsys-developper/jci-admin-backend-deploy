import { timeStamp } from 'console';
import {
   Entity,
   Column,
   PrimaryGeneratedColumn,
   CreateDateColumn,
   DeleteDateColumn,
   UpdateDateColumn,
   OneToOne,
   JoinColumn,
   OneToMany,
   ManyToOne,
} from 'typeorm';

import { UserRole } from './userRole';
import { Activites } from './activites';
import { Banners } from './banners';
import { Blogs } from './blogs';
import { MediaSociaux } from './mediaSociaux';
import { Contacts } from './contacts';


@Entity()
export class User {
   @PrimaryGeneratedColumn()
   'id': number;

   @Column({ unique: true })
   'email': string;

   @Column({ unique: true })
   'username': string;

   @Column()
   'password': string;

   @Column()
   'token': string;

   @Column({nullable: true})
   'name': string;

   @Column({nullable: true, type: 'text'})
   'description': string;

   @Column({nullable: true, default:'Abidjan, Côte divoire' })
   'zone': string;


   // Images
   @Column({nullable: true})
   'logo': string;

   @Column({nullable: true})
   'about_image_1': string;

   @Column({nullable: true})
   'about_image_2': string;


   // Colors
   @Column({nullable: true, default:'#4C7DDE'})
   'color_1': string;

   @Column({nullable: true, default:'#FBF66A'})
   'color_2': string;


   // Statisics
   @Column({nullable: true, default:'0'})
   'stats_1': string;

   @Column({nullable: true, default:'0'})
   'stats_2': string;

   @Column({nullable: true, default:'0'})
   'stats_3': string;

   @Column({nullable: true, default:'0'})
   'stats_4': string;


   // Contacts
   @Column({nullable: true})
   'contact_phone': string;

   @Column({nullable: true})
   'contact_mail': string;

   @Column({nullable: true})
   'contact_whatsapp': string;

   @Column({nullable: true})
   'contact_facebook': string;

   @Column({nullable: true})
   'contact_instagram': string;

   @Column({nullable: true})
   'contact_linkedin': string;

   @Column({nullable: true})
   'contact_x': string;


   @OneToMany(() => Activites, (n) => n.user, { cascade: true })
   'activites'?: Activites[];

   @OneToMany(() => Banners, (n) => n.user, { cascade: true })
   'banners'?: Banners[];

   @OneToMany(() => Blogs, (n) => n.user, { cascade: true })
   'blogs'?: Blogs[];

   @OneToMany(() => MediaSociaux, (n) => n.user, { cascade: true })
   'media_sociaux'?: MediaSociaux[];

   @OneToMany(() => Contacts, (n) => n.user, { cascade: true })
   'contacts'?: Contacts[];


   @CreateDateColumn()
   'createdAt': Date;

   @UpdateDateColumn()
   'updatedAt': Date;

   @DeleteDateColumn()
   'deletedAt': Date;
}
