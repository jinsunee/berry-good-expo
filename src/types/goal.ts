export interface Goal {
  id: string;
  title: string;
  startAt: number;
  endAt: number;
  items: Item[];
}

export type Item = {
  id: string;
  point: 3 | 2 | 1;
  memo: string;
};
