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
}

interface IEndpointJob extends IDefaultReturn {
  job: IDataJob;
}

// ==========================
// Data Types
// ==========================
interface IDataJob {
  job_id: number | string;
  title: string;
  activation_date: string;
  active: boolean;
  salary_from: number;
  salary_to: number;
  salary_period: TSalaryPeriod;
  company_name: string;
  description: string;
  employ_adhoc: boolean;
  employ_contract: boolean;
  employ_fulltime: boolean;
  employ_internship: boolean;
  employ_parttime: boolean;
  featured: boolean;
  job_admin: boolean;
  job_covid19: boolean;
  job_customerservice: boolean;
  job_distributionshipping: boolean;
  job_grocery: boolean;
  job_hospitalityhotel: boolean;
  job_marketingsales: boolean;
  job_other: boolean;
  job_production: boolean;
  job_restaurantfoodservice: boolean;
  job_retail: boolean;
  job_supplychain: boolean;
  job_transportation: boolean;
  job_warehouse: boolean;
  logo_url: string;
  monthly_salary_median: number;

  salary_median: number;
}

// ==========================
// Others Types
// ==========================
interface IJobsFilter {
  pageSize?: number;
  keyword?: string;
}

interface ICreateNewJob {
  title: string;
  salary_from: number;
  salary_to: number;
  salary_period: TSalaryPeriod;
}
