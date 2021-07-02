import React from "react"

import Helmet from "react-helmet"
import { SEOProps } from "./type";

const SEO: React.FC<SEOProps> = (props) => {
  const { title, description = '', lang = 'en', meta = [], author = '' } = props;

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`Workclass | ${title}`}
      meta={[
        {
          name: `description`,
          content: description,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: description,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: author,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: description,
        },
        ...meta
      ]}
    />
  )
}




export default SEO