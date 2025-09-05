"use client";

import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

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
    // Vibrant color palette matching the UI design
    const vibrantColors = [
        "#FF6B6B", // Red
        "#4ECDC4", // Teal
        "#45B7D1", // Blue
        "#FFA07A", // Light Salmon
        "#98D8C8", // Mint
        "#F7DC6F", // Yellow
        "#BB8FCE", // Light Purple
        "#85C1E9", // Light Blue
        "#F8C471", // Orange
        "#82E0AA", // Light Green
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
        <div className="w-full h-80 bg-gradient-to-br from-background to-muted/20 rounded-lg p-4">
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
                                className="hover:opacity-80 transition-opacity duration-200"
                            />
                        ))}
                    </Pie>
                    <Tooltip
                        content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                                const data = payload[0].payload;
                                return (
                                    <div className="bg-background/95 backdrop-blur-sm border rounded-lg p-4 shadow-xl">
                                        <p className="font-semibold text-lg">{data.name}</p>
                                        <div className="space-y-1 mt-2">
                                            <p className="text-sm">
                                                <span className="font-medium">Completeness:</span> {data.value}%
                                            </p>
                                            <p className="text-sm">
                                                <span className="font-medium">Score:</span> {data.score}/100
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
    // Vibrant color palette matching the UI design
    const vibrantColors = [
        "#FF6B6B", // Red
        "#4ECDC4", // Teal
        "#45B7D1", // Blue
        "#FFA07A", // Light Salmon
        "#98D8C8", // Mint
        "#F7DC6F", // Yellow
        "#BB8FCE", // Light Purple
        "#85C1E9", // Light Blue
        "#F8C471", // Orange
        "#82E0AA", // Light Green
    ];

    const chartData = data.map((section, index) => ({
        name: section.name.length > 10 ? section.name.substring(0, 10) + "..." : section.name,
        fullName: section.name,
        score: section.score,
        completeness: section.completeness,
        color: vibrantColors[index % vibrantColors.length],
    }));

    return (
        <div className="w-full h-80 bg-gradient-to-br from-background to-muted/20 rounded-lg p-4">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }} barCategoryGap="20%">
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" stroke="hsl(var(--muted-foreground))" />
                    <XAxis
                        dataKey="name"
                        tick={{ fontSize: 11, fill: "hsl(var(--foreground))" }}
                        interval={0}
                        angle={-45}
                        textAnchor="end"
                        height={80}
                        axisLine={{ stroke: "hsl(var(--border))" }}
                    />
                    <YAxis tick={{ fontSize: 11, fill: "hsl(var(--foreground))" }} axisLine={{ stroke: "hsl(var(--border))" }} />
                    <Tooltip
                        content={({ active, payload, label }) => {
                            if (active && payload && payload.length) {
                                const data = chartData.find((item) => item.name === label);
                                return (
                                    <div className="bg-background/95 backdrop-blur-sm border rounded-lg p-4 shadow-xl">
                                        <p className="font-semibold text-lg">{data?.fullName}</p>
                                        <div className="space-y-2 mt-3">
                                            <div className="flex items-center gap-2">
                                                <div className="w-3 h-3 rounded-full bg-primary"></div>
                                                <p className="text-sm">
                                                    <span className="font-medium">Score:</span> {payload[0]?.value}/100
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="w-3 h-3 rounded-full bg-accent"></div>
                                                <p className="text-sm">
                                                    <span className="font-medium">Completeness:</span> {payload[1]?.value}%
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
                            <Cell key={`score-${index}`} fill={vibrantColors[index % vibrantColors.length]} />
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
                            <Cell key={`completeness-${index}`} fill={vibrantColors[(index + 2) % vibrantColors.length]} />
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
            fill: "#4ECDC4", // Teal
        },
        {
            name: "Missing Keywords",
            value: missingPercentage,
            count: data.missing.length,
            fill: "#FF6B6B", // Red
        },
    ];

    return (
        <div className="w-full h-80 bg-gradient-to-br from-background to-muted/20 rounded-lg p-6">
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
                                className="hover:opacity-80 transition-opacity duration-200"
                            />
                        ))}
                    </Pie>
                    <Tooltip
                        content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                                const data = payload[0].payload;
                                return (
                                    <div className="bg-background/95 backdrop-blur-sm border rounded-lg p-6 shadow-xl">
                                        <p className="font-semibold text-lg mb-3">{data.name}</p>
                                        <div className="space-y-2">
                                            <p className="text-sm">
                                                <span className="font-medium">Count:</span> {data.count} keywords
                                            </p>
                                            <p className="text-sm">
                                                <span className="font-medium">Percentage:</span> {data.value.toFixed(1)}%
                                            </p>
                                        </div>
                                    </div>
                                );
                            }
                            return null;
                        }}
                    />
                    {/* Center text */}
                    <text x="50%" y="42%" textAnchor="middle" dominantBaseline="middle" className="text-3xl font-bold fill-foreground">
                        {total}
                    </text>
                    <text
                        x="50%"
                        y="58%"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="text-base fill-muted-foreground font-medium"
                    >
                        Total Keywords
                    </text>
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}
