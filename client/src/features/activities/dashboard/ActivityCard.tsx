import { Box, Button, Card, CardActions, CardContent, Chip, Typography } from "@mui/material";
import { useActivities } from "../../../lib/hooks/useActivities";
import { Link } from "react-router";

type Props = {
  activity: Activity;
};

export default function ActivityCard({ activity }: Props) {
  const { deleteActivity } = useActivities();

  const handleDeleteActivity = async (id: string ) => {
    await deleteActivity.mutateAsync(id);
  }

  return (
    <Card sx = {{ borderRadius: 3 }}>
        <CardContent>
            <Typography variant="h5">{activity.title}</Typography>
            <Typography sx = {{ color: 'text.secondary' }}>{activity.date}</Typography>
            <Typography variant="body2">{activity.description}</Typography>
            <Typography variant="subtitle1">{activity.city} / {activity.venue}</Typography>        
        </CardContent>
        <CardActions sx = {{ display: 'flex', justifyContent: 'space-between', pb: 2 }}>
          <Chip label={activity.category} variant="outlined" />
          <Box display="flex" gap={1}>
            <Button component={Link} to={`/activities/${activity.id}`} size="medium" variant="contained">
                View
            </Button>
            <Button size="medium" variant="contained" color="error" onClick={() => handleDeleteActivity(activity.id)} disabled = { deleteActivity.isPending }>
                Delete
            </Button>
          </Box>           
        </CardActions>
    </Card>
  )
}
