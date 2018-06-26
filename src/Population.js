import _ from "lodash";

const randVector = (length = 1) => {
  const angle = Math.PI * 2 * Math.random();
  const x = Math.cos(angle) * length;
  const y = Math.sin(angle) * length;

  return { x, y };
};

export class Population {
  constructor(geneCount, generationCount, originVec, targetVec) {
    this.geneCount = geneCount;
    this.originVec = originVec;
    this.targetVec = targetVec;

    // Create a population of rockets
    this.popSize = 50;
    this.rockets = this.generateGeneration();

    this.generations = [];

    for (let genNumber = 0; genNumber < generationCount; genNumber++) {
      const nextGen = this.generateGeneration(
        genNumber === 0 ? null : this.generations[genNumber - 1]
      );

      this.generations.push(nextGen);
    }

    this.generationMaxFitnesses = this.generations.map(generation => {
      return _.maxBy(generation, rocket => rocket.fitness).fitness;
    });

    console.log(this.generationMaxFitnesses);
  }

  generateGeneration(currentGeneration) {
    let rockets = [];

    if (!currentGeneration) {
      _.times(this.popSize, () => {
        rockets.push(
          new Rocket(null, this.geneCount, this.originVec, this.targetVec)
        );
      });
    } else {
      // Evaluate the previous generation, and get the next one.
      rockets = this.generateFromCurrentGeneration(currentGeneration);
    }

    return rockets;
  }

  generateFromCurrentGeneration(currentGeneration) {
    // Sort parents by fitness. TODO: don't think it's necessary
    const sortedParents = currentGeneration.sort(
      (a, b) => a.fitness < b.fitness
    );

    // First iteration its the child, every other iteratioin its the accumulator.
    const totalFitness = currentGeneration.reduce(
      (a, b) => (a.fitness || a) + b.fitness
    );

    // Create a new population.
    let children = [];

    // 100t
    _.times(this.popSize, () => {
      let pA, pB;

      // Random parents
      const a = Math.random();
      const b = Math.random();

      // Find parent
      let accFitness = 0;
      sortedParents.forEach(parent => {
        // Normalize the fitness.
        accFitness += parent.fitness / totalFitness;

        // When accumulated fitness crosses the chosen a & b, set the parent.
        // Example:
        // a = 0.2...
        // If accFitness is 0.1 false. If accFitness is 0.3 true.
        if (accFitness >= a && _.isUndefined(pA)) {
          pA = parent;
        }

        if (accFitness >= b && _.isUndefined(pB)) {
          pB = parent;
        }
      });

      if (pA && pB && pA === pB) {
        pA =
          sortedParents[Math.floor(Math.random() * (sortedParents.length - 1))];
      }

      // Cross parents
      const childDNA = pA.dna.crossover(pB);
      const child = new Rocket(
        childDNA,
        this.geneCount,
        this.originVec,
        this.targetVec
      );

      children.push(child);
    });

    return children;
  }
}

class Rocket {
  constructor(dna, geneCount, originVec, targetVec) {
    this.crashed = false;

    this.dna = dna || new DNA(null, geneCount);

    // Acceleration
    this.accVectors = this.dna.genes;

    // Velocity
    this.velVectors = [{ x: 0, y: 0 }];

    this.accVectors.forEach((acc, i) => {
      const nextVelocity = {
        x: this.velVectors[i].x + acc.x,
        y: this.velVectors[i].y + acc.y
      };

      this.velVectors.push(nextVelocity);
    });

    // Position
    this.posVectors = [{ x: originVec.x, y: originVec.y }];

    this.velVectors.forEach((vel, i) => {
      const nextPos = {
        x: this.posVectors[i].x + vel.x,
        y: this.posVectors[i].y + vel.y
      };

      this.posVectors.push(nextPos);
    });

    // Fitness
    this.targetVec = targetVec;
    this.fitness = this.getFinalFitness();
  }

  getFinalFitness() {
    const calcDistance = (v1, v2) => {
      const a = v1.x - v2.x;
      const b = v1.y - v2.y;

      return Math.sqrt(a * a + b * b);
    };

    const finalPos = this.posVectors[this.posVectors.length - 1];

    const distance = calcDistance(finalPos, this.targetVec);

    // TODO: using a power function for fitness
    return Math.pow(1 / distance, 10);
  }
}

class DNA {
  constructor(genes, geneCount = 100) {
    this.geneCount = geneCount;
    this.genes = genes || _.times(geneCount, i => randVector(0.1));
  }

  crossover(partner) {
    // Get a random midpoint, we'll take first half of genes from self, second half from parent.
    const mid = Math.floor(Math.random() * this.genes.length);

    const newGenes = _.times(this.geneCount, i => {
      return i > mid ? this.genes[i] : partner.dna.genes[i];
    });

    const mutationRate = 0.1;
    const mutatedNewGenes = newGenes.map(
      gene => (Math.random() < mutationRate ? randVector(0.1) : gene)
    );

    return new DNA(mutatedNewGenes);
  }

  mutate() {
    for (let i = 0; this.genes.length; i++) {
      if (Math.random() < 0.01) {
        this.genes[i] = randVector(0.1);
      }
    }
  }
}
