import chalk from 'chalk';

export class Logger {
  constructor(private name: string, private prefixColor: chalk.Chalk) {}

  private log(messageColor: chalk.Chalk, message: string, data?: any) {
    const formattedPrefix = this.prefixColor.bold(`[${this.name}]`);
    const formattedMessage = messageColor(
      `${message} ${data ? JSON.stringify(data, null, 2) : ''}`.trim()
    );
    console.log(`${formattedPrefix} ${formattedMessage}`);
  }

  info(message: string, data?: any) {
    this.log(chalk.blue, message, data);
  }

  error(message: string, data?: any) {
    this.log(chalk.red, message, data);
  }
}
