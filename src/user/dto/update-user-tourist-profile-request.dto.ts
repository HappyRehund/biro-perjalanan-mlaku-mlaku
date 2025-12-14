import { PartialType } from "@nestjs/mapped-types";
import { CreateUserTouristProfileRequestDto } from "./create-user-tourist-profile-request.dto";

export class UpdateUserTouristProfileRequestDto extends PartialType(CreateUserTouristProfileRequestDto) {
}
