import { faker } from "@faker-js/faker";
import type { Resource, StationPayload, Supply } from "./types";

const PROJECT_STATUS = "Green";
const SHIELD_STATUS = "Not Yet Operational";

const PERSONNEL_ROLES = [
  "Personnel",
  "Engineers",
  "Mechanics",
  "Doctors",
  "Nurses",
  "Pilots",
  "Astronauts",
] as const;

function createResources(): Resource[] {
  return faker.helpers.arrayElements([...PERSONNEL_ROLES], 3).map((name) => ({
    name,
    quantity: faker.number.int({ min: 1, max: 40 }),
    utilization: faker.number.int({ min: 1, max: 100 }),
  }));
}

function createSupply(): Supply {
  return {
    name: faker.commerce.productName(),
    quantity: faker.number.int({ min: 1, max: 500 }),
    unitCost: faker.number.float({ min: 0.01, max: 999.99, fractionDigits: 2 }),
  };
}

export function generateStationPayload(): StationPayload {
  return {
    spaceStation: {
      name: `${faker.location.city()} Station`,
      projectStatus: PROJECT_STATUS,
      shieldStatus: SHIELD_STATUS,
    },
    resources: createResources(),
    supplies: [createSupply(), createSupply(), createSupply()],
  };
}
