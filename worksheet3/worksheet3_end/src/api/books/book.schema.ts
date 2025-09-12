import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type BookDocument = mongoose.HydratedDocument<Book>;

@Schema()
export class Book {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  isbn: string;

  @Prop({ required: true })
  author: string;

  @Prop()
  description: string;

  @Prop({ type: Date })
  published_date: mongoose.Date;

  @Prop()
  publisher: string;

  @Prop({ type: Date, default: Date.now })
  updated_date: mongoose.Date;
}

export const BookSchema = SchemaFactory.createForClass(Book);
