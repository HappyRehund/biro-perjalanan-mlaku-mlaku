import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";
import { LocalStrategyValidatedResponseDto } from "../dto/auth-user-response.dto";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
  constructor(private authService: AuthService){
    super({
      usernameField: 'email'
    })
  }

  async validate(email: string, password: string): Promise<LocalStrategyValidatedResponseDto> {
    return await this.authService.validateUser(email, password)
  }
}