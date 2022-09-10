import { Injectable } from '@nestjs/common';
import { Cat } from 'src/interfaces/cat.interface.js';

@Injectable()
export class CatsService {
    private readonly cats: Cat[] = [];

    async create(cat: Cat) {
        await this.cats.push(cat);
    }

    async findAll(): Promise<Cat[]> { 
        return await this.cats;
    }
}
