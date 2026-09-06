import { useForm } from "react-hook-form"
import { profileSchema, type ProfileSchema } from "../../../lib/schemas/profileSchema";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";
import { useProfile } from "../../../lib/hooks/useProfile";
import { useEffect } from "react";
import Box from "@mui/material/Box/Box";
import TextInput from "../../../app/shared/components/TextInput";
import Button from "@mui/material/Button/Button";
import { useParams } from "react-router";

type Props = {
    setIsEditing: (isEditing: boolean) => void;
}

export default function ProfileForm({ setIsEditing }: Props) {
    const { reset, control, handleSubmit, formState: { isValid, isSubmitting, isDirty } } = useForm<ProfileSchema>({
        mode: 'onTouched',
        resolver: zodResolver(profileSchema)
    });
    const {id} = useParams();

    const { updateProfile, profile, isCurrentUser } = useProfile(id);

    useEffect(() => {
        if(profile) reset({
            displayName: profile.displayName,
            bio: profile?.bio || ''
        })
    },[profile, reset]);

    const onSubmit = async (data: ProfileSchema) => {
        if(isCurrentUser && profile) {
            updateProfile.mutate({...profile, ...data},{
                onSuccess: () => {
                    setIsEditing(false);
                }
            })
        }
    };


    return (
        <Box component="form" display="flex" flexDirection="column" alignContent='center' gap={3} mt={3} onSubmit={handleSubmit(onSubmit)}>
            <TextInput label="Display Name" control={control} name="displayName" />
            <TextInput label="Description" control={control} name="bio" multiline rows={4} />
            <Button type="submit" variant="contained" color='success' disabled={updateProfile.isPending || !isValid || isSubmitting || !isDirty}>
                Submit
            </Button>
        </Box>
    )
}