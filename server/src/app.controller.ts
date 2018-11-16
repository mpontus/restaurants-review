import { Controller, Get } from '@nestjs/common';

/**
 * Test controller
 */
@Controller('')
export class AppController {
  @Get('/')
  public async hello(): Promise<{ hello: string }> {
    return { hello: 'world' };
  }
}
