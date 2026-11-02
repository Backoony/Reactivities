import { useNavigate, useSearchParams } from "react-router"
import { useAccount } from "../../lib/hooks/useAccount";
import { Typography } from "@mui/material";
import { toast } from "react-toastify";
import { resetPasswordSchema, type ResetPasswordSchema } from "../../lib/schemas/resetPasswordSchema";
import AccountFormWrapper from "./AccountFormWrapper";
import { zodResolver } from "@hookform/resolvers/zod";
import { LockOpen } from "@mui/icons-material";
import TextInput from "../../app/shared/components/TextInput";

export default function ResetPasswordForm() {
    const [params] = useSearchParams();
    const { resetPassword } = useAccount();
    const navigate = useNavigate();

    const email = params.get('email');
    const code = params.get('code');

    if (!email || !code) return <Typography>Invaild reset password code</Typography>

    const onSubmit = async (data: ResetPasswordSchema) => {
        try {
            await resetPassword.mutateAsync({ email, resetCode: code, newPassword: data.newPassword }, {
                onSuccess: () => {
                    toast.success('Password reset successful - you can login')
                    navigate('/login')
                }
            })
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <AccountFormWrapper<ResetPasswordSchema>
            title='Reset you password'
            submitButtonText="Reset password"
            onSubmit={onSubmit}
            resolver={zodResolver(resetPasswordSchema)}
            icon={<LockOpen fontSize="large" />}
        >
            <TextInput label="New Password" type="password" name="newPassword" />
            <TextInput label="Confirm Password" type="password" name="confirmPassword" />
        </AccountFormWrapper>
    )
}