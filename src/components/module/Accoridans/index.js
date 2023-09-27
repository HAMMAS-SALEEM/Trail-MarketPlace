import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const Accordion = ({ data }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { t } = useTranslation();

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="accordion">
      <div className="accordion-header" onClick={handleToggle}>
        <h3>{data.title ?? t("title")}</h3>
        <span>{isExpanded ? '-' : '+'}</span>
      </div>
      {/* {isExpanded && <div className="accordion-content">{content}</div>} */}
    </div>
  );
};

export default Accordion;

