import { useParams } from "react-router";
import { useProfile } from "../../lib/hooks/useProfile";
import Box from "@mui/material/Box/Box";
import Typography from "@mui/material/Typography/Typography";
import Button from "@mui/material/Button/Button";
import Divider from "@mui/material/Divider/Divider";
import { useState } from "react";
import ProfileForm from "./form/ProfileForm";

export default function ProfileAbout() {
    const [isEditing, setIsEditing] = useState(false);
    const {id} = useParams();
    const {profile, isCurrentUser} = useProfile(id);

    return (
        <Box>
            <Box display='flex' justifyContent='space-between'>
                <Typography variant='h5' color='secondary'>About {profile?.displayName}</Typography>
                {
                    isCurrentUser && (
                        <Button onClick={() => setIsEditing(!isEditing)}>
                            {isEditing ? 'Cancel' : 'Edit profile'}
                        </Button>
                    )
                }

            </Box>
            <Divider sx={{ my: 2 }} />
            {
                !isEditing ? (
                    <Box sx={{ overflow: 'auto', maxHeight: 350 }}>
                        <Typography variant='body1' sx={{ whiteSpace: 'pre-wrap' }}>{profile?.bio || 'No description added yet'}</Typography>
                    </Box>) : (
                    <ProfileForm setIsEditing={setIsEditing} />
                )
            }
        </Box>
    )
}