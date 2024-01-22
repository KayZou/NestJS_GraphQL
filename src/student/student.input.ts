import { Field, ID, InputType } from '@nestjs/graphql';
import { IsString, MinLength } from 'class-validator';

@InputType()
export class StudentInput {
  @Field()
  @IsString()
  @MinLength(2)
  first_name: string;

  @Field()
  @IsString()
  @MinLength(2)
  last_name: string;
}
