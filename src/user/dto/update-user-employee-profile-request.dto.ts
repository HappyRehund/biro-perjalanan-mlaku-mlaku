import { PartialType } from "@nestjs/swagger"; // ← PENTING: Ganti dari @nestjs/mapped-types
import { CreateUserEmployeeProfileRequestDto } from "./create-user-employee-profile-request.dto";

export class UpdateUserEmployeeProfileRequestDto extends PartialType(CreateUserEmployeeProfileRequestDto) {
}