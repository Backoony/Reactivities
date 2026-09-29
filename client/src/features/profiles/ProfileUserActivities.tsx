import { useParams } from "react-router"
import { useProfile } from "../../lib/hooks/useProfile";
import { Box, Grid2, Typography } from "@mui/material";
import UserActivityCard from "./UserActivityCard";

type Props = {
    activeTab: number
}

export default function ProfileUserActivities({ activeTab }: Props) {
    const { id } = useParams();
    const filter = activeTab === 0 ? 'future' : activeTab === 1 ? 'past' : 'hosting';
    const { userActivities, loadingUserActivities } = useProfile(id, undefined, filter);

    if(loadingUserActivities) return <Typography>Loading events</Typography>
    if(!userActivities) return <Typography>No event found for this user</Typography>

    return (
        <Grid2 container spacing={2} sx={{ marginTop: 2, height: 400, overflow: 'auto' }}>
            {userActivities.map((userActivity) => (
                <Grid2 size={2} key={userActivity.id}>
                    <UserActivityCard  userActivity={userActivity} />
                </Grid2>
            ))}
        </Grid2>
    )
}