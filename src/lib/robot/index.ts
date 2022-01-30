import chalk from 'chalk';
import five from 'johnny-five';
import ms from 'ms';

import { Logger } from '$lib/logger';
import { wait } from '$lib/utils/both';
import { runtimeMode } from '$lib/utils/server';

import { HeightController } from './components/height-controller';
import { Led } from './components/led';
import { Motors } from './components/motors';
import { RotationController } from './components/rotation-controller';
import { RobotDirection, robotDirectionsName } from './components/types/robot';
import { Valves } from './components/valves';

class Components {
  led = new Led();
  valves = new Valves();
  motors = new Motors();
  heightController = new HeightController();
  rotationController = new RotationController();
}

class Robot {
  private logger = new Logger('robot', chalk.grey);

  ready = this.setup();
  board: five.Board;
  components: Components;

  private async setup() {
    this.logger.info('Préparation du robot…');

    if (runtimeMode !== 'production')
      return (this.components = new Components());

    this.board = new five.Board({ repl: false });
    const boardIsReady = new Promise<void>((resolve) =>
      this.board.on('ready', () => {
        this.logger.info('Connecté au robot');
        this.components = new Components();
        resolve();
      })
    );
    await boardIsReady;
  }

  async calibrate() {
    const {
      motors: { left: leftMotor, right: rightMotor },
    } = this.components;

    await Promise.all([
      leftMotor.moveUntilSwitch('forward'),
      rightMotor.moveUntilSwitch('forward'),
    ]);
  }

  async walk(numberOfSteps: number, direction: RobotDirection) {
    this.logger.info(
      `Début de la séquence de marche (${numberOfSteps} pas ${robotDirectionsName[direction]})`
    );

    const {
      valves: { center: centerValve, sides: sidesValve },
      valves,
      heightController,
      motors,
    } = this.components;

    centerValve.target = 'atmosphere';
    sidesValve.target = 'pump';
    await heightController.goTo(0);

    for (let i = 0; i < numberOfSteps; i++) {
      this.logger.info(`Pas #${i + 1}`);

      await motors.moveUntilSwitch(
        direction === 'forward' ? 'backward' : 'forward'
      );

      await heightController.goTo(1);
      centerValve.target = 'pump';

      await wait(ms('5s'));
      sidesValve.target = 'atmosphere';
      await this.calibrate();

      await heightController.goTo(0);
      valves.target = 'pump';
      await wait(ms('5s'));
      centerValve.target = 'atmosphere';
    }

    this.logger.info('Séquence de marche complétée');
  }
}

export const robot = new Robot();
