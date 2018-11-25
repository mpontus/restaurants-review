import { NestFactory } from '@nestjs/core';
import { AppModule } from 'app.module';
import { cli } from 'cli-ux';
import { UserService } from 'user/user.service';

/**
 * Create admin account using command line interface
 */
const main = async () => {
  const app = await NestFactory.createApplicationContext(AppModule, {
    logger: false,
  });

  const name = await cli.prompt('Display name');
  const email = await cli.prompt('Email');
  const password = await cli.prompt('Password', { type: 'mask' });

  try {
    cli.action.start('creating an admin');

    await app.get(UserService).createUser(undefined, {
      name,
      email,
      password,
      isAdmin: true,
    });

    cli.action.stop();
  } catch (error) {
    cli.action.stop();
    console.error(error);
  } finally {
    await app.close();
  }
};

// tslint:disable-next-line:no-floating-promises
main();
