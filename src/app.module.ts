import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LessonModule } from './lesson/lesson.module';
import { LessonEntity } from './lesson/lesson.entity';
import { StudentModule } from './student/student.module';
import { StudentEntity } from './student/student.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb+srv://elghe:HwZ2LEMzqrig9kTo@cluster0.vj32cse.mongodb.net/GraphQLNestJS?retryWrites=true&w=majority',
      entities: [LessonEntity, StudentEntity],
      synchronize: true,
      useNewUrlParser: true,
      logging: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    LessonModule,
    StudentModule,
  ],
})
export class AppModule {}
