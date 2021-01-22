import { Conductor } from '../core/conductor';

export function hookUpConductors(conductors: Conductor[]) {
  for (let i = 0; i < conductors.length; i += 1) {
    for (let j = 0; j < conductors.length; j += 1) {
      if (i !== j) {
        conductors[i].network.connectWith(conductors[j]);
      }
    }
  }
}
