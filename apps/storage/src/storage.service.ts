import { Injectable, BadRequestException } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { UploadFileRequest, UploadFileResponse } from '@app/common';

@Injectable()
export class FileStorageService {
  private s3: S3Client;
  private bucket: string;
  private publicUrl: string;

  constructor() {
    this.s3 = new S3Client({
      endpoint: process.env.TIGRIS_ENDPOINT,
      region: process.env.TIGRIS_REGION || 'us-east-1',
      credentials: {
        accessKeyId: process.env.TIGRIS_ACCESS_KEY!,
        secretAccessKey: process.env.TIGRIS_SECRET_KEY!,
      },
      forcePathStyle: true,
    });
    this.bucket = process.env.TIGRIS_BUCKET || 'product-images';
    this.publicUrl =
      process.env.TIGRIS_PUBLIC_URL || process.env.TIGRIS_ENDPOINT!;
  }

  async uploadFile(data: UploadFileRequest): Promise<UploadFileResponse> {
    const { file, fileName, contentType } = data;

    if (!fileName || !file) {
      throw new BadRequestException('File or filename missing');
    }

    // Sanitize filename
    const safeFilename = fileName.replace(/[^a-zA-Z0-9.-]/g, '_');

    // Determine folder based on content type
    let folder = 'others';
    if (contentType.startsWith('image/')) folder = 'images';
    else if (contentType.startsWith('video/')) folder = 'videos';

    // Set S3 key with folder prefix
    const key = `${folder}/${safeFilename}`;

    // Prepare S3 PutObjectCommand
    const command = new PutObjectCommand({
      Bucket: this.bucket,
      Key: key,
      Body: Buffer.from(file),
      ContentType: contentType || 'application/octet-stream',
      ACL: 'public-read', // or remove for private files
    });

    await this.s3.send(command);

    const fileUrl = `${this.publicUrl}/${key}`;

    return {
      fileUrl,
    };
  }
}
