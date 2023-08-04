import { FormProvider, useForm } from "react-hook-form";

export type ItemFormInputs = {
  point: 1 | 2 | 3;
  memo: string;
};

export function ItemFormProvider({ children }: { children: React.ReactNode }) {
  const methods = useForm<ItemFormInputs>();

  return <FormProvider {...methods}>{children}</FormProvider>;
}
