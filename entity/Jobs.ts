import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BaseEntity
} from 'typeorm';
import { ObjectType, Field, Int } from 'type-graphql';
import { Tech } from './Tech';

@ObjectType()
@Entity('jobs')
export class Job extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column()
  machine: string;

  @Field(() => String)
  @Column()
  complaint: string;

  @Field(() => Tech, { nullable: true })
  @ManyToOne(
    () => Tech,
    tech => tech.id,
    { nullable: true }
  )
  tech: Tech;
}
