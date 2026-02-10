import React from "react";
import Chart from "react-apexcharts";

export const Content = () => {
  const ApexChart = (Chart as any).default || Chart;

  // 1. IP Activity Timeline (Para makita yung "Spikes" ng dami ng requests)
  const activityOptions = {
    chart: { 
      id: "ip-activity", 
      toolbar: { show: false },
      animations: { enabled: true, easing: 'linear', dynamicAnimation: { speed: 1000 } }
    },
    colors: ['#ef4444'], // Pula para sa "Alert/Activity" feel
    stroke: { curve: 'smooth', width: 2 },
    fill: {
      type: 'gradient',
      gradient: { shadeIntensity: 1, opacityFrom: 0.5, opacityTo: 0.1 }
    },
    xaxis: {
      categories: ["10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm"],
      title: { text: 'Time of Day' }
    },
    yaxis: { title: { text: 'No. of Requests' } },
    markers: { size: 4 }
  };

  const activitySeries = [{
    name: "Requests/sec",
    data: [120, 450, 1000, 300, 2000, 800, 400] // Dito mo makikita yung spike (2000 requests!)
  }];

  // 2. Top 5 Most Active IPs (Bar Chart)
  const topIPOptions = {
    chart: { id: "top-ips", toolbar: { show: false } },
    plotOptions: { bar: { horizontal: true, borderRadius: 4 } },
    colors: ['#3b82f6'],
    xaxis: { categories: ["192.168.1.1", "172.16.0.45", "10.0.0.12", "192.168.1.105", "122.54.1.2"] }
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#f3f4f6', minHeight: '100vh' }}>
      
      {/* KPI SECTION */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        <KPIBox title="Total Data Transferred" value="4.2 GB" color="#3b82f6" />
        <KPIBox title="Suspicious Activities" value="12 Detects" color="#ef4444" />
        <KPIBox title="Active IP Connections" value="156" color="#22c55e" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.2fr', gap: '20px', marginBottom: '30px' }}>
        {/* BIG CHART: TRAFFIC SPIKES */}
        <div style={cardStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h4>Real-time IP Traffic (Global)</h4>
            <span style={{ color: '#ef4444', fontSize: '12px', fontWeight: 'bold' }}>● LIVE MONITORING</span>
          </div>
          <ApexChart options={activityOptions} series={activitySeries} type="area" height={300} />
        </div>

        {/* SMALL CHART: TOP IPs */}
        <div style={cardStyle}>
          <h4>Top Active IPs</h4>
          <ApexChart options={topIPOptions} series={[{ name: 'Requests', data: [850, 720, 610, 400, 200] }]} type="bar" height={300} />
        </div>
      </div>

      {/* IP LOGS TABLE */}
      <div style={cardStyle}>
        <h4>Recent Network Logs</h4>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
          <thead>
            <tr style={{ textAlign: 'left', borderBottom: '1px solid #eee' }}>
              <th style={thStyle}>Source IP</th>
              <th style={thStyle}>Action</th>
              <th style={thStyle}>Data Size</th>
              <th style={thStyle}>Risk Level</th>
            </tr>
          </thead>
          <tbody>
            <IPLogItem ip="192.168.1.1" action="File Upload" size="1.2GB" risk="High" riskColor="#ef4444" />
            <IPLogItem ip="172.16.0.45" action="API Request" size="12KB" risk="Low" riskColor="#22c55e" />
            <IPLogItem ip="10.0.0.12" action="Login Attempt" size="2KB" risk="Medium" riskColor="#eab308" />
          </tbody>
        </table>
      </div>
    </div>
  );
};

// --- HELPERS ---
const KPIBox = ({ title, value, color }: any) => (
  <div style={{ ...cardStyle, borderTop: `4px solid ${color}` }}>
    <p style={{ fontSize: '12px', color: '#666', marginBottom: '5px', textTransform: 'uppercase' }}>{title}</p>
    <h2 style={{ fontSize: '28px', margin: 0 }}>{value}</h2>
  </div>
);

const IPLogItem = ({ ip, action, size, risk, riskColor }: any) => (
  <tr style={{ borderBottom: '1px solid #f9f9f9' }}>
    <td style={tdStyle}><code>{ip}</code></td>
    <td style={tdStyle}>{action}</td>
    <td style={tdStyle}>{size}</td>
    <td style={tdStyle}><span style={{ color: riskColor, fontWeight: 'bold' }}>{risk}</span></td>
  </tr>
);

const cardStyle = { backgroundColor: '#fff', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' };
const thStyle = { padding: '12px', color: '#999', fontSize: '12px' };
const tdStyle = { padding: '12px', fontSize: '14px' };