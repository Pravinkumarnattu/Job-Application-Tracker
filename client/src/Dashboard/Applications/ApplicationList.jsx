import { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import api from "../../api/axiosInstance";

const views = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  loading: "LOADING",
};

const ApplicationList = () => {
  const [applications, setApplications] = useState([]);
  const [errMsg, setErrMsg] = useState("");
  const [currView, setCurrView] = useState(views.initial);
  const [stage, setStage] = useState("total");
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setCurrView(views.loading);
        const res = await api.get("/application/get");
        setApplications(res?.data);
        setCurrView(views.success);
      } catch (err) {
        setCurrView(views.failure);
        setErrMsg(
          err?.res?.data?.message ||
            "Unable to load your applications. Please try again.",
        );
        console.error(err);
      }
    };
    fetchApplications();
  }, []);

  const loadingView = () => (
    <div
      className="loading-view"
      role="status"
      aria-live="polite"
      aria-label="Loading applications"
    >
      <div className="loading-content">
        <Oval
          color="#2563eb"
          secondaryColor="#dbeafe"
          height={42}
          width={42}
          strokeWidth={4}
        />
        <p>Loading your Applications...</p>
      </div>
    </div>
  );

  const changeStatus = async (id, currValue) => {
    try {
      setUpdatingId(id);
      await api.patch(`/application/update/${id}`, {
        newStatus: currValue,
      });
      const updatedArray = applications.map((app) => {
        if (app._id === id) {
          app.status = currValue;
          return app;
        }
        return app;
      });
      setApplications(updatedArray);
    } catch (err) {
      console.error(err);
      setErrMsg(
        err?.updateStatus?.message || "Something went wrong. Try again!",
      );
    } finally {
      setUpdatingId(null);
    }
  };

  const myApplications = () => {
    const total = applications.length;
    const applied = applications.filter(
      (application) => application.status === "applied",
    ).length;
    const interviewing = applications.filter(
      (d) => d.status === "interviewing",
    ).length;
    const offer = applications.filter((d) => d.status === "offer").length;
    const rejected = applications.filter((d) => d.status === "rejected").length;

    const formatDate = (time) => {
      return new Date(time).toLocaleString("en-US", {
        day: "numeric",
        month: "short",
        timeZone: "UTC",
      });
    };

    return (
      <main className="applications-container">
        <section className="my-application">
          <h1>Applications</h1>
          <Link to="/add-application">Add application</Link>
        </section>
        <ul
          className="stages"
          onClick={(e) => {
            const list = e.target.closest("li");
            const value = list.textContent.split(" ")[0];
            setStage(value);
          }}
        >
          <li className={`${stage === "total" ? "active-sate" : ""}`}>
            All <span>{total}</span>
          </li>
          <li className={`${stage === "applied" ? "active-sate" : ""}`}>
            Applied <span>{applied}</span>
          </li>
          <li className={`${stage === "interviewing" ? "active-sate" : ""}`}>
            Interviewing <span>{interviewing}</span>
          </li>
          <li className={`${stage === "offer" ? "active-sate" : ""}`}>
            Offer <span>{offer}</span>
          </li>
          <li className={`${stage === "rejected" ? "active-sate" : ""}`}>
            Rejected <span>{rejected}</span>
          </li>
        </ul>

        {applications.length !== 0 ? (
          <div className="applications">
            <table className="applications-table">
              <thead>
                <tr>
                  <th>Company</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Applied</th>
                  <th>Follow-up</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((application) => {
                  const {
                    _id,
                    dateApplied,
                    company,
                    role,
                    status,
                    followUpDate,
                  } = application;
                  const appliedDate = formatDate(dateApplied);
                  const followUp = followUpDate && formatDate(followUpDate);

                  return (
                    <tr key={_id}>
                      <td>{company}</td>
                      <td>{role}</td>
                      <td>
                        <select
                          className="curr-status"
                          value={status}
                          onChange={(e) => changeStatus(_id, e.target.value)}
                          disabled={updatingId === _id}
                        >
                          <option value="applied">Applied</option>
                          <option value="interviewing">Interviewing</option>
                          <option value="offer">Offer</option>
                          <option value="rejected">Rejected</option>
                        </select>
                      </td>
                      <td>{appliedDate}</td>
                      <td>{followUp ? followUp : "-"}</td>
                      <td className="actions-icons">
                        <FaEdit size={20} />
                        <FaTrash size={18} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="no-applications">
            <p>You haven't added any applications yet.</p>
            <Link to="/add-application">Add application</Link>
          </div>
        )}
      </main>
    );
  };

  const failureView = () => <div className="failure-view">{errMsg}</div>;

  const render = () => {
    switch (currView) {
      case views.loading:
        return loadingView();
      case views.success:
        return myApplications();
      case views.failure:
        return failureView();
      default:
        return <></>;
    }
  };
  return <>{render()}</>;
};

export default ApplicationList;
