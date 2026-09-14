using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Persistence;

namespace Application.Profiles.Commands;

public class FollowToggle
{
    public class Command : IRequest<Result<Unit>>
    {
        public required string TargetUserId { get; set; }  //要关注的用户
    }

    public class Handler(AppDbContext dbContext, IUserAccessor userAccessor) : IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var observe = await userAccessor.GetUserAsync();
            var target = await dbContext.Users.FindAsync([request.TargetUserId], cancellationToken);

            if (target == null) return Result<Unit>.Failure("Target user not found", 400);

            var following = await dbContext.UserFollowings.FindAsync([observe.Id,target.Id],cancellationToken);

            if( following == null) dbContext.UserFollowings.Add(new UserFollowing
            {
                ObserveId = observe.Id,
                TargetId = target.Id
            });
            else dbContext.UserFollowings.Remove(following);

            return await dbContext.SaveChangesAsync(cancellationToken) > 0 ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Problem updating following", 400);
        }
    }
}