import { Module } from '@nestjs/common';
import { FileStorageController } from './storage.controller';
import { FileStorageService } from './storage.service';

@Module({
  imports: [],
  controllers: [FileStorageController],
  providers: [FileStorageService],
})
export class StorageModule {}
