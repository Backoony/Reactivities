import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material"
import { Link } from "react-router"
import { formatDate } from "../../lib/util/util"

type Props = {
    userActivity: UserActivity
}

export default function UserActivityCard({ userActivity }: Props) {
    return (
        <Link to={`/activities/${userActivity.id}`} style={{textDecoration:'none'}}>
            <Card  elevation={4}>
                <CardMedia component='img' image={`/images/categoryImages/${userActivity.category}.jpg`} alt={`${userActivity.category} image`}  height='100' sx={{ objectFit: 'cover' }} />
                <CardContent>
                    <Box display='flex' flexDirection='column' gap={1}>
                        <Typography variant="h6" textAlign='center' mb={1}>{userActivity.title}</Typography>
                        <Typography variant="body2" textAlign='center'>{formatDate(userActivity.date)}</Typography>
                    </Box>
                </CardContent>

            </Card>
        </Link>
  )
}