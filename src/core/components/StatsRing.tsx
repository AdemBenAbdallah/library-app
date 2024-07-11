import getAdminStatistics from "@/features/statistics/queries/getAdminStatistics";
import { useQuery } from "@blitzjs/rpc";
import { Center, Group, Paper, RingProgress, Stack, Text, rem } from "@mantine/core";
import { IconArrowDownRight, IconArrowUpRight } from "@tabler/icons-react";
import { useMemo } from "react";

const icons = {
  up: IconArrowUpRight,
  down: IconArrowDownRight,
};

export function StatsRing() {
  const [statistics] = useQuery(getAdminStatistics, {});

  const data = useMemo(() => {
    return [
      {
        label: "Year Revenue",
        stats: statistics.yearRevenue.value + " DT",
        progress: statistics.yearRevenue.progress,
        color: "teal",
        icon: statistics.yearRevenue.up ? "up" : "down",
      },
      {
        label: "Monthly Revenue",
        stats: statistics.monthlyRevenue.value + " DT",
        progress: statistics.monthlyRevenue.progress,
        color: "red",
        icon: statistics.monthlyRevenue.up ? "up" : "down",
      },
      {
        label: "New users",
        stats: statistics.newUsersCount.value,
        progress: statistics.newUsersCount.progress,
        color: "blue",
        icon: statistics.newUsersCount.up ? "up" : "down",
      },
    ] as const;
  }, [statistics]);

  const stats = data.map((stat) => {
    const Icon = icons[stat.icon];
    return (
      <Paper bg={"lime.0 "} withBorder radius="md" p="xs" key={stat.label}>
        <Group>
          <RingProgress
            size={80}
            roundCaps
            thickness={8}
            sections={[{ value: stat.progress, color: stat.color }]}
            label={
              <Center>
                <Icon style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
              </Center>
            }
          />

          <div>
            <Text c="dimmed" size="xs" tt="uppercase" fw={700}>
              {stat.label}
            </Text>
            <Text fw={700} size="xl">
              {stat.stats}
            </Text>
          </div>
        </Group>
      </Paper>
    );
  });

  return <Stack miw={300}>{stats}</Stack>;
}
