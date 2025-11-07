import React from "react";

const DonorList = ({ donors, selectDonor, deleteDonor }) => {
  return (
    <div>
      <h2>Donor List</h2>
      {donors.length === 0 ? (
        <p>No donors found.</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid #ddd" }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Address</th>
              <th>Blood Group</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {donors.map((donor) => (
              <tr key={donor.id}>
                <td>{donor.name}</td>
                <td>{donor.age}</td>
                <td>{donor.email}</td>
                <td>{donor.contactNo}</td>
                <td>{donor.address}</td>
                <td>{donor.bloodGroup}</td>
                <td>
                  <button onClick={() => selectDonor(donor)} style={{ marginRight: "5px" }}>
                    Edit
                  </button>
                  <button onClick={() => deleteDonor(donor.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DonorList;
