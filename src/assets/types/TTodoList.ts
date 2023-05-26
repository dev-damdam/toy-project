// type
export type TTodo = {
  id: string;
  category: {
    name: string,
    color: string,
  },
  name: string;
  reg_date: string;
  date: string;
  is_completed: boolean;
};

export type TDayTodo = {
  date: string;
  todo: TTodo[];
};
