import { create } from 'zustand';

interface WorkSpaceValue {
  name: string;
  imageUrl: string;
  updateImageUrl: (url: string) => void;
  updateValues: (params: Partial<WorkSpaceValue>) => void;
  currStep: number;
  setCurrStep: (step: number) => void;
}

const useWorkSpaceValue = create<WorkSpaceValue>((set) => ({
  name: '',
  imageUrl: '',
  updateImageUrl: (url) => set({ imageUrl: url }),
  updateValues: (values) => set({ ...values }),
  currStep: 1,
  setCurrStep: (step) => set({ currStep: step }),
}));

export { useWorkSpaceValue };
