import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCatDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    readonly name: string;
    
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty()
    readonly age: number;
    
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    readonly breed: string;
}