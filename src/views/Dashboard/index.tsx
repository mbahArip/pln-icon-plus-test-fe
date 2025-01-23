import IconChevron from "@/assets/icons/dashboard/chevron-right.svg";
import IconGeneration from "@/assets/icons/dashboard/generation.svg";
import IconSettings from "@/assets/icons/dashboard/settings.svg";
import { Icon } from "@/components/Icon";
import { DashboardData, Option } from "@/types/dashboard";
import axios from "axios";

import { useEffect, useMemo, useState } from "react";
import { PolarAngleAxis, RadialBar, RadialBarChart, ResponsiveContainer } from "recharts";

export default function ViewDashboard() {
  const periodOptions = useMemo<Option[]>(
    () => [
      {
        label: "Januari 2024",
        value: "Jan-2024",
      },
      {
        label: "Februari 2024",
        value: "Feb-2024",
      },
      {
        label: "Maret 2024",
        value: "Mar-2024",
      },
      {
        label: "April 2024",
        value: "Apr-2024",
      },
      {
        label: "Mei 2024",
        value: "Mei-2024",
      },
      {
        label: "Juni 2024",
        value: "Jun-2024",
      },
      {
        label: "Juli 2024",
        value: "Jul-2024",
      },
      {
        label: "Agustus 2024",
        value: "Agu-2024",
      },
      {
        label: "September 2024",
        value: "Sep-2024",
      },
      {
        label: "Oktober 2024",
        value: "Okt-2024",
      },
      {
        label: "November 2024",
        value: "Nov-2024",
      },
      {
        label: "Desember 2024",
        value: "Des-2024",
      },
    ],
    []
  );
  const [selectedPeriod, setSelectedPeriod] = useState<string>(periodOptions[0].value);
  const [data, setData] = useState<DashboardData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await axios.get<DashboardData[]>(
          "https://6686cb5583c983911b03a7f3.mockapi.io/api/dummy-data/summaryBookings"
        );
        setData(data.data);
      } catch (error) {
        const e = error as Error;
        console.error(`Failed to fetch data: `, error);
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="font-roboto w-full">
      <nav className="px-5 py-3 border-b gap-3 inline-flex items-center justify-between w-full border-[#ecf0f2]">
        <div className="inline-flex gap-3 items-center">
          {/* <Icon name="Settings" className="size-8 stroke-iconGrey" /> */}
          <img src={IconSettings} className="size-8" alt="Settings icon" />
          <h1 className="text-[22px]">DASHBOARD</h1>
        </div>

        {/* <Icon name="ChevronRight" className="size-6 stroke-iconLight" /> */}
        <img src={IconChevron} className="size-6" alt="Chevron icon" />
      </nav>
      <main className="space-y-[14px] p-5 w-full">
        {/* Dropdown */}
        <div className="flex flex-col gap-1 items-start justify-start">
          <label htmlFor="periode" className="text-[12px] tracking-[2%] leading-[14px] text-[#4e4e4e] opacity-80">
            Periode
          </label>
          <select
            id="periode"
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="w-[240px] h-[34px] rounded-lg border text-xs border-dashboard-primary bg-[#ecf9ff] p-2.5 appearance-none outline-none"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml;utf8,<svg fill='%2300A3E9' height='8' viewBox='0 0 24 24' width='10' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>\")",
              backgroundPosition: "right 10px top 50%",
              backgroundSize: "14px",
              backgroundRepeat: "no-repeat",
            }}
          >
            {periodOptions.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </div>

        {/* Data Grid */}
        {loading ? (
          <div className="grid min-h-[66dvh] place-items-center">
            <div className="flex flex-col items-center justify-center gap-2">
              <Icon name="LoaderCircle" className="size-10 stroke-dashboard-primary animate-spin" />
              <p className="text-[12px] text-[#4e4e4e] opacity-80 animate-pulse">Sedang memuat data...</p>
            </div>
          </div>
        ) : error ? (
          <div className="grid min-h-[66dvh] place-items-center">
            <div className="flex flex-col items-center justify-center gap-2">
              <Icon name="Frown" className="size-10 stroke-red-500" />
              <p className="text-[12px] text-red-500">{error ?? "Unknown error occured"}</p>
            </div>
          </div>
        ) : (
          <>
            {data.find((uid) => uid.period === selectedPeriod)?.data.length ? (
              <div className="grid grid-cols-5 gap-4 place-items-start w-full max-w-[100dvw] overflow-x-auto">
                {data
                  .find((uid) => uid.period === selectedPeriod)
                  ?.data.map((unitInduk) => (
                    <div key={unitInduk.officeName} className="grid grid-cols-1 gap-1 w-full">
                      {/* Title */}
                      <div className="inline-flex items-center gap-3 py-1.5 border-b">
                        <img src={IconGeneration} alt="Generation icon" className="size-6" />
                        <h2 className="font-bold text-base leading-snug text-[#868E96">{unitInduk.officeName}</h2>
                      </div>

                      {/* Data */}
                      <div className="grid gap-3">
                        {unitInduk.detailSummary.map((summary) => {
                          const percentage =
                            (Number(summary.averageOccupancyPerMonth) / Number(summary.capacity)) * 100;
                          const totalConsumptionPackage = summary.totalConsumption.reduce((acc, curr) => {
                            return acc + Number(curr.totalPackage);
                          }, 0);
                          const totalConsumptionPrice = summary.totalConsumption.reduce((acc, curr) => {
                            return acc + Number(curr.totalPrice);
                          }, 0);

                          return (
                            <div
                              key={`${unitInduk.officeName}-${summary.roomName}`}
                              className="grid grid-cols-1 gap-1 p-3 rounded-lg bg-dashboard-card w-full"
                            >
                              <h3 className="text-sm leading-4 tracking-[2%] text-[#4e4e4e]">{summary.roomName}</h3>
                              {/* Persentase Pemakaian */}
                              <div className="flex items-center justify-between gap-1.5 py-2">
                                <div className="flex flex-col gap-1.5 font-inter">
                                  <span className="text-[11px] leading-[13.31px] text-dashboard-secondary">
                                    Persentase Pemakaian
                                  </span>
                                  <span className="font-bold text-xl leading-6">
                                    {new Intl.NumberFormat("id-ID", {
                                      style: "percent",
                                      maximumFractionDigits: 2,
                                      minimumFractionDigits: 2,
                                    }).format(percentage / 100)}
                                  </span>
                                </div>
                                <ResponsiveContainer
                                  width={"100%"}
                                  height={"100%"}
                                  className={"max-w-12 max-h-12 aspect-square"}
                                >
                                  <RadialBarChart
                                    data={[
                                      {
                                        value: percentage,
                                        fill: "#00A3E9",
                                      },
                                    ]}
                                    innerRadius={"100%"}
                                    outerRadius={"100%"}
                                    barSize={8}
                                    startAngle={90}
                                    endAngle={-270}
                                  >
                                    <PolarAngleAxis
                                      type="number"
                                      dataKey={"value"}
                                      angleAxisId={0}
                                      domain={[0, 100]}
                                      tick={false}
                                    />
                                    <RadialBar
                                      dataKey={"value"}
                                      angleAxisId={0}
                                      background={{
                                        enableBackground: "true",
                                        fill: "#CCCCCC",
                                      }}
                                      cornerRadius={10}
                                      animationDuration={1000}
                                    />
                                  </RadialBarChart>
                                </ResponsiveContainer>
                              </div>

                              {/* Nominal Konsumsi */}
                              <div className="flex items-center justify-between gap-1.5">
                                <div className="flex flex-col gap-1.5 font-inter">
                                  <span className="text-[11px] leading-[13.31px] text-dashboard-secondary">
                                    Nominal Konsumsi
                                  </span>
                                  <span className="font-bold text-xl leading-6">
                                    {new Intl.NumberFormat("id-ID", {
                                      style: "currency",
                                      currency: "IDR",
                                      maximumFractionDigits: 0,
                                    }).format(totalConsumptionPrice)}
                                  </span>
                                </div>
                              </div>

                              {/* Detail Konsumsi */}
                              {summary.totalConsumption.map((consumption) => (
                                <div
                                  key={`${unitInduk.officeName}-${summary.roomName}-${consumption.name}`}
                                  className="grid gap-[21px] grid-cols-2 items-center w-full"
                                >
                                  <span className="text-[10px] leading-[15px] tracking-[2%] font-medium">
                                    {consumption.name}
                                  </span>
                                  <div className="flex flex-col gap-[3px] w-full">
                                    <span className="text-xs leading-[15px] tracking-[2%]">
                                      {consumption.totalPackage}
                                    </span>
                                    <div
                                      className="h-2 bg-dashboard-primary rounded-sm"
                                      style={{
                                        width: `${(Number(consumption.totalPackage) / totalConsumptionPackage) * 100}%`,
                                      }}
                                    />
                                  </div>
                                </div>
                              ))}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="grid min-h-[66dvh] place-items-center col-span-full">
                <div className="flex flex-col items-center justify-center gap-2">
                  <p className="text-[12px] text-[#4e4e4e] opacity-80">Tidak ada data</p>
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
