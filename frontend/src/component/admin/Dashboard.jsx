import React, { useEffect, useRef } from "react";
import SideBar from "./SideBar.jsx";
import "./dashboard.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";
import {Chart} from "chart.js"; // Import Chart.js
import { useSelector, useDispatch } from "react-redux";
import { getAdminProduct } from "../../redux/actions/productActions.js";
import { getAllOrders } from "../../redux/actions/orderAction.js";
import { getAllUsers } from "../../redux/actions/userActions.js";
import MetaData from "../layout/MetaData";

const Dashboard = () => {
  const dispatch = useDispatch();
  const lineChartRef = useRef(null);
  const doughnutChartRef = useRef(null);

  const { products } = useSelector((state) => state.products);

  const { orders } = useSelector((state) => state.allOrders);

  const { users } = useSelector((state) => state.allUsers);

  let outOfStock = 0;
  
  products &&
    products.forEach((item) => {
      if (item.stock === 0) {
        outOfStock += 1;
      }
    });

  useEffect(() => {
    dispatch(getAdminProduct());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]);

  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, totalAmount],
      },
    ],
  };

  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock, products.length - outOfStock],
      },
    ],
  };

  useEffect(() => {
    if (lineChartRef.current) {
      lineChartRef.current.destroy();
    }

    lineChartRef.current = new Chart(document.getElementById("lineChart"), {
      type: "line",
      data: lineState,
    });
  }, [lineState]);

  useEffect(() => {
    if (doughnutChartRef.current) {
      doughnutChartRef.current.destroy();
    }

    doughnutChartRef.current = new Chart(document.getElementById("doughnutChart"), {
      type: "doughnut",
      data: doughnutState,
    });
  }, [doughnutState]);

  return (
    <div className="dashboard">
      <MetaData title="Dashboard - Admin Panel" />
      <SideBar />

      <div className="dashboardContainer">
        <Typography component="h1">Dashboard</Typography>

        <div className="dashboardSummary">
          <div>
            <p>
              Total Amount <br /> ₹{totalAmount}
            </p>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to="/admin/products">
              <p>Product</p>
              <p>{products && products.length}</p>
            </Link>
            <Link to="/admin/orders">
              <p>Orders</p>
              <p>{orders && orders.length}</p>
            </Link>
            <Link to="/admin/users">
              <p>Users</p>
              <p>{users && users.length}</p>
            </Link>
          </div>
        </div>

        <div className="lineChart">
          <canvas id="lineChart" />
        </div>

        <div className="doughnutChart">
          <canvas id="doughnutChart" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;