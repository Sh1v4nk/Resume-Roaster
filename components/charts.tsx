"use client";

import {
    PieChart,
    Pie,
    Cell,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

interface ChartData {
    sections: {
        name: string;
        score: number;
        completeness: number;
    }[];
    keywords: {
        found: string[];
        missing: string[];
    };
    score: number;
}

interface SectionsPieChartProps {
    data: ChartData["sections"];
}

export function SectionsPieChart({ data }: SectionsPieChartProps) {
    // Theme-adaptive vibrant color palette
    const vibrantColors = [
        "#ef4444", // Red-500
        "#06b6d4", // Cyan-500
        "#3b82f6", // Blue-500
        "#f97316", // Orange-500
        "#10b981", // Emerald-500
        "#eab308", // Yellow-500
        "#a855f7", // Purple-500
        "#ec4899", // Pink-500
        "#84cc16", // Lime-500
        "#14b8a6", // Teal-500
    ];

    const chartData = data.map((section, index) => ({
        name: section.name,
        value: section.completeness,
        score: section.score,
        color: vibrantColors[index % vibrantColors.length],
    }));

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        percent,
    }: {
        cx: number;
        cy: number;
        midAngle: number;
        innerRadius: number;
        outerRadius: number;
        percent: number;
    }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text
                x={x}
                y={y}
                fill="white"
                textAnchor={x > cx ? "start" : "end"}
                dominantBaseline="central"
                className="text-xs font-semibold drop-shadow-lg"
            >
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    return (
        <div className="border-border/50 h-80 w-full border-t">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={90}
                        innerRadius={30}
                        fill="#8884d8"
                        dataKey="value"
                        animationBegin={0}
                        animationDuration={1000}
                        animationEasing="ease-out"
                    >
                        {chartData.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={entry.color}
                                stroke="hsl(var(--background))"
                                strokeWidth={2}
                                className="transition-opacity duration-200 hover:opacity-80"
                            />
                        ))}
                    </Pie>
                    <Tooltip
                        content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                                const data = payload[0].payload;
                                return (
                                    <div className="bg-card/95 border-border rounded-lg border p-4 shadow-xl backdrop-blur-sm">
                                        <p className="text-card-foreground text-lg font-semibold">
                                            {data.name}
                                        </p>
                                        <div className="mt-2 space-y-1">
                                            <p className="text-muted-foreground text-sm">
                                                <span className="text-card-foreground font-medium">
                                                    Completeness:
                                                </span>{" "}
                                                {data.value}%
                                            </p>
                                            <p className="text-muted-foreground text-sm">
                                                <span className="text-card-foreground font-medium">
                                                    Score:
                                                </span>{" "}
                                                {data.score}/100
                                            </p>
                                        </div>
                                    </div>
                                );
                            }
                            return null;
                        }}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}

interface SectionsBarChartProps {
    data: ChartData["sections"];
}

