import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { isValidObjectId, Model } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PokemonService {
  private defaultlimit : number;
  constructor(@InjectModel(Pokemon.name) private readonly pokemonModel: Model<Pokemon>,private readonly configService: ConfigService) {
    this.defaultlimit = configService.get<number>('defaultlimit')!;    
  }

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();
    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;

    } catch (error) {
      this.errorHandler(error)
    }
  }

  async findAll(paginationDto:PaginationDto) {
    let { limit = this.defaultlimit,offset =0} = paginationDto;
    return await this.pokemonModel.find().limit(limit).skip(offset).sort({
      no:1
    }).select('-__v');
  }

  async findOne(term: string) {
  let pokemon: Pokemon | null = null;
    if (!isNaN(+term))
      pokemon = await this.pokemonModel.findOne({ no: term });
    if (!pokemon && isValidObjectId(term))
      pokemon = await this.pokemonModel.findById(term)

    if (!pokemon) 
      pokemon = await this.pokemonModel.findOne({ name: term });

    if (!pokemon) 
      throw new NotFoundException(`Pokemon with id, name or no ${term} not found`);
    return pokemon;
  }

  async update(id: string, updatePokemonDto: UpdatePokemonDto) {
    let pokemon =  await this.findOne(id);
    if (updatePokemonDto.name) {
      updatePokemonDto.name= updatePokemonDto.name.toLocaleLowerCase();
    }
  try {
      await pokemon.updateOne(updatePokemonDto, {new : true}); // new true apara q regrese el obejto cambiado
   
    return {...pokemon.toJSON(), ...updatePokemonDto};
  } catch (error) {
      this.errorHandler(error)
  }
  }

  async remove(id: string) {
     let {deletedCount} = await  this.pokemonModel.deleteOne({_id:id});
     if (deletedCount === 0)  throw new BadRequestException(`Pokemon with id ${id} not found`);
     
     return;

  }
  private errorHandler(err) {
    switch (err.code) {
      case 11000:
        throw new BadRequestException(`El pokemon con nombre ${JSON.stringify(err.keyValue)} ya existe`);
      default:
        throw new InternalServerErrorException(
          'Error inesperado - revisar logs del servidor',
        );
    }
  }
}
