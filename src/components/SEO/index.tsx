import { SEOProps } from "./type";
import React, { memo } from "react";
import Helmet from "react-helmet";
import { DEFAULT_KEYWORD, DEFAULT_IMAGE, DEFAULT_TITLE, DEFAULT_DESCRIPTION } from "../../common/constant";

export const SEO: React.FC<SEOProps> = memo((props) => {
  const {
    title = DEFAULT_TITLE,
    author = "",
    description = DEFAULT_DESCRIPTION,
    img = DEFAULT_IMAGE,
    keywords = DEFAULT_KEYWORD,
    lang = "en",
    url = "https://workclass.co",
  } = props;

  return (
    <Helmet>
      <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />
      <meta property="og:title" content={title} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={img} />
      <meta property="og:description" content={description} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:domain" content={url} />
      <meta name="twitter:image:src" content={img} />

      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(", ")} />
      <meta name="author" content={author} />
      <title>{title}</title>
      <html lang={lang} />
    </Helmet>
  );
});

export default SEO;
