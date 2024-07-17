import BecomeProModal from "./components/BecomeProModal";

export enum GlobalModal {
  becomeBro = "becomePro",
  AddUserSubsctiption = "AddUserSubsctiption",
}

export const globalModals = {
  [GlobalModal.becomeBro]: BecomeProModal,
};

declare module "@mantine/modals" {
  export interface MantineModalsOver {
    modals: typeof globalModals;
  }
}
