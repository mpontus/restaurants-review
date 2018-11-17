import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ValidationArguments, ValidatorConstraint } from 'class-validator';
import { UserRepository } from 'user/user.repository';

/**
 * Custom validation constraint for email uniqueness
 */
@ValidatorConstraint({ name: 'isEmailUnique', async: true })
@Injectable()
export class IsEmailUnique {
  constructor(private readonly userRepository: UserRepository) {}

  /**
   * Check email address for uniqueness against existing user entities
   */
  public async validate(email: string): Promise<boolean> {
    const userExists = await this.userRepository.findByEmail(email);

    return userExists === undefined;
  }

  /**
   * Default error message
   */
  public defaultMessage(_args: ValidationArguments): string {
    return 'User with this email already exists.';
  }
}
