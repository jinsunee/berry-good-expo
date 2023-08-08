import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "components/providers/ReactQueryProvider";
import { useDB } from "hooks/useDB";
import { useRecoilState } from "recoil";
import { DisplayMode, displayModeAtom } from "../../../../states";

const displayModeQueryKey = "displayMode";

const defaultDisplayMode: DisplayMode = "calendar";

export function useDisplayMode() {
  const db = useDB();
  const [displayMode, setDisplayMode] = useRecoilState(displayModeAtom);

  useQuery(
    [displayModeQueryKey],
    async () => {
      const view = await AsyncStorage.getItem("view");
      return view ?? defaultDisplayMode;
    },
    {
      onSuccess: (data) => {
        setDisplayMode(data as DisplayMode);
      },
    }
  );

  // 처음에 들어온 유저라면 setting 데이터가 있어야한다.
  // 근데 이건 sqllite를 이용하지 않아도 되지 않을까? -> 하나씩 localStorage에 넣는 방법이 있음.
  //
  const mutation = useMutation(
    async (newMode: DisplayMode) => {
      AsyncStorage.setItem("view", newMode);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([displayModeQueryKey]);
      },
    }
  );

  const switchDisplayMode = () => {
    let newMode = defaultDisplayMode;

    if (displayMode) {
      if (displayMode === "calendar") {
        newMode = "normal";
      } else if (displayMode === "normal") {
        newMode = "calendar";
      }
    }

    mutation.mutate(newMode);
  };

  return { displayMode: displayMode ?? defaultDisplayMode, switchDisplayMode };
}
