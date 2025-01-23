export type Option = {
  label: React.ReactNode;
  value: string;
};

type UIDConsumption = {
  name: string;
  totalPackage: string;
  totalPrice: string;
};
type UIDSummary = {
  roomName: string;
  capacity: string;
  averageOccupancyPerMonth: string;
  totalConsumption: UIDConsumption[];
};
type UnitIndukData = {
  officeName: string;
  detailSummary: UIDSummary[];
};

export type DashboardData = {
  createdAt: string;
  period: string;
  data: UnitIndukData[];
  id: string;
};
