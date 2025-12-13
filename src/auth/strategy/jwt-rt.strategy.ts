import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { jwtConstants } from '../constant/auth.constant';
import { JwtPayloadData } from '../interface/jwt-payload.interface';

@Injectable()
export class JwtRtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConstants.secret_refresh,
      passReqToCallback: true,
    });
  }

  validate(req: Request, payload: JwtPayloadData) {
    const authHeader = req.get('Authorization')

    if(!authHeader){
      throw new UnauthorizedException('Refresh token is missing')
    }

    const refreshToken = authHeader.replace('Bearer', '').trim();

    if(!refreshToken){
      throw new UnauthorizedException('Invalid refresh token format')
    }

    return {
      ...payload,
      refreshToken
    };
  }
}