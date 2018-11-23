import { NestApplication } from '@nestjs/core';
import { RequestHandler } from 'express';
import glob from 'glob';
import * as path from 'path';
import { Connection } from 'typeorm';

/**
 * Every seed file must export async `run` function as well as any
 * data which will help identify created records.
 */
type Seed = {
  run(app: NestApplication): Promise<void>;
};

/**
 * Strip extension from filename specified by path
 */
const filenameWithoutExtension = (fullPath: string) =>
  path.parse(fullPath).name;

/**
 * Seed Middleware
 *
 * Provides API endpoint to seed database during integration tests.
 */
export const seedMiddleware = (
  app: NestApplication,
  globPattern: string,
): RequestHandler => {
  // Build a map from filename to exported values
  const seedMap: Record<string, Seed> = glob.sync(globPattern).reduce(
    (acc, fullPath) => ({
      ...acc,
      [filenameWithoutExtension(fullPath)]: require(fullPath) as Seed,
    }),
    {},
  );

  return async (req, res, next) => {
    // Reset database
    await app.get(Connection).dropDatabase();
    await app.get(Connection).runMigrations();

    // Collect the results from each of the executed seeds
    const results = [];

    // Run specified seeds
    if (req.query.seeds) {
      for (const seed of req.query.seeds.split(',')) {
        if (!(seed in seedMap)) {
          res.status(400).send(`Invalid seed: ${seed}`);

          return;
        }

        const { run, ...rest } = seedMap[seed];

        // Run the seed
        await run(app);

        // Collect the results
        results.push(rest);
      }
    }

    // Return the array containing results from all executed seeds
    res.json(results);
  };
};
