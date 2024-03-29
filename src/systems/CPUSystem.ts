// semicolons
import Phaser from "phaser";
import { defineQuery, defineSystem } from "bitecs";
import { CPU, Direction, Input, Rotation, Velocity } from "../components";

export const createCPUSystem = (scene: Phaser.Scene) => {
  const cpuQuery = defineQuery([CPU, Velocity, Rotation, Input]);

  return defineSystem((world) => {
    const dt = scene.game.loop.delta;
    const entities = cpuQuery(world);

    for (let i = 0; i < entities.length; i++) {
      const id = entities[i];
      CPU.accumulatedTime[id] += dt;

      if (CPU.accumulatedTime[id] < CPU.accumulatedTime[id]) {
        continue;
      }

      CPU.accumulatedTime[id] -= CPU.timeBetweenActions[id];
      const rand = Phaser.Math.Between(0, 20);

      switch (rand) {
        case 0:
          Input.direction[id] = Direction.Left;
          break;
        case 1:
          Input.direction[id] = Direction.Right;
          break;
        case 2:
          Input.direction[id] = Direction.Up;
          break;
        case 3:
          Input.direction[id] = Direction.Down;
          break;
        default:
          Input.direction[id] = Direction.None;
          break;
      }
    }
    return world;
  });
};
