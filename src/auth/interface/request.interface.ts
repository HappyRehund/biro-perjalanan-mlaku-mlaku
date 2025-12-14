import { Request } from 'express';
import { LocalStrategyValidatedResponseDto } from '../dto/auth-user-response.dto';
import { JwtPayloadData } from './jwt-payload.interface';

// endpoint yang pakai LocalAuthGuard (login)
export interface RequestPassedValidation extends Request {
  user: LocalStrategyValidatedResponseDto
}

// endpoint yang pakai JwtAuthGuard (prtected routes)
export interface RequestWithJwtPayload extends Request {
  user: JwtPayloadData
}

// endpoint yang pakai JwtRtAuthGuard (refresh)
export interface RequestWithRefreshToken extends Request {
  user: JwtPayloadData & { refreshToken: string }
}