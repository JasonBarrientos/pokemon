import { Module } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Pokemon, PokemonSchema } from './entities/pokemon.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports:[MongooseModule.forFeature([{
    name:Pokemon.name,
    schema: PokemonSchema
  }]),ConfigModule],
  controllers: [PokemonController],
  providers: [PokemonService],
  exports:[MongooseModule]
})
export class PokemonModule {}
