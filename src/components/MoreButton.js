import React from 'react'

export const MoreButton = ({arrowMore, handlePagination}) => {
  return (
    <button type="button" onClick={handlePagination} className="arrow-more-btn">
      <span className="arrow-more-btn-text">More</span>
      <img src={arrowMore} alt={arrowMore} className="arrow-more-btn-icon" />
    </button>
  )
}
