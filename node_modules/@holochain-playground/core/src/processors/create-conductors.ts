import { Conductor } from '../core/conductor';
import { SimulatedDna, SimulatedDnaTemplate } from '../dnas/simulated-dna';
import { hookUpConductors } from './message';

export async function createConductors(
  conductorsToCreate: number,
  currentConductors: Conductor[],
  dnaTemplate: SimulatedDnaTemplate
): Promise<Conductor[]> {
  const newConductorsPromises: Promise<Conductor>[] = [];
  for (let i = 0; i < conductorsToCreate; i++) {
    const conductor = Conductor.create();
    newConductorsPromises.push(conductor);
  }

  const newConductors = await Promise.all(newConductorsPromises);

  const allConductors = [...currentConductors, ...newConductors];

  await Promise.all(
    allConductors.map(async c => {
      const dnaHash = await c.registerDna(dnaTemplate);
      await c.installApp(dnaHash, null, null, '');
    })
  );

  hookUpConductors(allConductors);

  return allConductors;
}
