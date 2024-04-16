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
  const [international, setInternational] = React.useState(0);
  const [tranding, setTranding] = React.useState(0);
  const [popular, setPopular] = React.useState(0);
  const [featured, setFeatured] = React.useState(0);
  const [news, setNews] = React.useState(0);
  const [business, setBusiness] = React.useState(0);
  const [sports, setSports] = React.useState(0);
  const [technology, setTechnology] = React.useState(0);
  const [politics, setPolitics] = React.useState(0);
  const [entertainment, setEntertainment] = React.useState(0);

  
  
  

  React.useEffect(() => {
    getPlayerList();
  }, []);

  const getPlayerList = async () => {
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

        const internationalItems = response.data.data.filter(
          (item) => item.type === "International"
        );
        setInternational(internationalItems.length);

        const trandingItems = response.data.data.filter(
          (item) => item.type === "Tranding"
        );
        setTranding(trandingItems.length);

        const popularItem = response.data.data.filter(
          (item) => item.type === "Popular"
        );
        setPopular(popularItem.length);

        const featuredItem = response.data.data.filter(
          (item) => item.type === "Featured"
        );
        setFeatured(featuredItem.length);

        const newsItem = response.data.data.filter(
          (item) => item.categories === "News"
        );
        setNews(newsItem.length);

        const businessItem = response.data.data.filter(
          (item) => item.categories === "Business"
        );
        setBusiness(businessItem.length);

        const sportsItem = response.data.data.filter(
          (item) => item.categories === "Sports"
        );
        setSports(sportsItem.length);

        const technologyItem = response.data.data.filter(
          (item) => item.categories === "Technology"
        );
        setTechnology(technologyItem.length);

        const politicsItem = response.data.data.filter(
          (item) => item.categories === "Politics"
        );
        setPolitics(politicsItem.length);

        const entertainmentItem = response.data.data.filter(
          (item) => item.categories === "Entertainment"
        );
        setEntertainment(entertainmentItem.length);
      })
      .catch((error) => {
        console.log("getBranch error :::", error);
      });
  };

  return (
    <>
      <section className="content">
        <div className="container-fluid">
          {isPro == "Admin" && (
            <>
              <div className="content-header">
                <div className="container-fluid">
                  <div className="row mb-2">
                    <div className="col-sm-6">
                      <h1 className="m-0">Dashboard</h1>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
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
              </div>
              <div className="content-header">
                <div className="container-fluid">
                  <div className="row mb-2">
                    <div className="col-sm-6">
                      <h1 className="m-0">Blog Type</h1>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-3 col-6">
                  <div
                    className="small-box"
                    style={{ backgroundColor: "#0d6efd" }}
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
                            <CountUp end={international || 0} />
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
                      <div>International</div>
                    </p>
                  </div>
                </div>
                <div className="col-lg-3 col-6 ">
                  <div
                    className="small-box "
                    style={{ backgroundColor: "#d63384" }}
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
                            <CountUp end={tranding || 0} />
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
                      <div style={{ color: "white" }}>Tranding</div>
                    </p>
                  </div>
                </div>
                <div className="col-lg-3 col-6">
                  <div
                    className="small-box"
                    style={{ backgroundColor: "#fd7e14" }}
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
                            <CountUp end={popular || 0} />
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
                      <div>Popular</div>
                    </p>
                  </div>
                </div>
                <div className="col-lg-3 col-6 ">
                  <div
                    className="small-box "
                    style={{ backgroundColor: "#198754" }}
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
                            <CountUp end={featured || 0} />
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
                      <div style={{ color: "white" }}>Featured</div>
                    </p>
                  </div>
                </div>
              </div>
              <div className="content-header">
                <div className="container-fluid">
                  <div className="row mb-2">
                    <div className="col-sm-6">
                      <h1 className="m-0">Blog Categories</h1>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-3 col-6">
                  <div
                    className="small-box"
                    style={{ backgroundColor: "#6c757d" }}
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
                            <CountUp end={news || 0} />
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
                      <div>News</div>
                    </p>
                  </div>
                </div>
                <div className="col-lg-3 col-6 ">
                  <div
                    className="small-box "
                    style={{ backgroundColor: "#6610f2" }}
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
                            <CountUp end={business || 0} />
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
                      <div style={{ color: "white" }}>Business</div>
                    </p>
                  </div>
                </div>
                <div className="col-lg-3 col-6">
                  <div
                    className="small-box"
                    style={{ backgroundColor: "#6f42c1" }}
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
                            <CountUp end={sports || 0} />
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
                      <div>Sports</div>
                    </p>
                  </div>
                </div>
                <div className="col-lg-3 col-6 ">
                  <div
                    className="small-box "
                    style={{ backgroundColor: "#ffc107" }}
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
                            <CountUp end={technology || 0} />
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
                      <div style={{ color: "white" }}>Technology</div>
                    </p>
                  </div>
                </div>
                <div className="col-lg-3 col-6 ">
                  <div
                    className="small-box "
                    style={{ backgroundColor: "#20c997" }}
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
                            <CountUp end={politics || 0} />
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
                      <div style={{ color: "white" }}>Politics</div>
                    </p>
                  </div>
                </div>
                <div className="col-lg-3 col-6 ">
                  <div
                    className="small-box "
                    style={{ backgroundColor: "#0dcaf0" }}
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
                            <CountUp end={entertainment || 0} />
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
                      <div style={{ color: "white" }}>Entertainment</div>
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
