import { crc16xmodem } from 'crc';

export function stringToCommand(command: string, params: { [key: string]: any } = {}): Buffer {
  const paramsList = [command];

  Object.keys(params).forEach((key) => {
    if (params[key] === undefined) return;

    paramsList.push(`${key}${params[key]}`);
  });

  const cmdStr = paramsList.join('\x09'); // \x09 is the tab character

  const crc = crc16xmodem(Buffer.from(cmdStr + '\x09', 'binary')).toString(16).toUpperCase().padStart(4, '0'); // transform command to buffer and calculate CRC

  return Buffer.from(`\x02${cmdStr}\x09#${crc}\x03`, 'binary'); // wrap command with STX, ETX and CRC
}


export function commandToString(command: Buffer): { command: string; params: { [key: string]: any }; crc: string } {
  const commandStr = command.toString('binary').slice(1, -1); // remove STX, ETX and CRC
  const [cmd, ...params] = commandStr.split('\t'); // split command and params

  const crc = params.pop(); // remove CRC from params

  const paramsObj = {};

  params.forEach((param) => {
    paramsObj[param.slice(0, 2)] = param.slice(2);
  });

  return {
    command: cmd,
    crc,
    params: paramsObj,
  };
}
