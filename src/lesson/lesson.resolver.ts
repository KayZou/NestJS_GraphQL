import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { LessonType } from './lesson.type';
import { LessonService } from './lesson.service';
import { LessonEntity } from './lesson.entity';
import { LessonInputs } from './lesson.inputs';
import { AssignStudentsToLessonInputs } from './assignStudentsToLesson.inputs';
import { StudentService } from '../student/student.service';

@Resolver((of) => LessonType)
export class LessonResolver {
  constructor(
    private lessonService: LessonService,
    private studentService: StudentService,
  ) {}
  @Query((returns) => LessonType)
  lesson() {
    return {
      id: 'huh',
      name: 'maths',
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
    };
  }
  @Query((returns) => LessonType)
  getLesson(@Args('id') id: string): Promise<LessonEntity> {
    return this.lessonService.getLesson(id);
  }

  @Query((returns) => [LessonType])
  getAllLessons(): Promise<LessonEntity[]> {
    return this.lessonService.getAllLessons();
  }

  @Mutation((returns) => LessonType)
  createLesson(
    @Args('createLessonInput') createLessonInput: LessonInputs,
  ): Promise<LessonEntity> {
    return this.lessonService.createLesson(createLessonInput);
  }

  @Mutation((returns) => LessonType)
  async assignStudentsToLesson(
    @Args('assignStudentsToLessonInputs')
    assignStudentsToLessonInputs: AssignStudentsToLessonInputs,
  ): Promise<LessonEntity> {
    const { students, lessonId } = assignStudentsToLessonInputs;

    try {
      return await this.lessonService.assignStudentsToLesson(
        lessonId,
        students,
      );
    } catch (error) {
      throw new Error('Failed to assign students to lesson');
    }
  }

  @ResolveField()
  async students(@Parent() lesson: LessonEntity) {
    return this.studentService.getManyStudentIds(lesson.students);
  }
}
