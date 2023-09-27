export const stringToHTML = function (str,className) {
    return <div className={`${className}`}  dangerouslySetInnerHTML={{ __html: str }} />;
  };