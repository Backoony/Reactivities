using System;
using Application.Activities.DTOs;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;

namespace Application.Activities.Queries;

public class GetActivityList
{
    public class Query : IRequest<List<ActivityDto>> {}

    public class Handler(AppDbContext context, ILogger<GetActivityList> logger, IMapper mapper, IUserAccessor userAccessor) : IRequestHandler<Query, List<ActivityDto>>
    {

        public async Task<List<ActivityDto>> Handle(Query request, CancellationToken cancellationToken)
        {
            try
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

            return await context.Activities.ProjectTo<ActivityDto>(mapper.ConfigurationProvider, new { currentUserId = userAccessor.GetUserId()}).ToListAsync(cancellationToken);
        }
    }
}
