import { Body, Controller, Get, Post } from '@nestjs/common';
import { Cat } from '../interfaces/cat.interface.js';
import { CreateCatDto } from '../dtos/create-cat.dto.js';
import { CatsService } from './cats.service.js';

@Controller('cats')
export class CatsController {
    constructor(private readonly catsService: CatsService) {}

    @Post()
    async create(@Body() createCatDto: CreateCatDto) {
        await this.catsService.create(createCatDto);
    }

    @Get()
    async findAll(): Promise<Cat[]> {
        return await this.catsService.findAll();
    }
}
