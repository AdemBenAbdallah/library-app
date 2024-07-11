import { Group, Pagination, Stack, Table, Text } from "@mantine/core";
import React from "react";

export type Column<T> = {
  header: string;
  accessor: keyof T | ((row: T) => React.ReactNode);
};

type RenderTableProps<T> = {
  data: T[];
  columns: Column<T>[];
  totalCount: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  itemsPerPage: number;
  from: number;
  to: number;
};

function RenderTable<T>({
  data,
  columns,
  totalCount,
  currentPage,
  onPageChange,
  itemsPerPage,
  from,
  to,
}: RenderTableProps<T>) {
  return (
    <Stack>
      <Table highlightOnHover striped>
        <Table.Thead>
          <Table.Tr>
            {columns.map((column, index) => (
              <Table.Th key={index}>{column.header}</Table.Th>
            ))}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {data.map((row, rowIndex) => (
            <Table.Tr key={rowIndex}>
              {columns.map((column, colIndex) => (
                <Table.Td key={colIndex}>
                  {typeof column.accessor === "function"
                    ? column.accessor(row)
                    : (row[column.accessor] as React.ReactNode)}
                </Table.Td>
              ))}
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
      <Group ml={"auto"}>
        <Pagination
          total={Math.ceil(totalCount / itemsPerPage)}
          value={currentPage}
          onChange={onPageChange}
          withEdges
        />
      </Group>
      <Text size="sm" c="dimmed">
        Showing {from} to {to} of {totalCount} results
      </Text>
    </Stack>
  );
}

export default RenderTable;
