import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler, // <-- Import Filler plugin
} from 'chart.js';

// --- Register all the components Chart.js needs ---
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler // <-- Register Filler plugin
);

/**
 * 📈 A line chart component to display leads over time.
 *
 * @param {object} props
 * @param {Array} props.chartData - The data from the API (e.g., [{ date: '...', count: 0 }])
 */
const LeadChart = ({ chartData }) => {
  // 1. Format the data for the chart
  const data = {
    labels: chartData.map((d) => d.date), // X-axis labels (e.g., "2025-11-08")
    datasets: [
      {
        label: 'Leads',
        data: chartData.map((d) => d.count), // Y-axis data points
        fill: true, // <-- Enable the fill
        borderColor: 'rgb(59, 130, 246)', // Blue line
        backgroundColor: 'rgba(59, 130, 246, 0.1)', // Light blue fill
        tension: 0.3, // Makes the line slightly curved
        pointRadius: 4,
        pointBackgroundColor: 'rgb(59, 130, 246)',
      },
    ],
  };

  // 2. Configure the chart options
  const options = {
    responsive: true, // Make it responsive
    maintainAspectRatio: false, // Allow it to fill the container height
    plugins: {
      legend: {
        display: false, // Hide the legend (we only have one dataset)
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        callbacks: {
          label: (context) => `${context.dataset.label}: ${context.parsed.y}`,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // Hide vertical grid lines
        },
      },
      y: {
        beginAtZero: true, // Start Y-axis at 0
        grid: {
          color: '#e5e7eb', // Light gray horizontal grid lines
        },
        ticks: {
          // Ensure we only show whole numbers (no 1.5 leads)
          precision: 0,
        },
      },
    },
    interaction: {
      mode: 'index',
      intersect: false,
    },
  };

  return (
    <div className="rounded-lg bg-white p-4 shadow-md sm:p-6">
      <h3 className="mb-4 text-lg font-semibold text-gray-800">
        Leads Over Time (Last 28 Days)
      </h3>
      {/* We set a fixed height for the chart container */}
      <div className="relative h-80 w-full">
        <Line options={options} data={data} />
      </div>
    </div>
  );
};

export default LeadChart;