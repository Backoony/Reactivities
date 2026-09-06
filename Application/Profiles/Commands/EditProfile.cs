using System;
using Application.Core;
using Application.Interfaces;
using Application.Profiles.DTOs;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Profiles.Commands;

public class EditProfile
{   
    public class Commands : IRequest<Result<Unit>>
    {
        public required EditProfileDto Profile { get; set; }
    }

    public class Handler(AppDbContext dbContext, IUserAccessor userAccessor, IMapper mapper) : IRequestHandler<Commands, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Commands request, CancellationToken cancellationToken)
        {
            var user = await userAccessor.GetUserAsync();
            if(user == null) return Result<Unit>.Failure("Profile not found", 404);

            mapper.Map(request.Profile, user);

            var result = await dbContext.SaveChangesAsync(cancellationToken) > 0;

            return result ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Failed to update profile", 400);
        }
    }
}