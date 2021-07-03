import React from 'react'

import { Card, Image, Button, Space, Tooltip, Grid, Row, Col, Tag } from "antd";


import { JobTagProps } from './type'
import { s } from './style';

export const JobTag: React.FC<JobTagProps> = ({ job, showJobCategoryTag, showEmploymentTypeTag }) => {
  const renderTag = () => {
    const tags = []

    for (const [key, value] of Object.entries(job)) {
      if (showJobCategoryTag) {
        if (key === 'job_admin' && value) tags.push(<Tag color='blue'>Admin</Tag>)
        if (key === 'job_covid19' && value) tags.push(<Tag color='blue'>Covid19</Tag>)
        if (key === 'job_customerservice' && value) tags.push(<Tag color='blue'>Customer Service</Tag>)
        if (key === 'job_distributionshipping' && value) tags.push(<Tag color='blue'>Distribution Shipping</Tag>)
        if (key === 'job_grocery' && value) tags.push(<Tag color='blue'>Grocery</Tag>)
        if (key === 'job_hospitalityhotel' && value) tags.push(<Tag color='blue'>Hospitality Hotel</Tag>)
        if (key === 'job_marketingsales' && value) tags.push(<Tag color='blue'>Marketing Sales</Tag>)
        if (key === 'job_production' && value) tags.push(<Tag color='blue'>Production</Tag>)
        if (key === 'job_restaurantfoodservice' && value) tags.push(<Tag color='blue'>Restaurant Food Service</Tag>)
        if (key === 'job_retail' && value) tags.push(<Tag color='blue'>Retail</Tag>)
        if (key === 'job_supplychain' && value) tags.push(<Tag color='blue'>Supply Chain</Tag>)
        if (key === 'job_transportation' && value) tags.push(<Tag color='blue'>Transportation</Tag>)
        if (key === 'job_warehouse' && value) tags.push(<Tag color='blue'>Warehouse</Tag>)
        if (key === 'job_other' && value) tags.push(<Tag color='blue'>Other</Tag>)
      }

      if (showEmploymentTypeTag) {
        if (key === "employ_adhoc" && value) tags.push(<Tag color="magenta">Adhoc</Tag>)
        if (key === "employ_contract" && value) tags.push(<Tag color="lime">Contract</Tag>)
        if (key === "employ_fulltime" && value) tags.push(<Tag color="purple">Full-time</Tag>)
        if (key === "employ_internship" && value) tags.push(<Tag color="green">Internship</Tag>)
        if (key === "employ_parttime" && value) tags.push(<Tag color="gold">Part-time</Tag>)
      }
    }

    return tags
  }

  return <Space wrap>{renderTag()}</Space>
}

export default JobTag