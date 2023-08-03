export interface Goal {
  id: number;
  title: string;
  startAt: Date;
  endAt: Date;
  items?: Item[];
}

export type Item = {
  id: string;
  point: 3 | 2 | 1;
  memo: string;
};
