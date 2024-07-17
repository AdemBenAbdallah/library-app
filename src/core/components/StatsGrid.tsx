import getMonthlyStatistics from "@/features/statistics/queries/getMonthlyStatistics";
import { useQuery } from "@blitzjs/rpc";
import { Box, Flex, Group, Paper, SimpleGrid, Text, rem } from "@mantine/core";
import {
  IconArrowDownRight,
  IconArrowUpRight,
  IconCoin,
  IconDiscount2,
  IconReceipt2,
  IconUserPlus,
} from "@tabler/icons-react";
import { useMemo } from "react";

const icons = {
  user: IconUserPlus,
  discount: IconDiscount2,
  receipt: IconReceipt2,
  coin: IconCoin,
};

const data = [
  { title: "Revenue", icon: "receipt", value: "13,456", diff: 10 },
  { title: "Profit", icon: "coin", value: "4,145", diff: -13 },
  { title: "New customers", icon: "user", value: "188", diff: -30 },
] as const;

export function StatsGrid() {
  const [monthlyStatistics] = useQuery(getMonthlyStatistics, {});

  const data = useMemo(() => {
    return [
      {
        title: "Revenue",
        icon: "receipt",
        value: monthlyStatistics.currentMonthRevenue,
        diff: monthlyStatistics.diffLastMonthPercentage,
      },
      {
        title: "New customers",
        icon: "user",
        value: monthlyStatistics.newUsersCount,
        diff: monthlyStatistics.newUsersPercentage,
      },
    ] as const;
  }, []);

  const stats = data.map((stat) => {
    const Icon = icons[stat.icon];
    const DiffIcon = stat.diff > 0 ? IconArrowUpRight : IconArrowDownRight;

    return (
      <Paper withBorder p="md" radius="md" key={stat.title}>
        <Group justify="space-between">
          <Text size="xs" c="dimmed" fw={700} tt={"uppercase"}>
            {stat.title}
          </Text>
          <Icon size="1.4rem" stroke={1.5} />
        </Group>

        <Group align="flex-end" gap="xs" mt={25}>
          <Text fz={rem(24)} fw={700} lh={1}>
            {stat.value}
          </Text>
          <Flex align={"center"} component={Text} c={stat.diff > 0 ? "teal" : "red"} fz="sm" fw={500} lh={1}>
            <span>{stat.diff}%</span>
            <DiffIcon size="1rem" stroke={1.5} />
          </Flex>
        </Group>

        <Text fz="xs" c="dimmed" mt={7}>
          Compared to previous month
        </Text>
      </Paper>
    );
  });
  return (
    <Box p={"xl"}>
      <SimpleGrid cols={{ base: 1, xs: 2, md: 4 }}>{stats}</SimpleGrid>
    </Box>
  );
}
