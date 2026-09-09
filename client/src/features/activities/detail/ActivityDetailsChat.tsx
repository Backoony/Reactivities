import { Box, Typography, Card, CardContent, TextField, Avatar, CircularProgress } from "@mui/material";
import { Link, useParams } from "react-router";
import { useComments } from "../../../lib/hooks/useComments";
import { timeAgo } from "../../../lib/util/util";
import { useForm, type FieldValues } from "react-hook-form";
import { observer } from "mobx-react-lite";

export default observer(   //必须使用observer包裹组件，否则mobx的状态变化不会触发组件重新渲染
    function ActivityDetailsChat() {
        const { id } = useParams();
        const { commentStore } = useComments(id);
        const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm();

        const addComment = async (data: FieldValues) => {
            try {
                await commentStore.hubConnection?.invoke('SendComment', {
                    activityId: id,
                    body: data.body
                }); //调用SignalR的SendComment方法发送评论
                reset(); //重置表单
            } catch (error) {
                console.log(error);
            }
        }

        const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
            if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault();
                handleSubmit(addComment)();
            }
        }

        return (
            <>
                <Box
                    sx={{
                        textAlign: 'center',
                        bgcolor: 'primary.main',
                        color: 'white',
                        padding: 2
                    }}
                >
                    <Typography variant="h6">Chat about this event</Typography>
                </Box>
                <Card>
                    <CardContent>
                        <div>
                            <form>
                                <TextField
                                    {...register('body', { required: true })} //使用react-hook-form的register方法注册输入框
                                    variant="outlined"
                                    fullWidth
                                    multiline
                                    rows={2}
                                    placeholder="Enter your comment (Enter to submit, SHIFT + Enter for new line)"
                                    onKeyDown={handleKeyPress} //按下Enter键时触发handleKeyPress方法
                                    slotProps={{
                                        input: {  //slotProps.input是TextField的输入框的props
                                            endAdornment: isSubmitting ? (  //endAdornment是输入框的尾部装饰，isSubmitting是react-hook-form的状态，表示表单是否正在提交
                                                <CircularProgress size={24} color="inherit" />
                                            ) : null
                                        }
                                    }}
                                />
                            </form>
                        </div>

                        <Box sx={{ height: 400, overflow: 'auto', mt: 2 }}>
                            {/* 溢出设置为自动，即使有很多评论也会被限制在一个框内，并且有滚动条 */}
                            {commentStore.comments.map(comment => (
                                <Box sx={{ display: 'flex', my: 2 }} key={comment.id}>
                                    <Avatar src={comment.imageUrl} alt={'user image'} sx={{ mr: 2 }} />
                                    <Box display='flex' flexDirection='column'>
                                        <Box display='flex' alignItems='center' gap={3}>
                                            <Typography component={Link} to={`/profiles/${comment.userId}`} variant="subtitle1" sx={{ fontWeight: 'bold', textDecoration: 'none' }}>
                                                {comment.displayName}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                {timeAgo(comment.createdAt)}
                                            </Typography>
                                        </Box>
                                        <Typography sx={{ whiteSpace: 'pre-wrap' }}>{comment.body}</Typography>
                                    </Box>
                                </Box>
                            ))}

                        </Box>
                    </CardContent>
                </Card>
            </>
        )
    }

) 