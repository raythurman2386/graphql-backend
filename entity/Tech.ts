import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany
} from 'typeorm';
import { ObjectType, Field, Int } from 'type-graphql';
import { Job } from './Jobs';

@ObjectType()
@Entity('techs')
export class Tech extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column()
  name: string;

  @Field(() => [Job])
  @OneToMany(
    () => Job,
    job => job.tech
  )
  jobs: Job[];
}
