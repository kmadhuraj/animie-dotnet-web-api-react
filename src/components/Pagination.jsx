import React from "react";

function Pagination({ totalPost, postPerPage, setCurrentPage, currentPage }) {
  const paginationNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPost / postPerPage); i++) {
    paginationNumbers.push(i);
  }
  return (
    <>
      <div className="btn-container dflex">
        {paginationNumbers.map((page, index) => (
          <button
            className={`btn btn-warning mx-2 ${page === currentPage ? " btn btn-danger" : ""}`}
            key={index}
            onClick={() => setCurrentPage(page)}
          >
            {" "}
            {page}
          </button>
        ))}
      </div>
    </>
  );
}

export default Pagination;
