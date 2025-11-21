import { useQuery } from "react-query"
import DashboardWrapper, { type DashboardProps } from "./dashboard-wrapper"
import { fetchApi } from "../services/fetch-api"

interface FacebookDashboardProps extends DashboardProps {
}

const FacebookDashboard = ({search}: FacebookDashboardProps) => {
  const {isSuccess, isLoading, isError} = useQuery(["facebook", search],{
    queryFn: () => fetchApi("facebook", search),
    refetchOnWindowFocus: false
  })
  return (
    <DashboardWrapper title="Facebook" isError = {isError} isLoading = {isLoading} isSuccess = {isSuccess}>
      
    </DashboardWrapper>
  )
}

export default FacebookDashboard