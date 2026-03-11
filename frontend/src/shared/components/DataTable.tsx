type Column<T> = {
  key: string;
  title: string;
  render: (row: T) => React.ReactNode;
};

type DataTableProps<T> = {
  columns: Array<Column<T>>;
  rows: T[];
  emptyMessage: string;
};

export function DataTable<T>({ columns, rows, emptyMessage }: DataTableProps<T>) {
  if (!rows.length) {
    return <div className="empty-state">{emptyMessage}</div>;
  }

  return (
    <div className="table-shell">
      <table className="data-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>{column.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column) => (
                <td key={column.key}>{column.render(row)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}