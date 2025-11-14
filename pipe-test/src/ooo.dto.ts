import { IsInt } from 'class-validator';

export class Ooo {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsInt()
  age: number;
  sex: boolean;
  hobbits: string[];
}
