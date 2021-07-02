import React from "react";

import { PageProps } from "gatsby";
import { SEO } from "../../components/SEO";


const JobDetail: React.FC<PageProps> = (props) => {
  const { params } = props;
  const { job_id } = params

  return <>
    <SEO />
    <div>{job_id}</div></>
}

export default JobDetail