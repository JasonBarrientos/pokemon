import { IsInt, IsOptional, IsPositive, Min } from "class-validator";

export class PaginationDto {
    @IsOptional()
    @IsPositive()
    @Min(1)
    limit?:number

    @IsOptional()
    @IsPositive()
    @Min(1)
    offset?:number
}