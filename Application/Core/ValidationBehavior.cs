using System;
using FluentValidation;
using MediatR;

namespace Application.Core;

public class ValicationBehavior<TRequest, TResponse>(IValidator<TRequest>? validator = null) : IPipelineBehavior<TRequest, TResponse> where TRequest : notnull
{
    public async Task<TResponse> Handle(TRequest request, RequestHandlerDelegate<TResponse> next, CancellationToken cancellationToken)
    {
        if(validator is null) return await next(cancellationToken);

        var valicationResult = await validator.ValidateAsync(request, cancellationToken);

        if(!valicationResult.IsValid)
        {
            throw new ValidationException(valicationResult.Errors);
        }

        return await next(cancellationToken);
    }
}