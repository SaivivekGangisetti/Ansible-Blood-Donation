import React, { useState, useEffect } from "react";
import axios from "axios";
import DonorForm from "./components/DonorForm";
import DonorList from "./components/DonorList";
import config from "./config";

const App = () => {
  const [donors, setDonors] = useState([]);
  const [selectedDonor, setSelectedDonor] = useState(null);
  const [filterType, setFilterType] = useState("id");
  const [filterValue, setFilterValue] = useState("");
  const [options, setOptions] = useState({ id: [], name: [], age: [], blood_group: [] });

  const fetchDonors = async () => {
    try {
      const response = await axios.get(`${config.BASE_URL}/all`);
      setDonors(response.data);
      setOptions({
        id: response.data.map((d) => d.id),
        name: [...new Set(response.data.map((d) => d.name))],
        age: [...new Set(response.data.map((d) => d.age))],
        blood_group: [...new Set(response.data.map((d) => d.bloodGroup))],
      });
    } catch (error) {
      console.error("Error fetching donors:", error);
    }
  };

  const handleFilter = async () => {
    try {
      if (!filterValue) return fetchDonors();
      const response = await axios.get(`${config.BASE_URL}/search?${filterType}=${filterValue}`);
      setDonors(response.data);
    } catch (error) {
      console.error("Error filtering donors:", error);
    }
  };

  const deleteDonor = async (id) => {
    if (window.confirm("Are you sure you want to delete this donor?")) {
      await axios.delete(`${config.BASE_URL}/delete/${id}`);
      fetchDonors();
    }
  };

  useEffect(() => {
    fetchDonors();
  }, []);

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "2rem" }}>
      <h1 style={{ color: "lime" }}>Blood Donation Management</h1>

      <div style={{ display: "flex", gap: "10px", marginBottom: "1rem" }}>
        <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
          <option value="id">ID</option>
          <option value="name">Name</option>
          <option value="age">Age</option>
          <option value="blood_group">Blood Group</option>
        </select>

        <select value={filterValue} onChange={(e) => setFilterValue(e.target.value)}>
          <option value="">Select {filterType}</option>
          {options[filterType].map((opt, idx) => (
            <option key={idx} value={opt}>{opt}</option>
          ))}
        </select>

        <button onClick={handleFilter}>Fetch</button>
        <button onClick={fetchDonors}>Reset</button>
      </div>

      <DonorForm
        selectedDonor={selectedDonor}
        refreshData={fetchDonors}
        clearSelection={() => setSelectedDonor(null)}
      />
      <DonorList donors={donors} selectDonor={setSelectedDonor} deleteDonor={deleteDonor} />
    </div>
  );
};

export default App;
