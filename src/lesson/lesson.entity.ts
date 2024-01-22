import { Entity, PrimaryColumn } from 'typeorm';
import { Column, ObjectIdColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class LessonEntity {
  @ObjectIdColumn()
  _id: string;
  @PrimaryColumn()
  id: string;
  @Column()
  name: string;
  @Column()
  startDate: string;
  @Column()
  endDate: string;
  @Column()
  students: string[];
}
