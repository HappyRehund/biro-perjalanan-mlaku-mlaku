
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from '../constant/auth.constant';
import { JwtPayloadData } from '../interface/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret_access,
    });
  }

  async validate(payload: JwtPayloadData) {
    return {
      id: payload.id,
      name: payload.username,
      email: payload.email,
      role: payload.role,
      isActive: payload.isActive
    };
  }
}
