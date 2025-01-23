import { Button, buttonVariants } from "@/components/Button";
import Heading from "@/components/form/Heading";
import { Checkbox, Input, InputWrapper, Select } from "@/components/form/Inputs";
import {
  FormInputs,
  FormInputsKey,
  FormMasterJenisKonsumsi,
  FormMasterMeetingRoom,
  FormMasterOffice,
} from "@/types/form";
import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router";

export default function ViewFormAdd() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [formError, setFormError] = useState<Record<FormInputsKey, string>>({
    unit: "",
    room: "",
    capacity: "",
    date: "",
    timeStart: "",
    timeEnd: "",
    participant: "",
    consumption: "",
    consumptionPrice: "",
  });
  const [values, setValues] = useState<FormInputs>({
    unit: "",
    room: "",
    capacity: 0,
    date: "",
    timeStart: 0,
    timeEnd: 0,
    participant: 0,
    consumption: {},
    consumptionPrice: 0,
  });
  const [submitAllowed, setSubmitAllowed] = useState<boolean>(false);

  const [unitOptions, setUnitOptions] = useState<FormMasterOffice[]>([]);
  const [roomData, setRoomData] = useState<FormMasterMeetingRoom[]>([]);
  const [roomOptions, setRoomOptions] = useState<FormMasterMeetingRoom[]>([]);
  const [consumptionData, setConsumptionData] = useState<FormMasterJenisKonsumsi[]>([]);
  const timeOptions = useMemo<{ label: string; value: string }[]>(() => {
    const hours = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
    return hours.map((hour) => ({
      label: hour.toString().padStart(2, "0") + ":00",
      value: hour.toString(),
    }));
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const unitFetch = axios.get<FormMasterOffice[]>(
          "https://6666c7aea2f8516ff7a4e261.mockapi.io/api/dummy-data/masterOffice"
        );
        const roomFetch = axios.get<FormMasterMeetingRoom[]>(
          "https://6666c7aea2f8516ff7a4e261.mockapi.io/api/dummy-data/masterMeetingRooms"
        );
        const consumptionFetch = axios.get<FormMasterJenisKonsumsi[]>(
          "https://6686cb5583c983911b03a7f3.mockapi.io/api/dummy-data/masterJenisKonsumsi"
        );

        const [unitRes, roomRes, consumptionRes] = await Promise.all([unitFetch, roomFetch, consumptionFetch]);
        setUnitOptions(unitRes.data);
        setRoomData(roomRes.data);
        setConsumptionData(consumptionRes.data);
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

  useEffect(() => {
    if (values.timeStart === 0 || values.timeEnd === 0) return;

    const data = {
      "1": false,
      "2": false,
      "3": false,
    };
    // Jika meeting start sebelum jam 11, maka dapat snack siang
    if (values.timeStart < 11) {
      data["1"] = true;
    }
    // Jika meeting antara jam 11 - 14, maka dapat makan siang
    // Cek timeEnd, karena timeStart akan otomatis dibawah timeEnd
    if (values.timeEnd > 11) {
      data["2"] = true;
    }
    // Jika meeting end setelah jam 14, maka dapat snack sore
    if (values.timeEnd > 14) {
      data["3"] = true;
    }

    const basePrice = consumptionData.reduce((acc, curr) => {
      if (data[curr.id as keyof typeof data]) {
        return acc + curr.maxPrice;
      }
      return acc;
    }, 0);
    console.log({ basePrice });

    setValues((prev) => ({ ...prev, consumption: data, consumptionPrice: basePrice * values.participant }));
  }, [values.timeStart, values.timeEnd, values.participant, consumptionData]);

  useEffect(() => {
    if (Object.values(formError).some((error) => error !== "")) {
      setSubmitAllowed(false);
      return;
    }

    if (
      values.unit === "" ||
      values.room === "" ||
      values.date === "" ||
      values.timeStart === 0 ||
      values.timeEnd === 0 ||
      values.participant === 0
    ) {
      setSubmitAllowed(false);
      return;
    }

    setSubmitAllowed(true);
  }, [values, formError]);

  const onUnitChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const { value } = e.target;
      setValues((prev) => ({ ...prev, unit: value, room: "", capacity: 0 }));
      setRoomOptions(roomData.filter((room) => room.officeId === value));
    },
    [roomData]
  );
  const onRoomChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const { value } = e.target;
      const data = roomData.find((room) => room.id === value);
      if (!data) return;
      setValues((prev) => ({ ...prev, room: value, capacity: data.capacity }));
    },
    [roomData]
  );
  const onDateChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    const selectedDate = new Date(e.target.value);
    if (selectedDate < currentDate) {
      setFormError((prev) => ({ ...prev, date: "Tanggal tidak boleh kurang dari hari ini" }));
    } else {
      setFormError((prev) => ({ ...prev, date: "" }));
    }
    setValues((prev) => ({ ...prev, date: e.target.value, timeStart: 0, timeEnd: 0 }));
    setFormError((prev) => ({ ...prev, timeStart: "", timeEnd: "" }));
  }, []);
  const onTimeStartChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setFormError((prev) => ({ ...prev, timeStart: "" }));

      const { value } = e.target;
      const isToday = new Date(values.date).setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0);
      const currentTime = new Date();
      const selectedTime = new Date();
      selectedTime.setHours(Number(value), 0, 0, 0);

      if (selectedTime.getTime() < currentTime.getTime() && isToday) {
        setFormError((prev) => ({ ...prev, timeStart: "Waktu tidak boleh kurang dari waktu sekarang" }));
      }
      if (values.timeEnd !== 0 && Number(value) >= values.timeEnd) {
        setFormError((prev) => ({ ...prev, timeStart: "Waktu tidak boleh lebih dari atau sama dengan waktu selesai" }));
      }

      setValues((prev) => ({ ...prev, timeStart: Number(value) }));
    },
    [values.date, values.timeEnd]
  );
  const onTimeEndChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setFormError((prev) => ({ ...prev, timeEnd: "" }));

      const { value } = e.target;
      const startTime = values.timeStart;
      const selectedTime = Number(value);

      if (selectedTime <= startTime) {
        setFormError((prev) => ({ ...prev, timeEnd: "Waktu tidak boleh kurang dari atau sama dengan waktu mulai" }));
      }

      setValues((prev) => ({ ...prev, timeEnd: Number(value) }));
    },
    [values]
  );
  const onParticipantChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      const maxParticipant = values.capacity;
      const participant = Number(value);

      if (participant > maxParticipant) {
        setFormError((prev) => ({
          ...prev,
          participant: `Jumlah peserta tidak boleh lebih dari kapasitas ruangan (${maxParticipant} orang)`,
        }));
      } else {
        setFormError((prev) => ({ ...prev, participant: "" }));
      }

      setValues((prev) => ({ ...prev, participant }));
    },
    [values]
  );

  return (
    <>
      <Heading
        title="Ruang Meeting"
        paths={[
          {
            name: "Ruang Meeting",
            href: "/form",
          },
          {
            name: "Pesan Ruangan",
            href: "/form/add",
          },
        ]}
        showBackButton
      />

      <div
        className="px-7 py-5 flex flex-col gap-9 bg-white border border-form-border rounded-lg text-form-foreground"
        style={{
          boxShadow: "0px 4px 20px #6A6A6A1A",
        }}
      >
        <div className="flex flex-col gap-4">
          <h3 className="font-semibold text-base leading-[21.79px]">Informasi Ruang Meeting</h3>
          <div className="flex items-start gap-5">
            <InputWrapper label="Unit" labelProps={{ htmlFor: "unit" }} error={formError.unit}>
              <Select
                id="unit"
                options={unitOptions.map((unit) => ({
                  label: unit.officeName,
                  value: unit.id,
                }))}
                value={values.unit}
                placeholder="Pilih Unit"
                onChange={onUnitChange}
              />
            </InputWrapper>
            <InputWrapper label="Ruang Meeting" labelProps={{ htmlFor: "room" }} error={formError.room}>
              <Select
                id="room"
                options={roomOptions.map((room) => ({
                  label: room.roomName,
                  value: room.id,
                }))}
                value={values.room}
                placeholder="Pilih Ruang Meeting"
                onChange={onRoomChange}
              />
            </InputWrapper>
          </div>

          <div className="flex items-start gap-5">
            <InputWrapper
              label="Kapasitas"
              labelProps={{
                htmlFor: "kapasitas",
              }}
              error={formError.capacity}
            >
              <Input
                type="number"
                id="kapasitas"
                placeholder="Masukkan kapasitas ruangan"
                disabled
                value={values.capacity}
                onChange={(e) => setValues((prev) => ({ ...prev, capacity: Number(e.target.value) }))}
              />
            </InputWrapper>
          </div>
        </div>

        <hr className="border-t-2 border-form-border" />

        <div className="flex flex-col gap-5">
          <h3 className="font-semibold text-base leading-[21.79px]">Informasi Rapat</h3>
          <div className="flex items-start gap-5">
            <InputWrapper label="Tanggal Rapat" labelProps={{ htmlFor: "date" }} error={formError.date}>
              <Input
                type="date"
                id="date"
                placeholder="Pilih tanggal rapat"
                required
                value={values.date}
                onChange={onDateChange}
              />
            </InputWrapper>
            <InputWrapper label="Waktu Mulai" labelProps={{ htmlFor: "timeStart" }} error={formError.timeStart}>
              <Select
                id="timeStart"
                disabled={values.date === ""}
                options={timeOptions}
                value={values.timeStart === 0 ? "" : values.timeStart.toString()}
                placeholder="Pilih Waktu Mulai"
                onChange={onTimeStartChange}
              />
            </InputWrapper>
            <InputWrapper label="Waktu Selesai" labelProps={{ htmlFor: "timeEnd" }} error={formError.timeEnd}>
              <Select
                id="timeEnd"
                disabled={values.timeStart === 0}
                options={timeOptions}
                value={values.timeEnd === 0 ? "" : values.timeEnd.toString()}
                placeholder="Pilih Waktu Selesai"
                onChange={onTimeEndChange}
              />
            </InputWrapper>
          </div>
          <div className="flex items-start gap-5">
            <InputWrapper label="Jumlah Peserta" labelProps={{ htmlFor: "participant" }} error={formError.participant}>
              <Input
                type="number"
                id="participant"
                placeholder="Masukkan jumlah peserta"
                value={values.participant === 0 ? "" : values.participant.toString()}
                min={0}
                onChange={onParticipantChange}
              />
            </InputWrapper>
          </div>
          <div className="flex items-start gap-5">
            <InputWrapper label="Konsumsi Rapat" labelProps={{ htmlFor: "consumption" }} error={formError.consumption}>
              <div className="flex flex-col gap-2">
                <Checkbox checked={values.consumption["1"]}>Snack Siang</Checkbox>
                <Checkbox checked={values.consumption["2"]}>Makan Siang</Checkbox>
                <Checkbox checked={values.consumption["3"]}>Snack Sore</Checkbox>
              </div>
            </InputWrapper>
          </div>
          <div className="flex items-start gap-5">
            <InputWrapper
              label="Nominal Konsumsi"
              labelProps={{ htmlFor: "consumptionPrice" }}
              error={formError.consumptionPrice}
            >
              <Input
                type="number"
                id="consumptionPrice"
                readOnly
                placeholder="Masukkan harga konsumsi"
                value={values.consumptionPrice.toString()}
                extra={{ prefix: "Rp." }}
              />
            </InputWrapper>
          </div>
        </div>

        <hr className="border-t-2 border-form-border" />

        <div className="flex items-center justify-end gap-2.5">
          <Link to={"/form"} className={buttonVariants({ variant: "destructive", fill: "ghost" })}>
            Batal
          </Link>
          <Button
            disabled={
              Object.values(formError).some((error) => error !== "") ||
              Object.values(values).some((value) => value === "" || value === 0)
            }
            onClick={() => {
              alert(`Data yang akan disubmit: ${JSON.stringify(values, null, 2)}`);
            }}
          >
            Simpan
          </Button>
        </div>
      </div>
    </>
  );
}
