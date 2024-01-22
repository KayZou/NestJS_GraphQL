import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessonEntity } from './lesson.entity';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { LessonInputs } from './lesson.inputs';
import { AssignStudentsToLessonInputs } from './assignStudentsToLesson.inputs';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(LessonEntity)
    private lessonRepository: Repository<LessonEntity>,
  ) {}
  async createLesson(createLessonInput: LessonInputs): Promise<LessonEntity> {
    const { name, startDate, endDate, students } = createLessonInput;
    const lesson = this.lessonRepository.create({
      id: uuid(),
      name,
      startDate,
      endDate,
      students,
    });
    return await this.lessonRepository.save(lesson);
  }

  async getAllLessons(): Promise<LessonEntity[]> {
    return await this.lessonRepository.find();
  }

  async getLesson(id: string): Promise<LessonEntity> {
    return await this.lessonRepository.findOne({ where: { id } });
  }

  async assignStudentsToLesson(
    lessonId: string,
    students: string[],
  ): Promise<LessonEntity> {
    const lesson = await this.lessonRepository.findOne({
      where: { id: lessonId },
    });

    if (!lesson) {
      throw new Error(`Lesson with id ${lessonId} not found`);
    }

    lesson.students = Array.from(new Set([...lesson.students, ...students]));

    return this.lessonRepository.save(lesson);
  }
}
