import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import crypto from 'crypto';
import { ConfigService } from 'nestjs-config';

/**
 * Crypto service
 *
 * Responsible for hashing and validating passwords
 */
@Injectable()
export class CryptoService {
  constructor(private readonly configSerivce: ConfigService) {}

  /**
   * Generate random secure token
   */
  public secureRandom(): string {
    return crypto.randomBytes(32).toString('HEX');
  }

  /**
   * Hash password
   */
  public async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(
      password,
      this.configSerivce.get('security.salt_rounds'),
    );
  }

  /**
   * Verify hashed password
   */
  public async verifyPassword(
    passwordHash: string,
    password: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, passwordHash);
  }
}
