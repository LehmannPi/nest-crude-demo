import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';

@Injectable()
export class CatsService {
  private cats = [
    { id: 0, name: 'Fluffy', color: 'white' },
    { id: 1, name: 'Snowball', color: 'gray' },
    { id: 2, name: 'Whiskers', color: 'black' },
  ];

  create(createCatDto: CreateCatDto) {
    const newCat = {
      id: this.cats.length ? this.cats[this.cats.length - 1].id + 1 : 0,
      ...createCatDto,
    };
    this.cats.push(newCat);
    return newCat;
  }

  findAll() {
    return this.cats;
  }

  findOne(id: number) {
    const cat = this.cats.find((cat) => cat.id === id);
    if (!cat) throw new NotFoundException(`Cat with id ${id} not found`);
    return cat;
  }

  update(id: number, updateCatDto: UpdateCatDto) {
    const cat = this.findOne(id);
    const updatedCat = { ...cat, ...updateCatDto };
    return cat;
  }

  remove(id: number) {
    const index = this.cats.findIndex((cat) => cat.id === id);
    if (index === -1)
      throw new NotFoundException(`Cat with id ${id} not found`);
    const removed = this.cats.splice(index, 1);
    return removed[0];
  }
}
