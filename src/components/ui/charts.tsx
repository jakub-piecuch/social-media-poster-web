
import * as React from "react";
import {
  Area,
  Bar,
  CartesianGrid,
  Cell,
  ComposedChart,
  Legend,
  Line,
  Pie,
  PieChart as ReChartsPieChart,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
  LabelList
} from "recharts";
import { ChartContainer, ChartTooltipContent } from "./chart";

interface ChartProps {
  data: any[];
  categories?: string[];
  index: string;
  colors?: string[];
  valueFormatter?: (value: number) => string;
  className?: string;
  customMargins?: { top: number; right: number; left: number; bottom: number };
  barSize?: number;
}

export const LineChart = ({
  data,
  categories,
  index,
  colors = ["#0ea5e9", "#22c55e", "#eab308", "#ef4444"],
  valueFormatter = (value: number) => value.toString(),
  className,
  customMargins,
}: ChartProps) => {
  if (!data?.length || !categories?.length) return null;

  const margins = customMargins || { top: 40, right: 30, left: 40, bottom: 40 };

  return (
    <ChartContainer 
      className={className}
      config={{
        ...Object.fromEntries(
          categories.map((category, i) => [
            category,
            { color: colors[i % colors.length] },
          ])
        ),
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} margin={margins}>
          <XAxis
            dataKey={index}
            tickLine={false}
            axisLine={false}
            padding={{ left: 20, right: 20 }}
            tick={{ fontSize: 12 }}
            height={40}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => valueFormatter(value)}
            width={90}
            tick={{ fontSize: 12 }}
            padding={{ top: 20, bottom: 20 }}
          />
          <Tooltip
            content={({ active, payload, label }) => (
              <ChartTooltipContent
                active={active}
                payload={payload}
                label={label}
                formatter={(value) => valueFormatter(Number(value))}
              />
            )}
            wrapperStyle={{ zIndex: 1000 }}
            cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
          />
          <Legend 
            align="center" 
            verticalAlign="top" 
            height={36}
            wrapperStyle={{ 
              paddingTop: '12px',
              paddingBottom: '12px', 
              fontSize: '12px'
            }} 
          />
          {categories.map((category, i) => (
            <Line
              key={category}
              type="monotone"
              dataKey={category}
              stroke={colors[i % colors.length]}
              strokeWidth={1.5}
              dot={false}
              activeDot={{ r: 4, strokeWidth: 0 }}
            />
          ))}
        </ComposedChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export const BarChart = ({
  data,
  categories,
  index,
  colors = ["#0ea5e9", "#22c55e", "#eab308", "#ef4444"],
  valueFormatter = (value: number) => value.toString(),
  className,
  customMargins,
  barSize,
}: ChartProps) => {
  if (!data?.length || !categories?.length) return null;

  // Use customMargins if provided, otherwise use defaults
  const margins = customMargins || { top: 40, right: 20, left: 35, bottom: 20 };

  // Calculate optimal bar size based on data length
  const optimalBarSize = () => {
    if (barSize !== undefined) return barSize;
    if (!data) return 16;
    const count = data.length;
    if (count <= 3) return 30;
    if (count <= 4) return 24;
    if (count <= 6) return 18;
    return 16;
  };

  return (
    <ChartContainer 
      className={className}
      config={{
        ...Object.fromEntries(
          categories.map((category, i) => [
            category,
            { color: colors[i % colors.length] },
          ])
        ),
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart 
          data={data} 
          margin={margins}
        >
          <XAxis
            dataKey={index}
            tickLine={false}
            axisLine={false}
            padding={{ left: 10, right: 10 }}
            tick={{ fontSize: 12 }}
            height={30}
            interval={0}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => valueFormatter(value)}
            width={80}
            tick={{ fontSize: 12 }}
            padding={{ top: 10, bottom: 10 }}
          />
          <Tooltip
            content={({ active, payload, label }) => (
              <ChartTooltipContent
                active={active}
                payload={payload}
                label={label}
                formatter={(value) => valueFormatter(Number(value))}
              />
            )}
            wrapperStyle={{ zIndex: 1000 }}
            cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
          />
          <Legend 
            align="center" 
            verticalAlign="top" 
            height={36}
            wrapperStyle={{ 
              paddingTop: '12px',
              paddingBottom: '12px', 
              fontSize: '12px'
            }} 
          />
          {categories.map((category, i) => (
            <Bar
              key={category}
              dataKey={category}
              fill={colors[i % colors.length]}
              radius={[4, 4, 0, 0]}
              barSize={optimalBarSize()}
            />
          ))}
        </ComposedChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export const PieChart = ({
  data,
  category,
  index,
  colors = ["#0ea5e9", "#22c55e", "#eab308", "#ef4444"],
  valueFormatter = (value: number) => value.toString(),
  className,
}: Omit<ChartProps, "categories"> & { category: string }) => {
  if (!data?.length) return null;

  return (
    <ChartContainer 
      className={className}
      config={{
        ...Object.fromEntries(
          data.map((item, i) => [
            item[index],
            { color: colors[i % colors.length] },
          ])
        ),
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <ReChartsPieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            dataKey={category}
            nameKey={index}
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, i) => (
              <Cell 
                key={`cell-${i}`} 
                fill={colors[i % colors.length]} 
              />
            ))}
          </Pie>
          <Tooltip
            content={({ active, payload }) => (
              <ChartTooltipContent
                active={active}
                payload={payload}
                formatter={(value) => valueFormatter(Number(value))}
              />
            )}
            wrapperStyle={{ zIndex: 1000 }}
          />
          <Legend 
            formatter={(value, entry, index) => data[index][index]} 
            align="center" 
            verticalAlign="bottom" 
            wrapperStyle={{ fontSize: '11px' }}
          />
        </ReChartsPieChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};
