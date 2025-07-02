import { Module } from '@nestjs/common';
import { AxiosAdapter } from './adapters/axios.adapter';

@Module({
  controllers: [],
  providers: [AxiosAdapter],
  exports:[AxiosAdapter]
})
export class CommonModule {}
