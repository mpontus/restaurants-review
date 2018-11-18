import { Injectable } from '@nestjs/common';
import { ValidationArguments, ValidatorConstraint } from 'class-validator';
import moment from 'moment';

/**
 * Validate date format of a string
 */
@ValidatorConstraint({ name: 'isValidVisitDate' })
@Injectable()
export class IsValidVisitDate {
  /**
   * Validate string
   */
  public async validate(text: string): Promise<boolean> {
    const now = moment();
    const date = moment(text, 'YYYY-MM-DD', true);

    return (
      date.isValid() && date.isBefore(now) && now.diff(date, 'years') < 100
    );
  }

  /**
   * Default error message
   */
  public defaultMessage(args: ValidationArguments): string {
    return `${args.targetName} must be a past date in format YYYY-MM-DD`;
  }
}
