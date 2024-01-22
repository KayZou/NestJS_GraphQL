import { Injectable } from '@nestjs/common';
import { In } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentEntity } from './student.entity';
import { Repository } from 'typeorm';
import { StudentInput } from './student.input';
import { v4 as uuid } from 'uuid';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(StudentEntity)
    private studentRepository: Repository<StudentEntity>,
  ) {}
  async createStudent(studentInput: StudentInput): Promise<StudentEntity> {
    const { last_name, first_name } = studentInput;
    const student = await this.studentRepository.create({
      id: uuid(),
      first_name,
      last_name,
    });
    return await this.studentRepository.save(student);
  }

  async getAllStudents(): Promise<StudentEntity[]> {
    return await this.studentRepository.find();
  }

  async getStudentById(id: string): Promise<StudentEntity> {
    return await this.studentRepository.findOne({ where: { id } });
  }

  async getManyStudentIds(studentIds: string[]): Promise<StudentEntity[]> {
    return await this.studentRepository.find({
      where: {
        id: In(studentIds),
      },
    });
  }
}
