import { Conductor } from '../core/conductor';
import { SimulatedDna } from '../dnas/simulated-dna';
export declare function createConductors(conductorsToCreate: number, currentConductors: Conductor[], dna: SimulatedDna): Promise<Conductor[]>;
