import _ from "lodash";

const randVector = (length = 1) => {
  const angle = Math.PI * 2 * Math.random();
  const x = Math.cos(angle) * length;
  const y = Math.sin(angle) * length;

  return { x, y };
};

const calcDistance = (v1, v2) => {
  let a = v1.x - v2.x;
  let b = v1.y - v2.y;

  return Math.sqrt(a * a + b * b);
};

export class Population {
  constructor(geneCount, originVec, targetVec) {
    this.geneCount = geneCount;
    this.originVec = originVec;
    this.targetVec = targetVec;

    // Create a population of rockets
    this.popsize = 50;
    this.rockets = [];

    _.times(this.popsize, i => {
      this.rockets[i] = new Rocket(null, this.geneCount, this.originVec);
    });

    this.matingPool = [];
  }

  evaluate() {
    // Get the max fitness.
    const maxFit = _.maxBy(this.rockets, rocket => rocket.fitness);

    this.matingPool = [];

    _.times(this.popsize, i => {
      // Add fit rockets a lot more.
      // Divide by maxFit to normalize the values.
      const n = this.rockets[i].fitness / maxFit * 1000;

      for (let j = 0; j < n; j++) {
        this.matingPool.push(this.rockets[i]);
      }
    });

    this.selection = () => {
      let childRockets = [];

      _.times(this.rockets.length, i => {
        // Choose two parents;
        const a = Math.floor(Math.random() * this.matingPool.length);
        const b = Math.floor(Math.random() * this.matginPool.length);

        const parentA = this.matingPool[a];
        const parentB = this.matingPool[b];
        const child = parentA.dna.crossover(parentB);
        child.mutate();

        childRockets[i] = new Rocket(child, this.geneCount, this.originVec);
      });

      return childRockets;
    };
  }
}

class Rocket {
  constructor(dna, geneCount, originVec, targetVec) {
    this.crashed = false;

    this.dna = dna || new DNA(null, geneCount);

    // Acceleration
    this.accVectors = this.dna.genes;

    // Velocity
    this.velVectors = [randVector()];

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
    this.fitness;
  }

  calcFitness() {
    const distance = calcDistance(
      this.pos.x,
      this.targetVec.x,
      this.pos.y,
      this.targetVec.y
    );

    // TODO: using a power function for fitness
    this.fitness = Math.pow(1 / distance, 10);
  }
}

class DNA {
  constructor(genes, geneCount = 100) {
    this.genes = genes || _.times(geneCount, i => randVector(0.1));
  }

  crossover(partner) {
    let newGenes = [];
    // Get a random midpoint, we'll take first half of genes from self, second half from parent.
    let mid = Math.floor(Math.random() * this.genes.length);

    for (let i = 0; i < this.genes.length; i++) {
      if (i > mid) {
        newGenes[i] = this.genes[i];
      } else {
        newGenes[i] = partner.dna.genes[i];
      }
    }

    return new DNA(newGenes);
  }

  mutate() {
    for (let i = 0; this.genes.length; i++) {
      if (Math.random() < 0.01) {
        this.genes[i] = randVector(0.1);
      }
    }
  }
}
