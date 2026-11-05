import { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import api from "../../api/axiosInstance";
import "./ApplicationList.css";

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
  const [deletingId, setDeletingId] = useState(null);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    company: "",
    role: "",
    status: "applied",
    dateApplied: new Date().toISOString().split("T")[0],
    jobLink: "",
    followUpDate: "",
    notes: "",
  });

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
          err?.response?.data?.message ||
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
      setErrMsg("");
    } catch (err) {
      console.error(err);
      setErrMsg(
        err?.response?.data?.message || "Something went wrong. Try again!",
      );
    } finally {
      setUpdatingId(null);
    }
  };

  const deleteJob = async (id) => {
    try {
      setDeletingId(id);
      await api.delete(`/application/delete/${id}`);
      const updatedArray = applications.filter((app) => app._id !== id);
      setApplications(updatedArray);
      setErrMsg("");
    } catch (err) {
      console.error(err);
      setErrMsg(
        err?.response?.data?.message || "Something went wrong. Try again!",
      );
    } finally {
      setDeletingId(null);
    }
  };

  const closeModel = () => {
    setSelectedApplication(null);
  };

  const submitEditedApplication = async (e) => {
    e.preventDefault();
    try {
      console.log("asdkjlgashg");
    } catch (err) {}
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
          <Link to="/add-application">+ Add application</Link>
        </section>
        <p className="err-msg">{errMsg}</p>
        <ul
          className="stages"
          onClick={(e) => {
            const list = e.target.closest("li");
            const value = list.textContent.split(" ")[0];
            setStage(value);
          }}
        >
          <li className={`${stage === "total" ? "active-state" : ""}`}>
            All <span>{total}</span>
          </li>
          <li className={`${stage === "applied" ? "active-state" : ""}`}>
            Applied <span>{applied}</span>
          </li>
          <li className={`${stage === "interviewing" ? "active-state" : ""}`}>
            Interviewing <span>{interviewing}</span>
          </li>
          <li className={`${stage === "offer" ? "active-state" : ""}`}>
            Offer <span>{offer}</span>
          </li>
          <li className={`${stage === "rejected" ? "active-state" : ""}`}>
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
                    jobLink,
                    followUpDate,
                    notes,
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
                        <FaEdit
                          size={20}
                          onClick={() => {
                            setSelectedApplication(application);
                            setFormData({
                              company: company || "",
                              role: role || "",
                              status: status || "applied",
                              dateApplied:
                                new Date(dateApplied)
                                  .toISOString()
                                  .split("T")[0] ||
                                new Date().toISOString().split("T")[0],
                              jobLink: jobLink || "",
                              followUpDate: followUpDate || "",
                              notes: notes || "",
                            });
                          }}
                        />
                        <FaTrash
                          size={18}
                          onClick={() => deleteJob(_id)}
                          disabled={deletingId === _id}
                        />
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

        {selectedApplication && (
          <div className="modal-overlay" onClick={closeModel}>
            <div className="modal-card" onClick={(e) => e.stopPropagation()}>
              <form
                onSubmit={submitEditedApplication}
                className="edit-application"
              >
                <label htmlFor="company">Company</label>
                <input
                  type="text"
                  id="company"
                  value={formData.company}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      company: e.target.value,
                    })
                  }
                  placeholder="Company name"
                  required
                />
                <label htmlFor="role">Role</label>
                <input
                  type="text"
                  id="role"
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      role: e.target.value,
                    })
                  }
                  placeholder="Job title/position"
                  required
                />
                <label htmlFor="status">Status</label>
                <select
                  id="status"
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      status: e.target.value,
                    })
                  }
                >
                  <option value="applied">Applied</option>
                  <option value="interviewing">Interviewing</option>
                  <option value="offer">Offer</option>
                  <option value="rejected">Rejected</option>
                </select>
                <label htmlFor="dateApplied">Date Applied</label>
                <input
                  type="date"
                  id="dateApplied"
                  value={formData.dateApplied}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      dateApplied: e.target.value,
                    })
                  }
                  placeholder="Applied Date"
                  required
                />
                <label htmlFor="jobLink">
                  Job Link <span>(optional)</span>
                </label>
                <input
                  type="url"
                  id="jobLink"
                  value={formData.jobLink}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      jobLink: e.target.value,
                    })
                  }
                  placeholder="https://..."
                />
                <label htmlFor="followUpDate">
                  Follow-up Date <span>(optional)</span>
                </label>
                <input
                  type="date"
                  id="followUpDate"
                  value={formData.followUpDate}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      followUpDate: e.target.value,
                    })
                  }
                  placeholder="Follow Up Date"
                />
                <label htmlFor="notes">
                  Notes <span>(optional)</span>
                </label>
                <textarea
                  rows={5}
                  cols={30}
                  id="notes"
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      notes: e.target.value,
                    })
                  }
                  placeholder="Add your notes here..."
                />
                <button
                  type="submit"
                  disabled={saving}
                  className="save-changes-btn"
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </form>
            </div>
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
