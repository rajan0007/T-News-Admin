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

export default function Dashboard() {
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
  const [totalPlayerData] = React.useState([]);
  const [totalBetAmountData] = React.useState([]);
  const [totalWinAmountData] = React.useState([]);
  // const [totalAddAmountData, setTotalAddAmountData] = React.useState([]);
  const [totalIncome] = React.useState("");
  // const [totalWithdrawAmountData, setTotalWithdrawAmountData] = React.useState(
  //   []
  // );

  // const [KYCPending] = React.useState();

  React.useEffect(() => {
    getPlayerList();
  }, []);

  const getPlayerList = () => {
    // Total Player
    // axios(`${API_URL}/api/dashboard/dashboard-total-player`, {
    //   method: "GET",
    //   credentials: "include",
    // })
    //   .then((response) => {
    //     console.log("dashboard-total-player", response.data.message);
    //     setTotalPlayerData(response.data.message);
    //   })
    //   .catch((error) => {
    //     console.log("dashboard-total-player", error);
    //   });
    // Total Add Amount
    // axios(`${API_URL}/api/dashboard/dashboard-total-add-amount`, {
    //   method: "GET",
    //   credentials: "include",
    // })
    //   .then((response) => {
    //     console.log("dashboard-total-add-amount", response.data.message);
    //     setTotalAddAmountData(response.data.message);
    //   })
    //   .catch((error) => {
    //     console.log("dashboard-total-add-amount", error);
    //   });
    // Total Withdraw Amount
    // axios(`${API_URL}/api/dashboard/dashboard-total-withdraw-amount`, {
    //   method: "GET",
    //   credentials: "include",
    // })
    //   .then((response) => {
    //     console.log("dashboard-total-withdraw-amount", response.data.message);
    //     setTotalWithdrawAmountData(response.data.message);
    //   })
    //   .catch((error) => {
    //     console.log("dashboard-total-withdraw-amount", error);
    //   });
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
                <div className="col-lg-3 col-6">
                  <div
                    className="small-box"
                    style={{ backgroundColor: "#ffab39" }}
                    onClick={() => {
                      history("/playerlist", { state: { data: false } });
                      setActive1(false);
                      setActive2(true);
                      setActive3(true);
                      setActive4(true);
                      setActive5(true);
                      setActive6(true);
                      setActive7(true);
                      setActive8(true);
                    }}
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
                      <div>Total Player</div>
                    </p>
                  </div>
                </div>
                {/* <div className="col-lg-3 col-6">
                  <div
                    className="small-box"
                    style={{ backgroundColor: "#e7427e" }}
                    onClick={() => {
                      history("/addcash", { state: { data: "All" } });
                      setActive4(false);
                      setActive1(true);
                      setActive2(true);
                      setActive3(true);
                      setActive5(true);
                      setActive6(true);
                      setActive7(true);
                      setActive8(true);
                    }}
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
                            <CountUp end={totalAddAmountData || 0} />
                          </h3>
                        </div>
                        <div className="col-sm-12 col-md-6 col-lg-6 col-sm order-sm-start-1">
                          <img
                            src={total_add_amount_icon}
                            alt="total_add_amount_icon"
                            height="50px"
                            width="50px"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="icon"></div>
                    <p className="small-box-footer">
                      <div style={{ color: "white" }}>
                        Total Deposite Amount
                      </div>
                    </p>
                  </div>
                </div>
                <div className="col-lg-3 col-6">
                  <div
                    className="small-box"
                    style={{ backgroundColor: "#541a3d" }}
                    onClick={() => {
                      history("/payout", { state: { data: "All" } });
                      setActive4(false);
                      setActive1(true);
                      setActive2(true);
                      setActive3(true);
                      setActive5(true);
                      setActive6(true);
                      setActive7(true);
                      setActive8(true);
                    }}
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
                            <CountUp end={totalWithdrawAmountData || 0} />
                          </h3>
                        </div>
                        <div className="col-sm-12 col-md-6 col-lg-6 col-sm order-sm-start-1">
                          <img
                            src={total_withdraw_icon}
                            alt="total_withdraw_icon"
                            height="50px"
                            width="50px"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="icon"></div>
                    <p className="small-box-footer">
                      <div style={{ color: "white" }}>
                        Total Withdraw Amount
                      </div>
                    </p>
                  </div>
                </div>
                <div className="col-lg-3 col-6">
                  <div
                    className="small-box"
                    style={{ backgroundColor: "#415ce7" }}
                    onClick={() => {
                      history("/addcash", { state: { data: true } });
                      setActive4(false);
                      setActive1(true);
                      setActive2(true);
                      setActive3(true);
                      setActive5(true);
                      setActive6(true);
                      setActive7(true);
                      setActive8(true);
                    }}
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
                            <CountUp end={totalAddAmountData || 0} />
                          </h3>
                        </div>
                        <div className="col-sm-12 col-md-6 col-lg-6 col-sm order-sm-start-1">
                          <img
                            src={total_add_amount_icon}
                            alt="total_add_amount_icon"
                            height="50px"
                            width="50px"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="icon"></div>
                    <p className="small-box-footer">
                      <div style={{ color: "white" }}>
                        Pending Deposite Amount
                      </div>
                    </p>
                  </div>
                </div>
                <div className="col-lg-3 col-6">
                  <div
                    className="small-box "
                    style={{ backgroundColor: "#f57348" }}
                    onClick={() => {
                      history("/payout", { state: { data: true } });
                      setActive4(false);
                      setActive1(true);
                      setActive2(true);
                      setActive3(true);
                      setActive5(true);
                      setActive6(true);
                      setActive7(true);
                      setActive8(true);
                    }}
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
                            <CountUp end={totalWithdrawAmountData || 0} />
                          </h3>
                        </div>
                        <div className="col-sm-12 col-md-6 col-lg-6 col-sm order-sm-start-1">
                          <img
                            src={total_withdraw_icon}
                            alt="total_withdraw_icon"
                            height="50px"
                            width="50px"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="icon"></div>
                    <p className="small-box-footer">
                      <div style={{ color: "white" }}>
                        Pending Withdraw Amount
                      </div>
                    </p>
                  </div>
                </div> */}
                <div className="col-lg-3 col-6">
                  <div
                    className="small-box"
                    style={{ backgroundColor: "#2ec268" }}
                    onClick={() => {
                      history("/bet");
                      setActive4(false);
                      setActive1(true);
                      setActive2(true);
                      setActive3(true);
                      setActive5(true);
                      setActive6(true);
                      setActive7(true);
                      setActive8(true);
                    }}
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
                            <CountUp end={totalBetAmountData || 0} />
                          </h3>
                        </div>
                        <div className="col-sm-12 col-md-6 col-lg-6 col-sm order-sm-start-1">
                          <img
                            src={total_bet_amount_icon}
                            alt="total_bet_amount_icon"
                            height="50px"
                            width="50px"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="icon"></div>
                    <p className="small-box-footer">
                      <div style={{ color: "white" }}>Total Bet Amount</div>
                    </p>
                  </div>
                </div>
                <div className="col-lg-3 col-6">
                  <div
                    className="small-box"
                    style={{ backgroundColor: "#ff3843" }}
                    onClick={() => {
                      history("/win");
                      setActive4(false);
                      setActive1(true);
                      setActive2(true);
                      setActive3(true);
                      setActive5(true);
                      setActive6(true);
                      setActive7(true);
                      setActive8(true);
                    }}
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
                            <CountUp end={totalWinAmountData || 0} />
                          </h3>
                        </div>
                        <div className="col-sm-12 col-md-6 col-lg-6 col-sm order-sm-start-1">
                          <img
                            src={total_win_amount_icon}
                            alt="total win amt"
                            height="50px"
                            width="50px"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="icon"></div>
                    <p className="small-box-footer">
                      <div style={{ color: "white" }}>Total Win Amount</div>
                    </p>
                  </div>
                </div>
                <div className="col-lg-3 col-6 ">
                  <div
                    className="small-box "
                    style={{ backgroundColor: "#ca4ddd" }}
                    onClick={() => {
                      history("/income-details");
                      setActive3(false);
                      setActive1(true);
                      setActive2(true);
                      setActive4(true);
                      setActive5(true);
                      setActive6(true);
                      setActive7(true);
                      setActive8(true);
                    }}
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
              </div>
            </div>
          </section>
        </>
    </div>
  );
}
