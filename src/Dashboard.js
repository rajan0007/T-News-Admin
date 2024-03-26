import React from "react";
import totalPlayer from "./icon/total_player_icon.svg";
import total_bet_amount_icon from "./icon/total_bet_amount_icon.svg";
import total_win_amount_icon from "./icon/total_win_amount_icon.svg";
// import total_add_amount_icon from "./icon/total_add_amount_icon.svg";
// import total_withdraw_icon from "./icon/total_withdraw_icon.svg";
import total_income_icon from "./icon/total_income_icon.svg";
// import games_icon from "./icon/games.svg";
// import axios from "axios";
import CountUp from "react-countup";
// import { API_URL } from "../src/config";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "./Lib/ContextLib";
import { BASEURL } from "./config";
import axios from "axios";
import DataServices from "./services/requestApi";

export default function Dashboard() {
  const isPro = sessionStorage.getItem("role");
  const history = useNavigate();
  const {
    setActive1,
    setActive2,
    setActive3,
    setActive4,
    setActive5,
    setActive6,
    setActive7,
    setActive8,
    accessObject,
  } = useAppContext();
  const [totalPlayerData, setTotalPlayerData] = React.useState([]);
  const [totalBetAmountData] = React.useState([]);
  const [totalWinAmountData] = React.useState([]);
  // const [totalAddAmountData, setTotalAddAmountData] = React.useState([]);
  const [totalIncome, setTotalIncome] = React.useState(0);
  const [customer, setCustomer] = React.useState(0);
  const [professionalList, setprofessionalList] = React.useState(0);
  const [booking, setBooking] = React.useState(0);
  const [blog, setBlog] = React.useState(0);
  // const [totalWithdrawAmountData, setTotalWithdrawAmountData] = React.useState(
  //   []
  // );

  // const [KYCPending] = React.useState();

  React.useEffect(() => {
    getPlayerList();
  }, []);

  const getPlayerList = async () => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    console.log("user::: ", user);
    await axios
      .post(`${BASEURL}/api/booking/getProviderById`, {
        providerId: user,
      })
      .then((res) => {
        if (res.data) {
          let sum = 0;
          console.log("res.data::: ", res?.data?.data);
          res?.data?.data.map((data) => {
            sum = sum + data.total;
          });
          setTotalIncome(sum);
          setTotalPlayerData(res?.data?.data.length);
        } else {
        }
      })
      .catch((err) => {});

    try {
      const { data } = await DataServices.GetUser();

      console.log("getBranch data:", data);
      setCustomer(data?.data.length);
    } catch (e) {
      console.error("Error fetching data:", e);
    }

    try {
      const { data } = await DataServices.GetAllProvider();

      setprofessionalList(data?.data.length);
    } catch (e) {}

    try {
      const { data } = await DataServices.Booking();

      setBooking(data?.data.length);
    } catch (e) {
      console.error("Error fetching data:", e);
    }

    axios(`${BASEURL}/api/blog/allBlog`, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => {
        setBlog(response.data.data.length);
      })
      .catch((error) => {
        console.log("getBranch error :::", error);
      });

    // ;
  };

  return (
    <div>
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">Dashboard</h1>
            </div>
          </div>
        </div>
      </div>

      <>
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              {isPro == "Provider" && (
                <>
                  <div className="col-lg-3 col-6">
                    <div
                      className="small-box"
                      style={{ backgroundColor: "#ffab39" }}
                    >
                      <div className="inner p-lg-4 p-md-3">
                        <div
                          className="row  d-flex"
                          style={{ justifyContent: "space-between" }}
                        >
                          <div className="col-sm-12 col-md-6 col-lg-6 order-2">
                            <h3
                              style={{
                                color: "white",
                                alignItems: "center",
                              }}
                              className="m-2 d-flex justify-content-center justify-content-md-center justify-content-lg-end "
                            >
                              <CountUp end={totalPlayerData || 0} />
                            </h3>
                          </div>
                          <div className="col-sm-12 col-md-6 col-lg-6 col-sm order-sm-start-1">
                            <img
                              alt="total player"
                              src={totalPlayer}
                              height="50px"
                              width="50px"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="icon"></div>
                      <p className="small-box-footer">
                        <div>Total Booking</div>
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-3 col-6 ">
                    <div
                      className="small-box "
                      style={{ backgroundColor: "#ca4ddd" }}
                    >
                      <div className="inner p-lg-4 p-md-3">
                        <div
                          className="row  d-flex"
                          style={{ justifyContent: "space-between" }}
                        >
                          <div className="col-sm-12 col-md-6 col-lg-6 order-2">
                            <h3
                              style={{
                                color: "white",
                                alignItems: "center",
                              }}
                              className="m-2 d-flex justify-content-center justify-content-md-center justify-content-lg-end "
                            >
                              <CountUp end={totalIncome || 0} />
                            </h3>
                          </div>
                          <div className="col-sm-12 col-md-6 col-lg-6 col-sm order-sm-start-1">
                            <img
                              src={total_income_icon}
                              alt="total income"
                              height="50px"
                              width="50px"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="icon"></div>
                      <p className="small-box-footer">
                        <div style={{ color: "white" }}>Total Income</div>
                      </p>
                    </div>
                  </div>
                </>
              )}
              {isPro == "Admin" && (
                <>
                  <div className="col-lg-3 col-6">
                    <div
                      className="small-box"
                      style={{ backgroundColor: "#ffab39" }}
                    >
                      <div className="inner p-lg-4 p-md-3">
                        <div
                          className="row  d-flex"
                          style={{ justifyContent: "space-between" }}
                        >
                          <div className="col-sm-12 col-md-6 col-lg-6 order-2">
                            <h3
                              style={{
                                color: "white",
                                alignItems: "center",
                              }}
                              className="m-2 d-flex justify-content-center justify-content-md-center justify-content-lg-end "
                            >
                              <CountUp end={customer || 0} />
                            </h3>
                          </div>
                          <div className="col-sm-12 col-md-6 col-lg-6 col-sm order-sm-start-1">
                            <img
                              alt="total player"
                              src={totalPlayer}
                              height="50px"
                              width="50px"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="icon"></div>
                      <p className="small-box-footer">
                        <div>Total Customer</div>
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-3 col-6 ">
                    <div
                      className="small-box "
                      style={{ backgroundColor: "#ca4ddd" }}
                    >
                      <div className="inner p-lg-4 p-md-3">
                        <div
                          className="row  d-flex"
                          style={{ justifyContent: "space-between" }}
                        >
                          <div className="col-sm-12 col-md-6 col-lg-6 order-2">
                            <h3
                              style={{
                                color: "white",
                                alignItems: "center",
                              }}
                              className="m-2 d-flex justify-content-center justify-content-md-center justify-content-lg-end "
                            >
                              <CountUp end={professionalList || 0} />
                            </h3>
                          </div>
                          <div className="col-sm-12 col-md-6 col-lg-6 col-sm order-sm-start-1">
                            <img
                              src={totalPlayer}
                              alt="total income"
                              height="50px"
                              width="50px"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="icon"></div>
                      <p className="small-box-footer">
                        <div style={{ color: "white" }}>Total Professional</div>
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-3 col-6">
                    <div
                      className="small-box"
                      style={{ backgroundColor: "#ffab39" }}
                    >
                      <div className="inner p-lg-4 p-md-3">
                        <div
                          className="row  d-flex"
                          style={{ justifyContent: "space-between" }}
                        >
                          <div className="col-sm-12 col-md-6 col-lg-6 order-2">
                            <h3
                              style={{
                                color: "white",
                                alignItems: "center",
                              }}
                              className="m-2 d-flex justify-content-center justify-content-md-center justify-content-lg-end "
                            >
                              <CountUp end={booking || 0} />
                            </h3>
                          </div>
                          <div className="col-sm-12 col-md-6 col-lg-6 col-sm order-sm-start-1">
                            <img
                              alt="total player"
                              src={total_bet_amount_icon}
                              height="50px"
                              width="50px"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="icon"></div>
                      <p className="small-box-footer">
                        <div>Total Booking</div>
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-3 col-6 ">
                    <div
                      className="small-box "
                      style={{ backgroundColor: "#ca4ddd" }}
                    >
                      <div className="inner p-lg-4 p-md-3">
                        <div
                          className="row  d-flex"
                          style={{ justifyContent: "space-between" }}
                        >
                          <div className="col-sm-12 col-md-6 col-lg-6 order-2">
                            <h3
                              style={{
                                color: "white",
                                alignItems: "center",
                              }}
                              className="m-2 d-flex justify-content-center justify-content-md-center justify-content-lg-end "
                            >
                              <CountUp end={blog || 0} />
                            </h3>
                          </div>
                          <div className="col-sm-12 col-md-6 col-lg-6 col-sm order-sm-start-1">
                            <img
                              src={total_income_icon}
                              alt="total income"
                              height="50px"
                              width="50px"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="icon"></div>
                      <p className="small-box-footer">
                        <div style={{ color: "white" }}>Total Blog</div>
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      </>
    </div>
  );
}
