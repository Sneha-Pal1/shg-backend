import { Controller, UseGuards } from '@nestjs/common';
import { FileStorageService } from './storage.service';
import {
  FileStorageServiceController,
  FileStorageServiceControllerMethods,
  UploadFileRequest,
  UploadFileResponse,
} from '@app/common';
// import { AuthGuard } from './auth.guard';

@Controller()
@FileStorageServiceControllerMethods()
export class FileStorageController implements FileStorageServiceController {
  constructor(private readonly fileStorageService: FileStorageService) {}

  // @UseGuards(AuthGuard)
  async uploadFile(request: UploadFileRequest): Promise<UploadFileResponse> {
    return this.fileStorageService.uploadFile(request);
  }
}
