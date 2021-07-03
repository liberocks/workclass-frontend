interface Stylesheet {
  [key: string]: React.CSSProperties | Record<string, unknown>;
}

// ==========================
// Request Types
// ==========================
interface IDefaultReturn {
  success: boolean;
}

interface IRequest {
  endpoint: string;
  headers?: Record<string, unknown>;
  params?: Record<string, unknown>;
  data?: Record<string, unknown>;
}

interface IEndpointJobs extends IDefaultReturn {
  jobs: IDataJob[];
  metadata: IMetadata;
}

interface IEndpointJob extends IDefaultReturn {
  job: IDataJob;
}

// ==========================
// Data Types
// ==========================
interface IJobCategory {
  job_admin: boolean | null;
  job_covid19: boolean | null;
  job_customerservice: boolean | null;
  job_distributionshipping: boolean | null;
  job_grocery: boolean | null;
  job_hospitalityhotel: boolean | null;
  job_marketingsales: boolean | null;
  job_other: boolean | null;
  job_production: boolean | null;
  job_restaurantfoodservice: boolean | null;
  job_retail: boolean | null;
  job_supplychain: boolean | null;
  job_transportation: boolean | null;
  job_warehouse: boolean | null;
}

interface IEmploymentType {
  employ_adhoc: boolean | null;
  employ_contract: boolean | null;
  employ_fulltime: boolean | null;
  employ_internship: boolean | null;
  employ_parttime: boolean | null;
}

interface IDataJob extends IJobCategory, IEmploymentType {
  job_id: number | string;
  title: string;
  activation_date: string;
  active: boolean;
  salary_from: number;
  salary_to: number;
  salary_period: TSalaryPeriod;
  company_name: string;
  description: string;
  featured: boolean;
  logo_url: string;
  monthly_salary_median: number;
  salary_median: number;
}

interface IMetadata {
  page: number;
  page_size: number;
  total: number;
  total_item: number;
  total_page: number;
}

// ==========================
// Others Types
// ==========================
interface IJobsFilter extends Partial<IJobCategory>, Partial<IEmploymentType> {
  page_size?: number;
  keyword?: string | null;
  rank_by?: string | null;
  page?: number | null;
  select?: string[] | string | null;
}

interface ICreateNewJob {
  title: string;
  salary_from: number;
  salary_to: number;
  salary_period: TSalaryPeriod;
}
