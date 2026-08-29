export type SpaceStation = {
  name: string;
  projectStatus: string;
  shieldStatus: string;
};

export type Resource = {
  name: string;
  quantity: number;
  utilization: number;
};

export type Supply = {
  name: string;
  quantity: number;
  unitCost: number;
};

export type StationPayload = {
  spaceStation: SpaceStation;
  resources: Resource[];
  supplies: Supply[];
};

export type HealthResponse = {
  status: string;
};

export type ErrorModel = {
  errorCode: string;
  errorMessage: string;
};
