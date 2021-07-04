import { JOBS_SELECT_QUERY } from "../../common/constant";
import { useQuery } from "../../common/hooks";
import { JobCard, ShowIf, SEO } from "../../components";
import { Sidebar } from "./_Sidebar";
import { s } from "./_style";
import { LoadingOutlined } from "@ant-design/icons";
import {
  Col,
  Row,
  Spin,
  Typography,
  Grid,
  Space,
  Input,
  Button,
  Layout,
} from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";

const { useBreakpoint } = Grid;
const { Search } = Input;
const { Footer, Content } = Layout;

const IndexPage: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>("");

  const { loading, jobs, loadJobs, query, setQuery, metadata, resetJobs } =
    useQuery({ select: JOBS_SELECT_QUERY });
  const { md, lg } = useBreakpoint();

  const containerPadding = !md ? 0 : !lg ? 25 : 50;
  const containerWidth = !md ? "95vw" : !lg ? "90vw" : "82.5vw";
  const searchWidth = !md ? "95vw" : !lg ? "85vw" : "75vw";

  useEffect(() => {
    // Fetch jobs corresponding to the query
    loadJobs({});
  }, [query]);

  const onLoadMore = () => {
    setQuery({ ...query, page: metadata.page + 1 });
  };

  const onSearchClick = () => {
    if (query.keyword !== searchValue) {
      resetJobs();
      setQuery({ ...query, keyword: searchValue });
    }
  };

  const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target) {
      setSearchValue(event.target.value);
    }
  };

  return (
    <>
      <SEO />
      <Layout style={{ background: "white" }}>
        <Content>
          <Row
            style={{
              ...s.container,
              padding: `0 ${containerPadding}px`,
              maxWidth: containerWidth,
            }}
          >
            <Col span={24}>
              <Typography.Title style={s.title}>Jobs</Typography.Title>
            </Col>

            <Col span={24}>
              <Row justify="center">
                <Search
                  placeholder="Job title or keywords"
                  size="large"
                  allowClear
                  enterButton="Search"
                  value={searchValue}
                  onChange={onSearchChange}
                  onSearch={onSearchClick}
                  style={{ ...s.search, width: searchWidth }}
                />
              </Row>
            </Col>

            <Col md={24} lg={24} xl={4} style={s.sidebar_container}>
              <Sidebar query={query} setQuery={setQuery} reset={resetJobs} />
            </Col>
            <Col md={24} lg={20}>
              <Space wrap size={[16, 16]} style={s.card_space}>
                {jobs.map((job) => (
                  <JobCard job={job} key={job.job_id} />
                ))}
              </Space>

              <ShowIf condition={!loading && jobs.length === 0}>
                <Typography.Title level={4} style={{ textAlign: "center" }}>
                  No job was found
                </Typography.Title>
              </ShowIf>

              <ShowIf condition={loading && jobs.length === 0}>
                <div style={{ textAlign: "center", minHeight: "50vh" }}>
                  <Spin
                    indicator={
                      <LoadingOutlined
                        style={{ fontSize: 50, marginTop: "50%" }}
                      />
                    }
                  />
                </div>
              </ShowIf>

              <Row style={{ textAlign: "center" }}>
                <Col span={24}>
                  <Button
                    onClick={onLoadMore}
                    type="primary"
                    style={s.load_more}
                    disabled={loading || metadata.page === metadata.total_page}
                  >
                    <ShowIf condition={loading}>
                      <Spin
                        indicator={
                          <LoadingOutlined
                            style={{ fontSize: 24, color: "white" }}
                          />
                        }
                      />
                    </ShowIf>
                    <ShowIf condition={!loading}>Load more</ShowIf>
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Content>
        <Footer style={s.footer}>Workclass © {moment().get("year")}</Footer>
      </Layout>
    </>
  );
};

export default IndexPage;
