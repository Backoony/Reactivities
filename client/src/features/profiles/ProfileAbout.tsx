import { useParams } from "react-router";
import { useProfile } from "../../lib/hooks/useProfile";
import Box from "@mui/material/Box/Box";
import Typography from "@mui/material/Typography/Typography";
import Button from "@mui/material/Button/Button";
import Divider from "@mui/material/Divider/Divider";

export default function ProfileAbout() {
    const {id} = useParams();
    const {profile} = useProfile(id);

    return (
        <Box>
            <Box display='flex' justifyContent='space-between'>
                <Typography variant='h5'>About {profile?.displayName}</Typography>
                <Button>Edit profile</Button>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ overflow:'auto', maxHeight: 350}}>
                <Typography variant='body1' sx={{ whiteSpace: 'pre-wrap' }}>{profile?.bio || 'No description added yet'}</Typography>
            </Box>
        </Box>
    )
}