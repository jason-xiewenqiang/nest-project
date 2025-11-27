import { readFile } from 'fs/promises';
import * as yaml from 'js-yaml';
import { join } from 'path';

export default async () => {
  const configFilePath = join(process.cwd(), 'aaa.yaml');

  const config = await readFile(configFilePath, {
    encoding: 'utf-8',
  });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  return yaml.load(config);
};
