using System;
using Application.Activities.DTOs;
using FluentValidation;

namespace Application.Activities.Validators;

public class BaseActivityValidator<T,TDto> : AbstractValidator<T> where TDto : BaseActivityDto
{
    public BaseActivityValidator(Func<T, TDto> selector)
    {
        RuleFor(x => selector(x).Title).NotEmpty().WithMessage("标题是必须的").MaximumLength(100).WithMessage("标题不能超过100个字符");
        RuleFor(x => selector(x).Description).NotEmpty().WithMessage("描述是必须的");
        RuleFor(x => selector(x).Category).NotEmpty().WithMessage("类别是必须的");
        RuleFor(x => selector(x).Date).GreaterThan(DateTime.UtcNow).WithMessage("日期必须是未来的");
        RuleFor(x => selector(x).City).NotEmpty().WithMessage("城市是必须的");
        RuleFor(x => selector(x).Venue).NotEmpty().WithMessage("地点是必须的");
        RuleFor(x => selector(x).Latitude).NotEmpty().WithMessage("Latitude is required").InclusiveBetween(-90,90).WithMessage("Latitude must be between -90 and 90");
        RuleFor(x => selector(x).Longitude).NotEmpty().WithMessage("Longitude is required").InclusiveBetween(-180,180).WithMessage("Longitude must be between -180 and 180");
    }
}