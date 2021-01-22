import { Conductor } from '../core/conductor';
import { SimulatedDnaTemplate } from '../dnas/simulated-dna';
export declare function createConductors(conductorsToCreate: number, currentConductors: Conductor[], dnaTemplate: SimulatedDnaTemplate): Promise<Conductor[]>;
