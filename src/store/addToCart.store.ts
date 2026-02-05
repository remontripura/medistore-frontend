import { MedicineDetails } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface MedicineStore {
  medicines: MedicineDetails[];
  selectedMedicine: MedicineDetails | null;

  setMedicines: (data: MedicineDetails[]) => void;
  setSelectedMedicine: (data: MedicineDetails | null) => void;
  addMedicine: (data: MedicineDetails) => void;
  removeMedicine: (id: string) => void;
}

export const useMedicineStore = create<MedicineStore>()(
  persist(
    (set) => ({
      medicines: [],
      selectedMedicine: null,

      setMedicines: (data) =>
        set(() => ({
          medicines: data,
        })),

      setSelectedMedicine: (data) =>
        set(() => ({
          selectedMedicine: data,
        })),

      addMedicine: (data) =>
        set((state) => {
          const existingMedicine = state.medicines.find(
            (medicine) => medicine.id === data.id,
          );

          if (existingMedicine) {
            return {
              medicines: state.medicines.map((medicine) =>
                medicine.id === data.id
                  ? {
                      ...medicine,
                      count: Number(medicine.count) + Number(data.count),
                    }
                  : medicine,
              ),
            };
          }

          return {
            medicines: [...state.medicines, data],
          };
        }),

      removeMedicine: (id) =>
        set((state) => ({
          medicines: state.medicines.filter((medicine) => medicine.id !== id),
        })),
    }),
    {
      name: "medicine-store",
    },
  ),
);
