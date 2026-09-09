using Application.Activities.Commands;
using Application.Activities.Queries;
using MediatR;
using Microsoft.AspNetCore.SignalR;

namespace API.SignalR;

public class CommentHub(IMediator mediator) : Hub //框架自带
{
    public async Task SendComment(AddComment.Command command) //使用中心Hub来创建评论
    {
        var comment = await mediator.Send(command);

        await Clients.Group(command.ActivityId).SendAsync("ReceiveComment",comment.Value); //
    }

    public override async Task OnConnectedAsync()  //输入override就可以看到可以重写的列表
    {
        //根据活动ID添加组，更新时发送到连接该组的所有客户端 通信通过websockets处理
        var httpContext = Context.GetHttpContext(); //获取http上下文

        var activityId = httpContext?.Request.Query["activityId"]; //使用可选链操作，防止上下文不可用，从查询参数获取（需要客户端将活动ID作为查询字符串上传）

        if(string.IsNullOrEmpty(activityId)) throw new HubException("No activity with this id");

        await Groups.AddToGroupAsync(Context.ConnectionId, activityId!); //使用Signal功能,添加到组

        var result = await mediator.Send(new GetComments.Query{ ActivityId = activityId!}); //获取评论列表

        await Clients.Caller.SendAsync("LoadComments",result.Value); //Caller已连接的用户，LoadComments为客户端要用到的方法名
    }
}