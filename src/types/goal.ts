export interface Goal {
  id: number;
  title: string;
  startAt: Date;
  endAt: Date;
  items?: GoalItem[];
}

export type GoalItem = {
  id: string;
  date: string;
  point: 3 | 2 | 1;
  memo: string;
};
