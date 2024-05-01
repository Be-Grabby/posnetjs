import { SerialPort } from 'serialport';
import { PostnetCommand } from './commands/interfaces/postnet-command.interface';

export interface PostnetConfig {
  path: string;
  debug?: {
    send?: boolean;
    receive?: boolean;
  };
}

export class Postnet {
  private serialPort = new SerialPort({
    path: this.config.path,
    baudRate: 9600,
  });

  messageResolver?: (message: Buffer) => any;

  constructor(private config: PostnetConfig) {
    this.bootstrap();
  }

  bootstrap() {
    this.serialPort.on('data', (data) =>  {
      if (this.config.debug && this.config.debug.receive) {
        console.log("[receiving] \t>" + data.toString('binary'));
      }

      if (this.messageResolver) {
        this.messageResolver(data);
      }
    });
  }

  async execute(command: PostnetCommand) {
    if (!command.validate()) {
      throw new Error('Invalid command');
    }

    const commandBuffer = command.execute();
    this.messageResolver = undefined;

    if (this.config.debug && this.config.debug.send) {
      console.log("[sending] \t> " + commandBuffer.toString('binary'));
    }

    return new Promise((resolve, reject) => {
      if (command.parse) {
        this.messageResolver = (message) => {
          const parsed = command.parse(message);

          resolve(parsed);
        };

        // Timeout after 5 seconds
        setTimeout(() => reject('Timeout'), 5000);
      } else {
        setTimeout(() => resolve(null), 10);
      }


      this.serialPort.write(commandBuffer);
    });
  }
}
