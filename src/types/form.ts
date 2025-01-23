export type FormMasterOffice = {
  id: string;
  officeName: string;
  createdAt: string;
};

export type FormMasterMeetingRoom = {
  id: string;
  officeId: string;
  officeName: string;
  roomName: string;
  capacity: number;
  createdAt: string;
};

export type FormMasterJenisKonsumsi = {
  id: string;
  name: string;
  maxPrice: number;
  createdAt: string;
};

export type FormInputsKey =
  | "unit"
  | "room"
  | "capacity"
  | "date"
  | "timeStart"
  | "timeEnd"
  | "participant"
  | "consumption"
  | "consumptionPrice";
export type FormInputs = {
  unit: string;
  room: string;
  capacity: number;
  date: string;
  timeStart: number; // timestamp
  timeEnd: number;
  participant: number;
  consumption: Record<string, boolean>;
  consumptionPrice: number;
};
