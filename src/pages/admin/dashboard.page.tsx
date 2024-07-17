import { StatsGrid } from "@/core/components/StatsGrid";
import DashLayout from "@/core/layouts/DashLayout";
import { BlitzPage } from "@blitzjs/next";
import { LineChart } from "@mantine/charts";

export const data = [
  {
    date: "Mar 22",
    Apples: 110,
  },
  {
    date: "Mar 23",
    Apples: 60,
  },
  {
    date: "Mar 24",
    Apples: 80,
  },
  {
    date: "Mar 25",
    Apples: null,
  },
  {
    date: "Mar 26",
    Apples: null,
  },
  {
    date: "Mar 27",
    Apples: 40,
  },
  {
    date: "Mar 28",
    Apples: 120,
  },
  {
    date: "Mar 29",
    Apples: 80,
  },
];
const DashboardPage: BlitzPage = () => {
  return (
    <DashLayout>
      <StatsGrid />

      <LineChart
        flex={6}
        h={"100%"}
        data={data}
        dataKey="date"
        series={[{ name: "Apples", color: "indigo.6" }]}
        curveType="monotone"
        connectNulls
      />
    </DashLayout>
  );
};

export default DashboardPage;
