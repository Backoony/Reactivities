using System;
using Application.Profiles.Commands;
using Application.Profiles.DTOs;
using FluentValidation;

namespace Application.Profiles.Validators;

public class EditProfileValidator : AbstractValidator<EditProfile.Commands>
{
    public EditProfileValidator()
    {
        RuleFor(x => x.Profile.DisplayName).NotEmpty().WithMessage("姓名不可为空").MinimumLength(3).WithMessage("姓名不可低于3个字符");
    }
}