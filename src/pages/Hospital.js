import React from "react";
import "./Hospital.css";

import cityClinic from "./images/city.jpg";
import communityCenter from "./images/community.jpg";
import regionalHospital from "./images/regional.jpg";

function Hospital() {
  return (
    <div className="hospital-layout">
      {/* ✅ Sidebar */}
      <aside className="sidebar">
        <h2>TIKA GHOR</h2>
        <ul>
          <li><a href="#find-centers">Find Centers</a></li>
          <li><a href="#manage-slots">Update Slots</a></li>
          <li><a href="#appointments">Manage Appointments</a></li>
        </ul>
      </aside>

      {/* ✅ Main Content */}
      <main className="hospital-container">
        <header className="hospital-header">
          <h1>Hospital Dashboard</h1>
          <div className="profile-pic">👩‍⚕️</div>
        </header>

        {/* -------- Vaccine Centers Section -------- */}
        <section id="find-centers" className="find-centers">
          <h2>
            Please select your district and area to find nearby vaccine centers.
          </h2>
          <div className="filters">
            <select>
              <option>Select District</option>
              <option>Dhaka</option>
              <option>Chittagong</option>
              <option>Rajshahi</option>
            </select>
            <select>
              <option>Select Area</option>
              <option>Area 1</option>
              <option>Area 2</option>
              <option>Area 3</option>
            </select>
          </div>

          {/* Vaccine Centers List */}
          <div className="centers-list">
            <div className="center-card">
              <div className="center-info">
                <p className="slots">Available Slots: 15</p>
                <h3>City Health Clinic</h3>
                <p>123 Main Street, Anytown</p>
                <button>View Hospital Dashboard</button>
              </div>
              <img src={cityClinic} alt="City Health Clinic" />
            </div>

            <div className="center-card">
              <div className="center-info">
                <p className="slots">Available Slots: 8</p>
                <h3>Community Wellness Center</h3>
                <p>456 Oak Avenue, Anytown</p>
                <button>View Hospital Dashboard</button>
              </div>
              <img src={communityCenter} alt="Community Wellness Center" />
            </div>

            <div className="center-card">
              <div className="center-info">
                <p className="slots">Available Slots: 22</p>
                <h3>Regional Medical Center</h3>
                <p>789 Pine Lane, Anytown</p>
                <button>View Hospital Dashboard</button>
              </div>
              <img src={regionalHospital} alt="Regional Medical Center" />
            </div>
          </div>
        </section>

        {/* -------- Hospital Dashboard Section -------- */}
        <div className="overview">
          <div className="card">
            <h3>Today's Appointments</h3>
            <p>
              25 <span className="positive">+10%</span>
            </p>
          </div>
          <div className="card">
            <h3>Available Slots</h3>
            <p>
              15 <span className="negative">-5%</span>
            </p>
          </div>
          <div className="card">
            <h3>Total Vaccines in Stock</h3>
            <p>
              150 <span className="positive">+20%</span>
            </p>
          </div>
        </div>

        {/* Manage Slots */}
        <div id="manage-slots" className="manage-slots">
          <h3>Manage Slots</h3>
          <input type="number" placeholder="Enter total slots" defaultValue={30} />
          <button>Update Slots</button>
          <p>Booked Slots: 15</p>
          <p>Available Slots: 15</p>
        </div>

        {/* ✅ Appointment Management (moved up before vaccines) */}
        <div id="appointments" className="appointments">
          <h3>Appointment Management</h3>
          <table>
            <thead>
              <tr>
                <th>User Name</th>
                <th>Vaccine</th>
                <th>Time Slot</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Sophia Clark</td>
                <td>Covishield</td>
                <td>9:00 AM</td>
                <td>Booked</td>
                <td>
                  <button>Mark as Vaccinated</button>
                  <button>Download Vaccine Card</button>
                </td>
              </tr>
              <tr>
                <td>Liam Harris</td>
                <td>Covaxin</td>
                <td>10:00 AM</td>
                <td>Booked</td>
                <td>
                  <button>Mark as Vaccinated</button>
                  <button>Download Vaccine Card</button>
                </td>
              </tr>
              <tr>
                <td>Olivia Turner</td>
                <td>Covishield</td>
                <td>11:00 AM</td>
                <td>Booked</td>
                <td>
                  <button>Mark as Vaccinated</button>
                  <button>Download Vaccine Card</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ✅ Manage Vaccines (moved down after appointments) */}
        <div className="manage-vaccines">
          <h3>Manage Vaccines</h3>
          <table>
            <thead>
              <tr>
                <th>Vaccine Name</th>
                <th>Total Stock</th>
                <th>Administered</th>
                <th>Remaining</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Covishield</td>
                <td>100</td>
                <td>60</td>
                <td>40</td>
                <td><button>Update Stock</button></td>
              </tr>
              <tr>
                <td>Covaxin</td>
                <td>50</td>
                <td>35</td>
                <td>15</td>
                <td><button>Update Stock</button></td>
              </tr>
              <tr>
                <td>Sputnik V</td>
                <td>20</td>
                <td>10</td>
                <td>10</td>
                <td><button>Update Stock</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default Hospital;
