import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('Student')
export class StudentType {
  @Field((type) => ID)
  id: string;
  @Field()
  first_name: string;
  @Field()
  last_name: string;
}
