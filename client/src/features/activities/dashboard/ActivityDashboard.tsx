import { Grid2 } from "@mui/material";
import ActivityList from "./ActivityList";
import ActivityFilters from "./ActivityFilters";


export default function ActivityDashboard() {
  return (
    <Grid2 container spacing={3}>
          <Grid2 size={8}>
              <ActivityList />
        </Grid2>
        <Grid2 size={4} sx={{ position:'sticky', top:112, alignSelf:'flex-start'}}>  
          {/* 位置粘性，顶部确切距离112，对齐自身属性值为弹性开始 */}
          <ActivityFilters />
        </Grid2>
    </Grid2>
  )
}
