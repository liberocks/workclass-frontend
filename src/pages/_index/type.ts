export interface SidebarProps {
  query: IJobsFilter;
  setQuery: (query: IJobsFilter) => void;
  reset: () => void;
}
