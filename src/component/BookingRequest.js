import React from "react";
import DataServices from "../services/requestApi";

export default function BookingRequest() {
  const getBookingReq =async () => {
    try {
      const { data } = await DataServices.GetProviderBooking();
      if (data?.status) {
        toast.success(data?.message);
        setIsEdit(false);
        getBranch();
      } else {
        toast.warning(data?.message);
      }
    } catch (error) {}
  }
  return (
    <>
      <div className="content p-3">
        <div class="card ">
          <div class="pl-4 pr-4 pt-4">
            <div className="row">
              <div className="col-md-6 col-lg-6">Service Request</div>
              <div className="mt-2 col-md-6 col-lg-6 d-flex justify-content-start justify-content-lg-end">
                <div>
                  <input
                    class="input-simple"
                    type="text"
                    placeholder="Search Email..."
                    //   value={searchSubType}
                    //   onChange={(e) => setSearchTourName(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="card-body" style={{ overflow: "scroll" }}>
            <table id="" class="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>SrNo</th>
                  <th>User name</th>
                  <th>Email</th>
                  <th>Phone No</th>
                  <th>Professionals No</th>
                  <th>Ladder</th>
                  <th>Date</th>
                  <th>Hours</th>
                  <th>time</th>
                  <th>Description</th>
                  <th>zipCode</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody></tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
