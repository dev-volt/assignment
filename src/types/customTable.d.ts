type Column = {
  id: string;
  label: string;
};

type CustomTableProps = {
  columns: Column[];
  children: React.ReactNode;
};

type CustomTableCellProps = {
  children: React.ReactNode;
};

type CustomTableRowProps = {
  children: React.ReactNode;
};
