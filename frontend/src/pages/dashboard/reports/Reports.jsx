import React from "react";
import fleetmanagement from "../../../assets/icons/fleet-management.png";
import maintanance from "../../../assets/icons/maintanance.png";
// import fleetmanagement from "../../../assets/icons/fleet-management.png";
// import fleetmanagement from "../../../assets/icons/fleet-management.png";
import { TiArrowRight } from "react-icons/ti";
import { Button, Divider } from "antd";
import './Reports.css'

function Reports() {
  return (
    <div class="row">
      <Divider>Reports</Divider>
      <div class="col-lg-6 col-md-4">
        <div class="reports-card">
          <div  class="reports-card-img">
            <img src={fleetmanagement} alt="car"/>
          </div>
          <div>
            <h5>Fleet Summary</h5>
            <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis,
              earum aspernatur. Odio minus deserunt perferendis aspernatur
              molestiae nam dolore voluptates quo, fugiat praesentium sapiente
              eius nisi dolorem assumenda. Tempora, at!
            </p>
            <Button>Read More <TiArrowRight /></Button>
          </div>
        </div>
      </div>
      <div class="col-lg-6 col-md-4">
        <div class="reports-card">
          <div  class="reports-card-img">
            <img src={maintanance} alt="car"/>
          </div>
          <div>
            <h5>Maintenance & Repairs</h5>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis,
              earum aspernatur. Odio minus deserunt perferendis aspernatur
              molestiae nam dolore voluptates quo, fugiat praesentium sapiente
              eius nisi dolorem assumenda. Tempora, at!
            </p>
            <Button>Read More <TiArrowRight /></Button>
          </div>
        </div>
      </div>
      <div class="col-lg-6 col-md-4">
        <div class="reports-card">
          <div  class="reports-card-img">
            <img src={fleetmanagement} alt="car"/>
          </div>
          <div>
            <h5>Fleet Summary</h5>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis,
              earum aspernatur. Odio minus deserunt perferendis aspernatur
              molestiae nam dolore voluptates quo, fugiat praesentium sapiente
              eius nisi dolorem assumenda. Tempora, at!
            </p>
            <Button>Read More <TiArrowRight /></Button>
          </div>
        </div>
      </div>
      <div class="col-lg-6 col-md-4">
        <div class="reports-card">
          <div  class="reports-card-img">
            <img src={fleetmanagement} alt="car"/>
          </div>
          <div>
            <h5>Fleet Summary</h5>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis,
              earum aspernatur. Odio minus deserunt perferendis aspernatur
              molestiae nam dolore voluptates quo, fugiat praesentium sapiente
              eius nisi dolorem assumenda. Tempora, at!
            </p>
            <Button>Read More <TiArrowRight /></Button>
          </div>
        </div>
      </div>
      <div class="col-lg-6 col-md-4">
        <div class="reports-card">
          <div  class="reports-card-img">
            <img src={fleetmanagement} alt="car"/>
          </div>
          <div>
            <h5>Fleet Summary</h5>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis,
              earum aspernatur. Odio minus deserunt perferendis aspernatur
              molestiae nam dolore voluptates quo, fugiat praesentium sapiente
              eius nisi dolorem assumenda. Tempora, at!
            </p>
            <Button>Read More <TiArrowRight /></Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reports;
