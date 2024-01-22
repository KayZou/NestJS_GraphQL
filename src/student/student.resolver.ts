import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { StudentType } from './student.type';
import { StudentService } from './student.service';
import { StudentInput } from './student.input';
import { StudentEntity } from './student.entity';

@Resolver((of) => StudentType)
export class StudentResolver {
  constructor(private studentService: StudentService) {}
  @Mutation((returns) => StudentType)
  createStudent(
    @Args('studentInput') studentInput: StudentInput,
  ): Promise<StudentEntity> {
    return this.studentService.createStudent(studentInput);
  }

  @Query((returns) => [StudentType])
  getAllStudents(): Promise<StudentEntity[]> {
    return this.studentService.getAllStudents();
  }

  @Query((returns) => StudentType)
  getStudentById(@Args('id') id: string): Promise<StudentEntity> {
    return this.studentService.getStudentById(id);
  }
}
