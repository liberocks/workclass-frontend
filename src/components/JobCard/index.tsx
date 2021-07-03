import React, { memo } from "react";


import { Card, Image, Button, Space, Tooltip, Grid, Row, Col, Badge } from "antd";

import moment from "moment";

import { FALLBACK_IMAGE } from "../../common/constant";
import JobTag from "../JobTag";

import { s } from "./style";
import { JobCardProps } from "./type";
const { useBreakpoint } = Grid;



export const JobCard: React.FC<JobCardProps> = memo(({ job }) => {
	const { md, lg } = useBreakpoint()

	const cardWidth = !md ? '95vw' : !lg ? 500 : 375;
	const titleWidth = !md ? '80vw' : !lg ? 425 : 300;

	const onClickApplyButton = (event) => {
		event.stopPropagation();
		window.location.href = 'https://workclass.co/apply'
	}

	const onClickMessageButton = (event) => {
		event.stopPropagation();
		window.location.href = 'https://t.me/workclasssgbot?start=XXX'
	}

	const onClickCard = () => {
		window.location.href = `/job/${job.job_id}`
	}

	return (
		<Card hoverable onClick={onClickCard} style={{ ...s.card, width: cardWidth }} actions={[
			<Button style={s.button} onClick={onClickMessageButton}>Messages</Button>,
			<Button style={s.button} type='primary' onClick={onClickApplyButton}>Apply Now</Button>,
		]} >
			<Row style={s.card_header}>
				<Col span={12}>
					<Image src={job.logo_url || "error"} style={s.image} preview={false} fallback={FALLBACK_IMAGE} />
				</Col>
				<Col span={12}>
					<p style={s.activation_date}>{moment(job.activation_date).fromNow()}</p></Col>
			</Row>

			<Tooltip title={job.title}>
				<p style={{ ...s.title, width: titleWidth }} > {job.title}</p>
			</Tooltip>
			<p style={s.company_name}>{job.company_name}</p>

			<p style={s.salary}>  ${job.salary_to} to ${job.salary_from} ({job.salary_period})</p>
			<JobTag job={job} showEmploySpecTag />
		</Card >
	);
});

export default JobCard;
