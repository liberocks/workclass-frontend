import React, { useEffect, useState } from 'react';

import { LoadingOutlined } from '@ant-design/icons';

import { Col, message, Row, Spin, Typography, Grid, Space } from 'antd';

import { getJobs } from '../../common/api';
import JobCard from '../../components/JobCard';
import { s } from './style';

const { useBreakpoint } = Grid

const IndexPage: React.FC = () => {
	const [loading, setLoading] = useState(false);
	const [jobs, setJobs] = useState<IDataJob[]>([]);
	const { md, lg } = useBreakpoint()

	const containerPadding = !md ? 0 : !lg ? 50 : 100;

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
		<Row justify="center" style={{ ...s.container, padding: `0 ${containerPadding}px` }}>
			<Col span={24}>
				<Typography.Title style={s.title}>Jobs</Typography.Title>
			</Col>

			{loading && (
				<Col span={24}>
					<Row justify="center">
						<Spin indicator={<LoadingOutlined style={{ fontSize: 50 }} />} />
					</Row>
				</Col>
			)}

			<Col md={0} lg={6} style={{ background: 'blue' }}>
				<Row></Row>
			</Col>
			<Col md={24} lg={18} >
				<Space wrap size={[16, 16]} style={s.card_space} >
					{jobs.map(job => (
						<JobCard job={job} key={job.job_id} />
					))}
				</Space>
			</Col>

		</Row >

	);
};


export default IndexPage;
