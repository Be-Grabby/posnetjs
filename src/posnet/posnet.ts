import { SerialPort } from 'serialport';
import { parseErrors } from '../utils/error.util';
import { PosnetCommand } from './commands/interfaces/posnet-command.interface';

export interface PosnetConfig {
  path?: string;
  baudRate?: number;
  debug?: {
    send?: boolean;
    receive?: boolean;
  };
}

export class Posnet {
  private serialPort: SerialPort | null = null;

  messageResolver?: (message: Buffer) => any;

  constructor(private config: PosnetConfig) {}

  async bootstrap() {
    if (this.serialPort) {
      throw ({
        message: 'POSNET device is already connected.',
      });
    }

    const devices = await Posnet.getAvailableDevices();

    if (devices.length === 0) {
      throw ({
        message: 'No POSNET devices found.',
      });
    }

    if (devices.length > 1 && !this.config?.path) {
      throw ({
        message: 'Multiple POSNET devices found. Please specify the path.',
      });
    }

    const path = this.config?.path ?? devices[0].path;

    if (!path) {
      throw ({
        message: 'No path provided for the POSNET device.',
      });
    }

    this.serialPort = new SerialPort({
      path,
      baudRate: this.config.baudRate ?? 9600,
    });

    // TODO: handle serial port errors or closed connections

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

  static async getAvailableDevices() {
    const list = await SerialPort.list();

    return list.filter((device) => `${device.manufacturer}`.toUpperCase() === 'POSNET' || `${device.vendorId}` === '1424');
  }
}
