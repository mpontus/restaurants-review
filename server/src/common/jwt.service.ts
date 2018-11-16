import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from 'nestjs-config';
import { promisify } from 'util';

/**
 * Service responsible for object serialization as JWT tokens.
 */
@Injectable()
export class JwtService {
  constructor(private readonly configService: ConfigService) {}

  /**
   * Encode JSON object as JWT token
   */
  public async encode(data: object): Promise<string> {
    return await promisify<string>(callback => {
      jwt.sign(data, this.configService.get('security.jwt_secret'), callback);
    })();
  }

  /**
   * Decode JWT token as JSON object
   */
  public async decode(token: string): Promise<object> {
    const decoded = await promisify<object | string>(callback => {
      jwt.verify(
        token,
        this.configService.get('security.jwt_secret'),
        callback,
      );
    })();

    if (decoded === null || typeof decoded !== 'object') {
      throw new Error('Invalid payload');
    }

    return decoded;
  }
}
