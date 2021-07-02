import React, { memo } from 'react';

import { Card } from 'antd';

import { JobCardProps } from './type';
import { s } from './style';

export const JobCard: React.FC<JobCardProps> = memo(props => {
	const { job } = props;

	return (
		<Card hoverable>
			<p style={s.title}>{job.title}</p>

			<p>{job.salary_to}</p>
			<p>{job.salary_from}</p>
			<p>{job.salary_period}</p>
			<p>{new Date(job.activation_date).toLocaleDateString()}</p>
		</Card>
	);
});

export default JobCard;
