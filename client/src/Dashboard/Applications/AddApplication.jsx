import { useEffect, useState } from "react";
import api from "../../api/axiosInstance";

const AddApplication = () => {
  const [applicationDetails, setApplicationDetails] = useState({
    company: "",
    role: "",
    status: "applied",
    dateApplied: new Date().toISOString().split("T")[0],
    jobLink: "",
    followUpDate: "",
    notes: "",
  });
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    if (!successMsg) return;
    const timer = setTimeout(() => {
      setSuccessMsg("");
    }, 3000);
    return () => clearTimeout(timer);
  }, [successMsg]);

  const submitApplication = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      setErrMsg("");
      const response = await api.post("/applications/add", applicationDetails);
      setApplicationDetails({
        company: "",
        role: "",
        status: "applied",
        dateApplied: new Date().toISOString().split("T")[0],
        jobLink: "",
        followUpDate: "",
        notes: "",
      });
      setSuccessMsg(response?.data?.message);
    } catch (err) {
      console.error(err);
      setErrMsg(err.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={submitApplication}>
        <label htmlFor="company">Company</label>
        <input
          type="text"
          id="company"
          value={applicationDetails.company}
          onChange={(e) =>
            setApplicationDetails({
              ...applicationDetails,
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
          value={applicationDetails.role}
          onChange={(e) =>
            setApplicationDetails({
              ...applicationDetails,
              role: e.target.value,
            })
          }
          placeholder="Job title/position"
          required
        />
        <label htmlFor="status">Status</label>
        <select
          id="status"
          value={applicationDetails.status}
          onChange={(e) =>
            setApplicationDetails({
              ...applicationDetails,
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
          value={applicationDetails.dateApplied}
          onChange={(e) =>
            setApplicationDetails({
              ...applicationDetails,
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
          value={applicationDetails.jobLink}
          onChange={(e) =>
            setApplicationDetails({
              ...applicationDetails,
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
          value={applicationDetails.followUpDate}
          onChange={(e) =>
            setApplicationDetails({
              ...applicationDetails,
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
          value={applicationDetails.notes}
          onChange={(e) =>
            setApplicationDetails({
              ...applicationDetails,
              notes: e.target.value,
            })
          }
          placeholder="Add your notes here..."
        />
        <button type="submit" disabled={loading}>
          {loading ? "Adding application" : "Add application"}
        </button>
        {successMsg && <p className="form-success">{successMsg}</p>}
        {errMsg && <p className="form-error">{errMsg}</p>}
      </form>
    </div>
  );
};

export default AddApplication;
