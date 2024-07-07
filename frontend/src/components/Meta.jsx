import React from "react";
import { Helmet } from "react-helmet-async";

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>

      <meta name="description" content={description} />

      <meta name="keyword" content={keywords} />
    </Helmet>
  );
};


Meta.defaultProps={

    title:'welcome to WristWorks',
    description:'we sell the best products for cheap',
    keywords:'watches,buy watches'

}







export default Meta;
