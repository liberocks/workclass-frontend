import React, { useEffect } from 'react';

import { LoadingOutlined } from '@ant-design/icons';
import { Col, message, Row, Spin, Typography, Grid, Space, Checkbox, Form, Menu, Input, Button, Image, Layout } from 'antd';
import moment from 'moment';

import { JobCard, ShowIf } from '../../components';

import { s } from './style';
import { Sidebar } from './Sidebar'
import { useQuery } from './useQuery';


const { useBreakpoint } = Grid
const { Search } = Input;
const { Footer, Content } = Layout;


const IndexPage: React.FC = () => {
	const { loading, jobs, loadJobs, query } = useQuery()
	const { md, lg, } = useBreakpoint()

	const containerPadding = !md ? 0 : !lg ? 25 : 50;
	const containerWidth = !md ? '95vw' : !lg ? '90vw' : '82.5vw';
	const searchWidth = !md ? '95vw' : !lg ? '85vw' : '75vw';


	useEffect(() => {
		/**
		 * On load, fetch newest jobs
		 */
		loadJobs({
			errorCallback: () => {
				message.error("Failed to load jobs, please try again later");
			}
		});
	}, []);

	useEffect(() => {
		/**
		 * On load, fetching jobs corresponds to the query
		 */
		loadJobs({
			errorCallback: () => {
				message.error("Failed to load jobs, please try again later");
			}
		});
	}, [query])

	return (
		<Layout style={{ background: 'white' }}>
			<Content>
				<Row style={{ ...s.container, padding: `0 ${containerPadding}px`, maxWidth: containerWidth }}>

					<Col span={24}>
						<Typography.Title style={s.title}>Jobs</Typography.Title>
					</Col>

					<Col span={24} >
						<Row justify='center'>
							<Search placeholder="Job title or keywords" size="large" allowClear enterButton="Search" style={{ ...s.search, width: searchWidth }} />
						</Row>
					</Col>

					<Col md={24} lg={24} xl={4} style={s.sidebar_container}>
						<Sidebar />
					</Col>
					<Col md={24} lg={20} >
						<ShowIf condition={!loading}>
							<Space wrap size={[16, 16]} style={s.card_space} >
								{jobs.map(job => (
									<JobCard job={job} key={job.job_id} />
								))}
							</Space>
						</ShowIf>
						<ShowIf condition={loading}>
							<div style={{ textAlign: 'center', minHeight: '50vh' }}>
								<Spin indicator={<LoadingOutlined style={{ fontSize: 50, marginTop: '50%' }} />} />
							</div>
						</ShowIf>
						<Row style={{ textAlign: 'center' }}>
							<Col span={24} >
								<Button type="primary" style={s.load_more}>Load more</Button>
							</Col>
						</Row>
					</Col>
				</Row >
			</Content>
			<Footer style={s.footer}>
				Workclass © {moment().get('year')}
			</Footer>
		</Layout>
	);
};


export default IndexPage;
