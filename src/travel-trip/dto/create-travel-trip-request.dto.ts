import { IsDateString, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateTravelTripRequestDto {
  @IsUUID('4')
  @IsNotEmpty()
  userTouristId: string;

  @IsUUID('4')
  @IsNotEmpty()
  userEmployeeId: string;

  @IsUUID('4')
  @IsNotEmpty()
  travelPackageId: string;

  @IsDateString({}, {
    message: 'Start date harus format ISO 8601 (YYYY-MM-DDTHH:mm:ss.sssZ)'
  })
  @IsNotEmpty()
  startDate: string; // ISO 8601 UTC format: "2024-12-20T08:00:00.000Z"

  @IsDateString({}, {
    message: 'End date harus format ISO 8601 (YYYY-MM-DDTHH:mm:ss.sssZ)'
  })
  @IsNotEmpty()
  endDate: string; // ISO 8601 UTC format: "2024-12-25T17:00:00.000Z"

  @IsString()
  @IsOptional()
  notes?: string;
}