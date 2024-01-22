import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType('assignStudentsToLessonInputs')
export class AssignStudentsToLessonInputs {
  @Field((type) => ID)
  @IsUUID()
  lessonId: string;

  @Field((type) => [ID])
  @IsUUID('all', { each: true })
  students: string[];
}
