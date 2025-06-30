import { IsInt, IsNumber, IsPositive, IsString, Min, MinLength } from "class-validator";

export class CreatePokemonDto {

    @IsInt()
    @IsPositive()
    @Min(1)
    no:number;

    @MinLength(1)
    @IsString()
    name:string;

}
