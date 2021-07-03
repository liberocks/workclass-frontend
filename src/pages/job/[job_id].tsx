

import React, { useState, useEffect } from "react";

import { navigate, PageProps } from "gatsby";
import { message, Layout, Row, Col, Divider, Button, Grid, Space } from "antd";
import { ArrowLeftOutlined } from '@ant-design/icons';
import moment from 'moment';
import ReactHtmlParser from 'react-html-parser';
import pickBy from 'lodash/pickBy';

import { getJob } from "../../common/api";
import { SEO, JobTag, ShowIf, JobCard } from "../../components";
import { useQuery } from "../../common/hooks";
import { JOBS_SELECT_QUERY } from "../../common/constant";

import { s } from './_style';

const { Footer, Content } = Layout;
const { useBreakpoint } = Grid


const JobDetail: React.FC<PageProps> = (props) => {
  const { jobs, loadJobs, query, setQuery, resetJobs, loading: jobsLoading } = useQuery({ select: JOBS_SELECT_QUERY });
  const [job, setJob] = useState<IDataJob | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const { md, lg, xxl } = useBreakpoint()


  const { params } = props;
  const { job_id } = params

  const containerWidth = !md ? '95vw' : !lg ? '92.5vw' : !xxl ? '90vw' : '82.5vw';
  const containerPadding = !md ? 15 : !lg ? 20 : 30;

  useEffect(() => {
    setLoading(true);
    getJob(job_id).then(res => {
      setJob(res.job)
      setQuery({ page_size: 3, ...query, ...pickBy(res.job, (value, key) => value && (key.startsWith("employ_") || key.startsWith("job_"))) });
    }).catch(() => {
      message.error("Failed to load jobs, please try again later");
    }).finally(() => {
      setLoading(false);
    })
  }, [job_id])

  useEffect(() => {
    // Fetch jobs corresponding to the query
    resetJobs();
    loadJobs({ except: [parseInt(job_id)] });
  }, [query])

  const onBack = () => {
    navigate(-1);
  }

  const onClickApplyButton = (event) => {
    event.stopPropagation();
    window.location.href = `https://workclass.co/apply/?fromwebsite=true&start=${job_id}`
  }

  return (
    <>
      <SEO title={job ? `${job?.title} | ${job?.company_name}` : null} />
      <Layout style={{ background: 'white' }}>
        <Content style={{ ...s.content, maxWidth: containerWidth }}>
          <Row justify='center'>
            <Col span={0} xxl={7}></Col>
            <Col span={24} xxl={10}>
              <Button onClick={onBack} shape="round" icon={<ArrowLeftOutlined />} size='middle' style={s.back} />
            </Col>
            <Col span={0} xxl={7}></Col>
          </Row>

          <ShowIf condition={!loading && !!job}>
            <Row justify='center'>
              <Col span={0} xxl={7}></Col>
              <Col span={24} xxl={10} style={{ padding: `0 ${containerPadding}px` }}>
                <p style={s.company_name}>{job?.company_name}</p>
                <Row justify='space-between'>
                  <Col span={20}>
                    <p style={s.title}>{job?.title}</p>
                  </Col>
                  <Col span={4}>
                    <Button style={s.button} type='primary' onClick={onClickApplyButton}>Apply Now</Button>
                  </Col>
                </Row>

                <p style={s.activation_date}>created {moment(job?.activation_date).fromNow()}</p>

                <JobTag job={job} showEmploymentTypeTag />

                <ShowIf condition={!!job?.salary_from && !job?.salary_to}>
                  <p style={s.salary}>${job?.salary_from} ({job?.salary_period})</p>
                </ShowIf>
                <ShowIf condition={!job?.salary_from && !!job?.salary_to}>
                  <p style={s.salary}>${job?.salary_to} ({job?.salary_period})</p>
                </ShowIf>
                <ShowIf condition={!!job?.salary_from && !!job?.salary_to}>
                  <p style={s.salary}>${job?.salary_from} to ${job?.salary_to} ({job?.salary_period})</p>
                </ShowIf>


                <Divider />
                <div>{ReactHtmlParser(job?.description)}</div>
                <Divider />

                <div style={{ margin: "30px 0" }}>
                  <p style={s.job_category_label}>Job Category</p>
                  <JobTag job={job} showJobCategoryTag />
                </div>

              </Col>
              <Col span={24} xxl={7} style={{ padding: `0 ${containerPadding}px` }}>
                <ShowIf condition={!jobsLoading && jobs.length > 0}>
                  <p style={{ textAlign: 'center', color: 'grey' }}>Related Jobs</p>
                  <Space wrap size={[16, 16]} style={s.card_space} >
                    {jobs.map(job => (
                      <JobCard job={job} key={job.job_id} />
                    ))}
                  </Space>
                </ShowIf>
              </Col>
            </Row>
          </ShowIf>
        </Content>
        <Footer style={s.footer}>
          Workclass © {moment().get('year')}
        </Footer>
      </Layout>
    </>
  );
};

export default JobDetail;
