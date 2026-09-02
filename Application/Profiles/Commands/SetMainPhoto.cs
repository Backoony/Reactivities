using System;
using Application.Core;
using Application.Interfaces;
using MediatR;
using Persistence;

namespace Application.Profiles.Commands;

public class SetMainPhoto
{
    public class Command : IRequest<Result<Unit>>
    {
        public required string PhotoId { get; set; }
    }

    public class Handler(AppDbContext dbContext, IUserAccessor userAccessor) : IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var user =  await userAccessor.GetUserWithPhotosAsync();

            var photo = user.Photos.FirstOrDefault(x => x.Id == request.PhotoId);

            if(photo == null) return Result<Unit>.Failure("Cannot find photo",400);

            user.ImageUrl = photo.Url;

            var result = await dbContext.SaveChangesAsync(cancellationToken) >0; //把已经是主图的照片重复设置为主图，数据库没有改变值，SaveChange不会返回大于0，会报Failure，但是前端会限制发生此操作

            return result ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Problem seting photo",400);
        }
    }
}