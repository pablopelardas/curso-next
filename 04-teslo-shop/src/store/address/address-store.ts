import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  address: {
    firstName: string;
    lastName: string;
    address: string;
    address2: string;
    zip: string;
    city: string;
    country: string;
    phone: string;
  };
  // methods
  setAddress: (address: State["address"]) => void;
}

const useAddressStore = create<State>()(
  persist(
    (set, get) => ({
      address: {
        firstName: "",
        lastName: "",
        address: "",
        address2: "",
        zip: "",
        city: "",
        country: "",
        phone: "",
      },
      // methods
      setAddress: (address) => {
        set({ address });
      },
    }),
    {
      name: "address-storage",
    }
  )
);

export { useAddressStore };
