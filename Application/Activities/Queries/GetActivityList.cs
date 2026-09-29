using System;
using Application.Activities.DTOs;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;

namespace Application.Activities.Queries;

public class GetActivityList
{


    public class Query : IRequest<Result<PagedList<ActivityDto, DateTime?>>>
    {
        public required ActivityParams Params { set; get;}        
    }

    public class Handler(AppDbContext context, ILogger<GetActivityList> logger, IMapper mapper, IUserAccessor userAccessor) : IRequestHandler<Query, Result<PagedList<ActivityDto,DateTime?>>>
    {

        public async Task<Result<PagedList<ActivityDto, DateTime?>>> Handle(Query request, CancellationToken cancellationToken)
        {
            try //cancellationToken使用方法演示
            {
                for(int i = 0; i < 0; i++)
                {
                    cancellationToken.ThrowIfCancellationRequested();
                    await Task.Delay(1000, cancellationToken);
                    logger.LogInformation($"Task {i + 1} completed.");
                }
            }
            catch (Exception)
            {
                logger.LogInformation($"Task was cancelled.");
            }

            var query = context.Activities
                .OrderBy(x => x.Date)
                .Where(x => x.Date >= (request.Params.Cursor ?? request.Params.StartDate))
                .AsQueryable();  //创建可查询变量

            if (!string.IsNullOrEmpty(request.Params.Filter))
            {
                query = request.Params.Filter switch
                {
                    "isGoing" => query.Where(x => x.Attendees.Any(a => a.UserId == userAccessor.GetUserId())),
                    "isHost" => query.Where(x => x.Attendees.Any(a => a.IsHost && a.UserId == userAccessor.GetUserId())),
                    _ => query
                };
            }

            var projectedActivities =  query.ProjectTo<ActivityDto>(mapper.ConfigurationProvider, new { currentUserId = userAccessor.GetUserId()});

            var activities = await projectedActivities
                .Take(request.Params.PageSize + 1)   //+1为了多取数据（4个）判断是否存在下一页   
                .ToListAsync(cancellationToken);
            
            DateTime? nextCursor = null;

            if (activities.Count > request.Params.PageSize) //满足条件证明存在下一页可返回
            {
                nextCursor = activities.Last().Date;  //存储最后一个数据作为游标
                activities.RemoveAt(activities.Count -1);  //移除最后一个数据
            }

            return Result<PagedList<ActivityDto,DateTime?>>.Success(
                new PagedList<ActivityDto, DateTime?>
                {
                    Items = activities,
                    NextCursor = nextCursor
                }
            );
        }
    }
}