export function SectionsBarChart({ data }: SectionsBarChartProps) {
    // Theme-adaptive vibrant color palette
    const vibrantColors = [
        "#ef4444", // Red-500
        "#06b6d4", // Cyan-500
        "#3b82f6", // Blue-500
        "#f97316", // Orange-500
        "#10b981", // Emerald-500
        "#eab308", // Yellow-500
        "#a855f7", // Purple-500
        "#ec4899", // Pink-500
        "#84cc16", // Lime-500
        "#14b8a6", // Teal-500
    ];

    const chartData = data.map((section, index) => ({
        name: section.name.length > 10 ? section.name.substring(0, 10) + "..." : section.name,
        fullName: section.name,
        score: section.score,
        completeness: section.completeness,
        color: vibrantColors[index % vibrantColors.length],
    }));

    // Custom tick component that properly inherits theme colors
    const CustomXAxisTick = (props: { x: number; y: number; payload: { value: string } }) => {
        const { x, y, payload } = props;
        return (
            <g transform={`translate(${x},${y})`}>
                <text
                    x={0}
                    y={0}
                    dy={16}
                    textAnchor="end"
                    className="fill-foreground text-xs"
                    transform="rotate(-42)"
                >
                    {payload.value}
                </text>
            </g>
        );
    };

    const CustomYAxisTick = (props: { x: number; y: number; payload: { value: number } }) => {
        const { x, y, payload } = props;
        return (
            <g transform={`translate(${x},${y})`}>
                <text x={0} y={0} dy={3} textAnchor="end" className="fill-foreground text-xs">
                    {payload.value}
                </text>
            </g>
        );
    };

    return (
        <div className="border-border/50 h-80 w-full border-t pt-4">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={chartData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                    barCategoryGap="20%"
                >
                    <CartesianGrid
                        strokeDasharray="3 3"
                        className="opacity-30"
                        stroke="hsl(var(--muted-foreground))"
                    />
                    <XAxis
                        dataKey="name"
                        tick={
                            <CustomXAxisTick
                                x={0}
                                y={0}
                                payload={{
                                    value: "",
                                }}
                            />
                        }
                        interval={0}
                        height={80}
                        axisLine={{ stroke: "hsl(var(--border))" }}
                        tickLine={{ stroke: "hsl(var(--border))" }}
                    />
                    <YAxis
                        tick={
                            <CustomYAxisTick
                                x={0}
                                y={0}
                                payload={{
                                    value: 0,
                                }}
                            />
                        }
                        axisLine={{ stroke: "hsl(var(--border))" }}
                        tickLine={{ stroke: "hsl(var(--border))" }}
                    />
                    <Tooltip
                        content={({ active, payload, label }) => {
                            if (active && payload && payload.length) {
                                const data = chartData.find((item) => item.name === label);
                                return (
                                    <div className="bg-card/95 border-border rounded-lg border p-4 shadow-xl backdrop-blur-sm">
                                        <p className="text-card-foreground text-lg font-semibold">
                                            {data?.fullName}
                                        </p>
                                        <div className="mt-3 space-y-2">
                                            <div className="flex items-center gap-2">
                                                <div
                                                    className="h-3 w-3 rounded-full"
                                                    style={{
                                                        backgroundColor:
                                                            payload[0]?.color || vibrantColors[0],
                                                    }}
                                                ></div>
                                                <p className="text-muted-foreground text-sm">
                                                    <span className="text-card-foreground font-medium">
                                                        Score:
                                                    </span>{" "}
                                                    {payload[0]?.value}/100
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div
                                                    className="h-3 w-3 rounded-full"
                                                    style={{
                                                        backgroundColor:
                                                            payload[1]?.color || vibrantColors[1],
                                                    }}
                                                ></div>
                                                <p className="text-muted-foreground text-sm">
                                                    <span className="text-card-foreground font-medium">
                                                        Completeness:
                                                    </span>{" "}
                                                    {payload[1]?.value}%
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            }
                            return null;
                        }}
                    />
                    <Bar
                        dataKey="score"
                        name="Score"
                        radius={[4, 4, 0, 0]}
                        animationBegin={0}
                        animationDuration={1200}
                        animationEasing="ease-out"
                    >
                        {chartData.map((entry, index) => (
                            <Cell
                                key={`score-${index}`}
                                fill={vibrantColors[index % vibrantColors.length]}
                            />
                        ))}
                    </Bar>
                    <Bar
                        dataKey="completeness"
                        name="Completeness"
                        radius={[4, 4, 0, 0]}
                        animationBegin={300}
                        animationDuration={1200}
                        animationEasing="ease-out"
                    >
                        {chartData.map((entry, index) => (
                            <Cell
                                key={`completeness-${index}`}
                                fill={vibrantColors[(index + 2) % vibrantColors.length]}
                            />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

interface KeywordCoverageChartProps {
    data: ChartData["keywords"];
}

export function KeywordCoverageChart({ data }: KeywordCoverageChartProps) {
    const total = data.found.length + data.missing.length;
    const foundPercentage = total > 0 ? (data.found.length / total) * 100 : 0;
    const missingPercentage = total > 0 ? (data.missing.length / total) * 100 : 0;

    const chartData = [
        {
            name: "Found Keywords",
            value: foundPercentage,
            count: data.found.length,
            fill: "#10b981", // Emerald-500 - works well in both themes
        },
        {
            name: "Missing Keywords",
            value: missingPercentage,
            count: data.missing.length,
            fill: "#ef4444", // Red-500 - works well in both themes
        },
    ];

    return (
        <div className="h-80 w-full border-t p-6">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                        animationBegin={0}
                        animationDuration={1000}
                        animationEasing="ease-out"
                    >
                        {chartData.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={entry.fill}
                                stroke="hsl(var(--background))"
                                strokeWidth={2}
                                className="transition-opacity duration-200 hover:opacity-80"
                            />
                        ))}
                    </Pie>
                    <Tooltip
                        content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                                const data = payload[0].payload;
                                return (
                                    <div className="bg-card/95 border-border rounded-lg border p-6 shadow-xl backdrop-blur-sm">
                                        <p className="text-card-foreground mb-3 text-lg font-semibold">
                                            {data.name}
                                        </p>
                                        <div className="space-y-2">
                                            <p className="text-muted-foreground text-sm">
                                                <span className="text-card-foreground font-medium">
                                                    Count:
                                                </span>{" "}
                                                {data.count} keywords
                                            </p>
                                            <p className="text-muted-foreground text-sm">
                                                <span className="text-card-foreground font-medium">
                                                    Percentage:
                                                </span>{" "}
                                                {data.value.toFixed(1)}%
                                            </p>
                                        </div>
                                    </div>
                                );
                            }
                            return null;
                        }}
                    />
                    {/* Center text with theme-aware colors */}
                    <text
                        x="50%"
                        y="42%"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="fill-foreground text-3xl font-bold"
                    >
                        {total}
                    </text>
                    <text
                        x="50%"
                        y="58%"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="fill-muted-foreground text-base font-medium"
                    >
                        Total Keywords
                    </text>
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}
