import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

// Custom Tooltip
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: '#f5f3ff',
        border: '1px solid #d6bcfa',
        borderRadius: '8px',
        padding: '10px',
        color: '#4c1d95',
      }}>
        <p style={{ margin: 0 }}>{label}</p>
        <p style={{ margin: 0 }}>
          Positivity: <strong>{payload[0].value}</strong>
        </p>
      </div>
    );
  }
  return null;
};

const PositivityLineChart = ({ data }) => {
  // Filter data to include only the last 30 days
  const today = new Date();
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(today.getDate() - 30);

  const filteredData = data.filter((entry) => {
    const entryDate = new Date(entry.date);
    return entryDate >= thirtyDaysAgo && entryDate <= today;
  });

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={filteredData}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <XAxis
          dataKey="date"
          tick={{ fontSize: 12 }}
          tickFormatter={(date, index) => (index % 2 === 0 ? date : '')}
        />
        <YAxis
          type="number"
          domain={[0, 10]}
          ticks={[2, 5, 8]}
          tickFormatter={(value) => {
            if (value === 2) return 'Negative';
            if (value === 5) return 'Neutral';
            if (value === 8) return 'Positive';
            return '';
          }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Line
          type="monotone"
          dataKey="sentiment"
          stroke="#6b46c1"
          strokeWidth={2}
          dot
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default PositivityLineChart;
