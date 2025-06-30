import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { isValidObjectId, Model } from 'mongoose';
import { Pokemon, PokemonSchema } from './entities/pokemon.entity';
import { InjectModel, IsObjectIdPipe } from '@nestjs/mongoose';

@Injectable()
export class PokemonService {
  constructor(@InjectModel(Pokemon.name) private readonly pokemonModel: Model<Pokemon>) {
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

  async findAll() {
    return await this.pokemonModel.find();
  }

  async findOne(term: string) {
  let pokemon: Pokemon | null = null;
    if (!isNaN(+term))
      pokemon = await this.pokemonModel.findOne({ no: term });
    if (isValidObjectId(term))
      pokemon = await this.pokemonModel.findById(term)

    if (!pokemon) 
      pokemon = await this.pokemonModel.findOne({ name: term });

    if (!pokemon) 
      throw new NotFoundException(`Pokemon with id, name or no ${term} not found`);
    return pokemon;
  }

  update(id: number, updatePokemonDto: UpdatePokemonDto) {
    return `This action updates a #${id} pokemon`;
  }

  remove(id: number) {
    return `This action removes a #${id} pokemon`;
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
