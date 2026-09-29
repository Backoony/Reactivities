using Application.Core;
using Application.Profiles.DTOs;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles.Queries;

public class GetUserActivities
{
    public class Query : IRequest<Result<List<UserActivityDto>>>
    {
        public required string UserId { get; set; }
        public required string Filter { get; set; } = "future";
    }

    public class Handler(AppDbContext dbContext, IMapper mapper) : IRequestHandler<Query, Result<List<UserActivityDto>>>
    {
        public async Task<Result<List<UserActivityDto>>> Handle(Query request, CancellationToken cancellationToken)
        {
            var query = dbContext.ActivityAttendees
                .Where(a=>a.UserId == request.UserId)
                .OrderBy(a=>a.Activity.Date)
                .Select(x=>x.Activity)
                .AsQueryable();
            if (!string.IsNullOrEmpty(request.Filter))
            {
                query = request.Filter switch
                {
                    "past" => query.Where(x => x.Date < DateTime.UtcNow),
                    "future" => query.Where(x => x.Date >= DateTime.UtcNow),
                    "hosting" => query.Where(x => x.Attendees.Any(x => x.IsHost)),
                    _ => query
                };
            }

            var userActivities = await query.ProjectTo<UserActivityDto>(mapper.ConfigurationProvider).ToListAsync(cancellationToken);

            return userActivities != null ? Result<List<UserActivityDto>>.Success(userActivities) : Result<List<UserActivityDto>>.Failure("Activities not found", 404);
        }
    }
}