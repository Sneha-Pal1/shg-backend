import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class CreateMemberDto {
  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: 'Name is required! Please provide name' })
  name: string;

  @IsNumber({}, { message: 'Phone number must be a number' })
  @IsNotEmpty({
    message: 'Phone number is required! Please provide phone number',
  })
  @IsPhoneNumber('IN', {
    message: 'Phone number must be a valid Indian phone number',
  })
  phoneNumber: number;

  @IsString({ message: 'Designation must be a string' })
  designation: 'president' | 'member' | 'secretary' | 'treasurer';

  @IsString({ message: 'Father or Husband name must be a string' })
  fatherOrHusbandName: string;

  @IsEnum(['ST', 'SC', 'OBC', 'General', 'Other'], {
    message:
      'Category must be one of the following: ST, SC, OBC, General, Other',
  })
  category: 'ST' | 'SC' | 'OBC' | 'General' | 'Other';

  @IsBoolean({ message: 'Disability must be a boolean value' })
  disability: boolean;

  @IsEnum(['Hindu', 'Muslim', 'Tribes', 'Christian', 'Other'], {
    message:
      'Religion must be one of the following: Hindu, Muslim, Tribes, Christian, Other',
  })
  religion: 'Hindu' | 'Muslim' | 'Tribes' | 'Christian' | 'Other';

  @IsEnum(['Male', 'Female', 'Other'], {
    message: 'Gender must be one of the following:',
  })
  gender: 'Male' | 'Female' | 'Other';

  @IsBoolean({ message: 'Account availability must be a boolean value' })
  accountAvailable: boolean;
}
