import { getJobs } from "../../common/api";
import { message } from "antd";
import uniqBy from "lodash/uniqBy";
import { useState } from "react";

export const useQuery = ({ select = [] }: { select?: string[] }) => {
  const [loading, setLoading] = useState(true);

  const [jobs, setJobs] = useState<IDataJob[]>([]);
  const [metadata, setMetadata] = useState<IMetadata>({
    page: 0,
    page_size: 0,
    total: 0,
    total_item: 0,
    total_page: 0,
  });

  const [query, setQuery] = useState<IJobsFilter>({
    job_admin: null,
    job_covid19: null,
    job_customerservice: null,
    job_distributionshipping: null,
    job_grocery: null,
    job_hospitalityhotel: null,
    job_marketingsales: null,
    job_other: null,
    job_production: null,
    job_restaurantfoodservice: null,
    job_retail: null,
    job_supplychain: null,
    job_transportation: null,
    job_warehouse: null,
    employ_adhoc: null,
    employ_contract: null,
    employ_fulltime: null,
    employ_internship: null,
    employ_parttime: null,
    keyword: null,
    rank_by: null,
    select,
  });

  const loadJobs = async ({
    except = [],
    errorCallback = () => {
      message.error("Failed to load jobs, please try again later");
    },
  }: {
    errorCallback?: () => void;
    except?: number[];
  }) => {
    setLoading(true);
    try {
      const filters: IJobsFilter = {};

      for (const [k, v] of Object.entries(query)) {
        if (k.startsWith("job_") || k.startsWith("employ_")) {
          if (v === false) filters[k] = "0";
          if (v === true) filters[k] = "1";
        } else if (k === "select") {
          if (v.length > 0) filters[k] = v.join(",");
        } else if (v !== null && v !== "") {
          filters[k] = v;
        }
      }

      const data = await getJobs(filters);
      setJobs(
        uniqBy([...jobs, ...data.jobs], "job_id").filter(
          (item) => !except.includes(item.job_id)
        )
      );
      setMetadata(data.metadata);
    } catch {
      // We set the jobs to empty array in the case of failures
      setJobs([...jobs]);

      if (errorCallback) errorCallback();
    } finally {
      setLoading(false);
    }
  };

  const resetJobs = () => {
    setJobs([]);
  };

  return {
    resetJobs,
    loadJobs,
    loading,
    setLoading,
    jobs,
    setJobs,
    metadata,
    setMetadata,
    query,
    setQuery,
  };
};
