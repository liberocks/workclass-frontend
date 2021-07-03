import React, { useEffect, useState } from 'react';

import { LoadingOutlined } from '@ant-design/icons';
import { Col, message, Row, Spin, Typography, Grid, Space, Checkbox, Form, Menu, Input, Button, Image, Layout } from 'antd';



import { getJobs } from '../../common/api';
import JobCard from '../../components/JobCard';
import { s } from './style';
import { Sidebar } from './Sidebar'
import moment from 'moment';

const { useBreakpoint } = Grid
const { Search } = Input;
const { Header, Footer, Sider, Content } = Layout;


const IndexPage: React.FC = () => {
	const [loading, setLoading] = useState(false);
	const [jobs, setJobs] = useState<IDataJob[]>([]);
	const { md, lg, } = useBreakpoint()

	const containerPadding = !md ? 0 : !lg ? 25 : 50;
	const containerWidth = !md ? '95vw' : !lg ? '90vw' : '82.5vw';
	const searchWidth = !md ? '95vw' : !lg ? '85vw' : '75vw';


	useEffect(() => {
		/**
		 * On load, we fetch newest jobs
		 */

		const loadJobs = async () => {
			setLoading(true);
			try {
				const data = await getJobs();
				setJobs(data.jobs);
			} catch {
				// We set the jobs to empty array in the case of failures
				setJobs([]);
				message.error('Failed to load jobs, please try again later');
			} finally {
				setLoading(false);
			}
		};

		loadJobs();
	}, []);

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

					{loading && (
						<Col span={24}>
							<Row justify="center">
								<Spin indicator={<LoadingOutlined style={{ fontSize: 50 }} />} />
							</Row>
						</Col>
					)}

					<Col md={24} lg={24} xl={4} style={s.sidebar_container}>
						<Sidebar />
					</Col>
					<Col md={24} lg={20} >
						<Space wrap size={[16, 16]} style={s.card_space} >
							{jobs.map(job => (
								<JobCard job={job} key={job.job_id} />
							))}
						</Space>
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
