import React, { JSX, Key, ReactNode } from "react";
import Chart from "react-apexcharts";

export interface SourceItem {
    id: Key;           // must be string or number (React key)
    name: string | ReactNode; // can be string, number, or JSX element
    email:string | ReactNode
}

export default function dashboardController() {
    return (
        <div>
            <h1>Budget Modsadfdafdsafdaule</h1>



            
        </div>
    );
}


export function source(): { data: SourceItem[]; view: JSX.Element } {
    const data: SourceItem[] = [
        { id: 1, name: "John Doe", email: "john@example.com" },
        { id: 2, name: "Jane Smith", email: "jane@example.com" },
        { id: 3, name: "Bob Johnson", email: "bob@example.com" },
        { id: 3, name: "Bob Johnson", email: "bob@example.com" },
        { id: 3, name: "Bob Johnson", email: "bob@example.com" },
        { id: 3, name: "Bob Johnson", email: "bob@example.com" },
        { id: 3, name: "Bob Johnson", email: "bob@example.com" },
        { id: 3, name: "Bob Johnson", email: "bob@example.com" },

    ];



    const lineChart = {
        series: [
        {
            name: "Sales",
            data: [30, 40, 35, 50, 49, 60, 70],
        },
        ],
        options: {
        chart: { type: "line", height: 300 },
        stroke: { curve: "smooth" },
        xaxis: {
            categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        },
    };

    const barChart = {
        series: [
        {
            name: "Users",
            data: [10, 20, 15, 30, 25],
        },
        ],
        options: {
        chart: { type: "bar", height: 300 },
        xaxis: {
            categories: ["Jan", "Feb", "Mar", "Apr", "May"],
        },
        },
    };

    const pieChart = {
        series: [44, 55, 13, 43],
        options: {
        chart: { type: "donut" },
        labels: ["Admin", "User", "Guest", "Other"],
        },
    };


    let view;

    view = <div style={{ padding: 20 }}>
        <h2>Dashboard</h2>

        {/* KPI Cards */}
        <div style={{ display: "flex", gap: 20 }}>
            <div className="card">Users: 120</div>
            <div className="card">Sales: ₱45,000</div>
            <div className="card">Projects: 8</div>
        </div>

        {/* Charts */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            <Chart
            options={lineChart.options}
            series={lineChart.series}
            type="line"
            height={300}
            />

            <Chart
            options={barChart.options}
            series={barChart.series}
            type="bar"
            height={300}
            />

            <Chart
            options={pieChart.options}
            series={pieChart.series}
            type="donut"
            height={300}
            />
        </div>
    </div>;

    return { data, view };
}

export function bindEvents() {
    return (
        <div>
            <h1>bindEvents</h1>
        </div>
    );
}