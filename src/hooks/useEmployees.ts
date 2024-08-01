import { useCallback, useState, useEffect } from "react";
import { Employee } from "../utils/types";
import { useCustomFetch } from "./useCustomFetch";
import { EmployeeResult } from "./types";

export function useEmployees(): EmployeeResult {
  const { fetchWithCache, loading: isFetching } = useCustomFetch();
  const [employees, setEmployees] = useState<Employee[] | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    const employeesData = await fetchWithCache<Employee[], object>("employees");
    setEmployees(employeesData);
    setLoading(false);
  }, [fetchWithCache]);

  const invalidateData = useCallback(() => {
    setEmployees(null);
  }, []);

  useEffect(() => {
    if (employees === null && !isFetching) {
      fetchAll();
    }
  }, [employees, isFetching, fetchAll]);

  return { data: employees, loading, fetchAll, invalidateData };
}
