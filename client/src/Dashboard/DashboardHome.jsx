import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Oval } from "react-loader-spinner";
import api from "../api/axiosInstance";
import "./DashboardHome.css";

const views = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  loading: "LOADING",
};

const DashboardHome = () => {
  const [errMsg, setErrMsg] = useState("");
  const [currView, setCurrView] = useState(views.initial);
  const [applications, setApplications] = useState([]);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setCurrView(views.loading);
        const [res1, res2] = await Promise.all([
          api.get("/auth/me"),
          api.get("/application/get"),
        ]);
        setUserName(res1?.data?.name);
        setApplications(res2?.data);
        setCurrView(views.success);
      } catch (err) {
        setCurrView(views.failure);
        setErrMsg(
          err?.response?.data?.message ||
            "Unable to load your dashboard. Please try again.",
        );
        console.error(err);
      }
    };

    fetchDetails();
  }, []);

  const loadingView = () => (
    <div
      className="loading-view"
      role="status"
      aria-live="polite"
      aria-label="Loading dashboard"
    >
      <div className="loading-content">
        <Oval
          color="#2563eb"
          secondaryColor="#dbeafe"
          height={52}
          width={52}
          strokeWidth={4}
        />
        <p>Loading your dashboard...</p>
      </div>
    </div>
  );

  const dashboard = () => {
    const total = applications.length;
    const applied = applications.filter(
      (application) => application.status === "applied",
    ).length;
    const interviewing = applications.filter(
      (d) => d.status === "interviewing",
    ).length;
    const offer = applications.filter((d) => d.status === "offer").length;
    const rejected = applications.filter((d) => d.status === "rejected").length;

    const recent = applications.slice(0, 5);
    return (
      <div className="dashboard-container">
        <h1 id="welcome-back-head">Welcome back, {userName}.</h1>
        <div className="stat-card">
          <div className="dashboard-card">
            <p>{total}</p>
            <p>Total</p>
          </div>
          <div className="dashboard-card">
            <p>{applied}</p>
            <p>Applied</p>
          </div>
          <div className="dashboard-card">
            <p>{interviewing}</p>
            <p>Interviewing</p>
          </div>
          <div className="dashboard-card">
            <p>{offer}</p>
            <p>Offers</p>
          </div>
          <div className="dashboard-card">
            <p>{rejected}</p>
            <p>Rejected</p>
          </div>
        </div>

        {applications.length !== 0 ? (
          <>
            <div className="recent-applications">
              <h2>Recent application</h2>
              <Link to="/my-applications">View All</Link>
            </div>
            <div className="application-container">
              <table className="application-table">
                <thead>
                  <tr>
                    <th>Company</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Applied</th>
                  </tr>
                </thead>
                <tbody>
                  {recent.map((application) => {
                    const { _id, dateApplied, company, role, status } =
                      application;
                    const appliedTime = new Date(dateApplied).toLocaleString(
                      "en-US",
                      {
                        day: "numeric",
                        month: "short",
                        timeZone: "UTC",
                      },
                    );

                    return (
                      <tr key={_id}>
                        <td>{company}</td>
                        <td>{role}</td>
                        <td>
                          <span className={`status-badge ${status}`}>
                            {status}
                          </span>
                        </td>
                        <td>{appliedTime}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <div className="no-applications">
            <p>You haven't added any applications yet.</p>
            <Link to="/add-application">Add application</Link>
          </div>
        )}
      </div>
    );
  };

  const failureView = () => <div className="failure-view">{errMsg}</div>;

  const render = () => {
    switch (currView) {
      case views.loading:
        return loadingView();
      case views.success:
        return dashboard();
      case views.failure:
        return failureView();
      default:
        return <></>;
    }
  };
  return <>{render()}</>;
};
export default DashboardHome;
