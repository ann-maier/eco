import React from 'react';
import {
    PieChart, Pie, Cell,
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export const Chart = ({ data }) => (
    <PieChart width={400} height={400}>
        <Pie
            data={data}
            cx={200}
            cy={200}
            label
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
        >
            {
                data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
            }
        </Pie>
    </PieChart>
);