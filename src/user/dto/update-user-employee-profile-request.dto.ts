import { CreateUserEmployeeProfileRequestDto } from "./create-user-employee-profile-request.dto";
import { PartialType } from "@nestjs/mapped-types";

export class UpdateUserEmployeeProfileRequestDto extends PartialType(CreateUserEmployeeProfileRequestDto) {
}