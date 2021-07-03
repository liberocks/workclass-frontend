import React from 'react';

import { Space, Collapse, Checkbox, Col, Form, Row, Grid, Radio } from 'antd';
import { s } from './style';

const { Panel } = Collapse;
const { useBreakpoint } = Grid;

export const Sidebar: React.FC = () => {
  const { md, lg, xl, xxl } = useBreakpoint()

  const sidebarSize = !md ? '95vw' : !lg ? '50vw' : !xl ? '70vw' : !xxl ? 200 : 200;

  return (
    <Space wrap>
      <Form>
        <Collapse expandIconPosition='right' defaultActiveKey={['job_category', 'employment_type', 'rank_by']} style={{ ...s.collapse, width: sidebarSize, }}>
          <Panel header="Job Category" key="job_category">
            <Form.Item>
              <Checkbox.Group>
                {[{ value: "job_admin", label: "Admin" },
                { value: "job_covid19", label: "Covid19" },
                { value: "job_customerservice", label: "Customer Service" },
                { value: "job_distributionshipping", label: "Distribution Shipping" },
                { value: "job_grocery", label: "Grocery" },
                { value: "job_hospitalityhotel", label: "Hospitality Hotel" },
                { value: "job_marketingsales", label: "Marketing Sales" },
                { value: "job_production", label: "Production" },
                { value: "job_restaurantfoodservice", label: "Restaurant Food Service" },
                { value: "job_retail", label: "Retail" },
                { value: "job_supplychain", label: "Supply Chain" },
                { value: "job_transportation", label: "Transportation" },
                { value: "job_warehouse", label: "Warehouse" },
                { value: "job_other", label: "Other" }].map(item => {
                  return <Row ><Col span={24}><Checkbox>{item.label}</Checkbox></Col></Row>
                })}
              </Checkbox.Group>
            </Form.Item>
          </Panel>

          <Panel header="Employment Type" key="employment_type">
            <Form.Item>
              <Checkbox.Group>
                {[{ value: "employ_adhoc", label: "Adhoc" },
                { value: "employ_contract", label: "Contract" },
                { value: "employ_fulltime", label: "Full-time" },
                { value: "employ_internship", label: "Internship" },
                { value: "employ_parttime", label: "Part-time" }].map(item => {
                  return <Row ><Col span={24}><Checkbox>{item.label}</Checkbox></Col></Row>
                })}
              </Checkbox.Group>
            </Form.Item>
          </Panel>
          <Panel header="Rank by" key="rank_by">
            <Form.Item>
              <Radio.Group value={"activated_date"}>
                {[{ value: "activated_date", label: "Activation date" },
                { value: "monthly_salary_median", label: "Monthly salary median" },
                ].map(item => {
                  return <Row ><Col span={24}><Radio value={item.value}>{item.label}</Radio></Col></Row>
                })}
              </Radio.Group>
            </Form.Item>
          </Panel>
        </Collapse>
      </Form>
    </Space>
  )
}

export default Sidebar