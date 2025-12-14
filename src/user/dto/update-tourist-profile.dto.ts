import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-tourist-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
