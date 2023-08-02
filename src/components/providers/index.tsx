import { ReactNode } from "react";
import { RecoilRoot } from "recoil";
import { DbProvider } from "./DBProvider";
import ReactQueryProvider from "./ReactQueryProvider";

interface Props {
  children: ReactNode;
}

export default function Providers({ children }: Props) {
  return (
    <DbProvider>
      <RecoilRoot>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </RecoilRoot>
    </DbProvider>
  );
}
