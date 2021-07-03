import React, { memo } from "react";

import { navigate } from 'gatsby';
import { Card, Image, Button, Tooltip, Grid, Row, Col } from "antd";

import moment from "moment";

import { ShowIf } from "../../components/ShowIf";
import { FALLBACK_IMAGE } from "../../common/constant";
import JobTag from "../JobTag";

import { s } from "./style";
import { JobCardProps } from "./type";

const { useBreakpoint } = Grid;

export const JobCard: React.FC<JobCardProps> = memo(({ job }) => {
	const { md, lg } = useBreakpoint()

	const cardWidth = !md ? '95vw' : !lg ? 500 : 325;
	const titleWidth = !md ? '80vw' : !lg ? 425 : 275;

	const onClickApplyButton = (event) => {
		event.stopPropagation();
		window.location.href = 'https://workclass.co/apply'
	}

	const onClickCard = () => {
		navigate(`/job/${job.job_id}`);
	}

	return (
		<Card hoverable onClick={onClickCard} style={{ ...s.card, width: cardWidth }} actions={[
			<Button style={s.button}>Details</Button>,
			<Button style={s.button} type='primary' onClick={onClickApplyButton}>Apply Now</Button>,
		]} >
			<Row style={s.card_header}>
				<Col span={12}>
					<Image src={job.logo_url || "error"} style={s.image} preview={false} fallback={FALLBACK_IMAGE} />
				</Col>
				<Col span={12}>
					<p style={s.activation_date}>{moment(job.activation_date).fromNow()}</p>
				</Col>
			</Row>

			<p style={s.company_name}>{job.company_name}</p>
			<Tooltip title={job.title}>
				<p style={{ ...s.title, width: titleWidth }} > {job.title}</p>
			</Tooltip>

			<Tooltip title={`approx $${job.monthly_salary_median} monthly`}>
				<ShowIf condition={!!job.salary_from && !job.salary_to}>
					<p style={s.salary}>${job.salary_from} ({job.salary_period})</p>
				</ShowIf>
				<ShowIf condition={!job.salary_from && !!job.salary_to}>
					<p style={s.salary}>${job.salary_to} ({job.salary_period})</p>
				</ShowIf>
				<ShowIf condition={!!job.salary_from && !!job.salary_to}>
					<p style={s.salary}>${job.salary_from} to ${job.salary_to} ({job.salary_period})</p>
				</ShowIf>
			</Tooltip>
			<JobTag job={job} showEmploymentTypeTag />
		</Card >
	);
});

export default JobCard;
