import { IsString, IsObject } from 'class-validator';


export class FillDto {
@IsString()
template: string;


@IsObject()
data: Record<string, any>;
}