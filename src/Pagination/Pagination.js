import React, { useEffect, useState } from "react";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";

export default function Pagination({
  updateShowPerpagevalue,
  showPrePage,
  onPaginationChange,
  total,
}) {
  const [counter, setCounter] = useState(1);
  const [numberOfButton, setNumberOfButton] = useState();

  useEffect(() => {
    const value = showPrePage * counter;
   
    onPaginationChange(value - showPrePage, value);
    setNumberOfButton(Math.ceil(total / showPrePage));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [counter, total]);

  // React.useEffect(() => {
  //   updateShowPerpagevalue(1);
  // }, []);
  const onButtonClick = (type) => {
    if (type === "p") {
      if (counter === 1) {
        setCounter(1);
      } else {
        setCounter(counter - 1);
      }
    } else if (type === "n") {
      if (numberOfButton === counter) {
        setCounter(counter);
      } else {
        setCounter(counter + 1);
      }
    }
  };
  return (
    <>
      <div class="mt-4 d-flex justify-content-end mr-4">
        <div className="mr-2">
          <select
            name="showPrePage"
            id="showPrePage"
            value={showPrePage}
            className="form-control"
            onChange={(e) => updateShowPerpagevalue(parseInt(e.target.value))}
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>
        <nav aria-label="Page navigation example">
          <ul class="pagination">
           
            <li class="page-item">
              <p
                class="page-link"
                onClick={() => setCounter(1)}
                style={{ color: "black", cursor: "pointer" }}
              >
                <KeyboardDoubleArrowLeftIcon style={{ fontSize: "15px" }} />
              </p>
            </li>
            <li class="page-item">
              <p
                class="page-link"
                onClick={() => onButtonClick("p")}
                style={{ color: "black", cursor: "pointer" }}
              >
                <KeyboardArrowLeftIcon style={{ fontSize: "15px" }} />
              </p>
            </li>

            {new Array(numberOfButton)?.fill("")?.map((item, index) => (
             
              <>
             
                <li
                  class={`page-item ${index + 1 === counter ? "active" : null}`}
                >
                  {(index + 1 === counter ||
                    index + 1 === counter - 1 ||
                    index + 1 === counter + 1) && (
                    <button
                      class="page-link"
                      onClick={() => setCounter(index + 1)}
                      // style={{ backgroundColor: "#25124d" }}
                      style={{
                        backgroundColor: `${
                          index + 1 === counter ? "#25124d" : "white"
                        }`,
                        color: `${index + 1 === counter ? "white" : "#25124d"}`,
                      }}
                    >
                      {index + 1}
                    </button>
                  )}
                </li>
              </>
            ))}
            <li class="page-item">
              <p
                class="page-link"
                onClick={() => onButtonClick("n")}
                style={{ color: "black", cursor: "pointer" }}
              >
                <KeyboardArrowRightIcon style={{ fontSize: "15px" }} />
              </p>
            </li>
            <li class="page-item">
              <p
                class="page-link"
                onClick={() => setCounter(numberOfButton)}
                style={{ color: "black", cursor: "pointer" }}
              >
                <KeyboardDoubleArrowRightIcon style={{ fontSize: "15px" }} />
              </p>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
