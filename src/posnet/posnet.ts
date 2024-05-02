import { SerialPort } from 'serialport';
import { parseErrors } from '../utils/error.util';
import { PosnetCommand } from './commands/interfaces/posnet-command.interface';

export interface PosnetConfig {
  path: string;
  debug?: {
    send?: boolean;
    receive?: boolean;
  };
}

export class Posnet {
  private serialPort: SerialPort | null = new SerialPort({
    path: this.config.path,
    baudRate: 9600,
  });

  messageResolver?: (message: Buffer) => any;

  constructor(private config: PosnetConfig) {
    this.bootstrap();
  }

  async bootstrap() {
    const devices = await this.getAvailableDevices();

    console.log(devices);

    if (devices.length === 0) {
      throw ({
        message: 'No POSNET devices found.',
      });

    }


    this.serialPort = new SerialPort({
      path: this.config.path,
      baudRate: 9600,
    });
    // if (!this.serialPort.isOpen.valueOf()) {
    //   throw ({
    //     message: 'Serial port is not available.',
    //   });
    // }

    this.serialPort.on('data', (data) =>  {
      if (this.config.debug && this.config.debug.receive) {
        console.log("[receiving] \t>" + data.toString('binary'));
      }

      if (this.messageResolver) {
        this.messageResolver(data);
      }
    });
  }

  async execute(command: PosnetCommand) {
    if (!command.validate()) {
      throw ({
        message: 'Invalid params for the command.',
      });
    }

    const commandBuffer = command.execute();
    this.messageResolver = undefined;

    if (this.config.debug && this.config.debug.send) {
      console.log("[sending] \t> " + commandBuffer.toString('binary'));
    }

    return new Promise((resolve, reject) => {
      this.messageResolver = (message) => {
        if (command.parse) {
          const parsed = command.parse(message);
          resolve(parsed);
        }

        const error = parseErrors(message);

        if (error) {
          reject(error);
        } else {
          resolve(undefined);
        }
      };

      this.serialPort.write(commandBuffer);
    });
  }

  async getAvailableDevices() {
    const list = await SerialPort.list();

    return list.filter((device) => device.manufacturer === 'POSNET');
  }
}
