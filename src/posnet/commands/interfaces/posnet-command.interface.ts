export abstract class PosnetCommand {
  allias: string;
  abstract execute(): Buffer;
  abstract validate(): boolean;
  abstract parse?(message: Buffer): any;
}
