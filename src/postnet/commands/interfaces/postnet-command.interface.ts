export abstract class PostnetCommand {
  allias: string;
  abstract execute(): Buffer;
  abstract validate(): boolean;
  abstract parse?(message: Buffer): any;
}
