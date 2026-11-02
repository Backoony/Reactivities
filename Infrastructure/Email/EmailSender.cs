using Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Resend;

namespace Infrastructure.Email;

public class EmailSender(IResend resend, IConfiguration configuration) : IEmailSender<User>
{
    public async Task SendConfirmationLinkAsync(User user, string email, string confirmationLink)
    {
        var subject = "Confirm your email address";
        var body = $@"
            HI {user.DisplayName},Please confirm your email by clicking the link below.{confirmationLink}
            Click here to verify email.Thanks!
        ";

        await SendMailAsync(email, subject, body);
    }

    private async Task SendMailAsync(string email, string subject, string body)
    {
        var message = new EmailMessage
        {
            From = "whatever@resend.dev",
            Subject = subject,
            HtmlBody = body
        };
        message.To.Add(email);

        Console.WriteLine(message.HtmlBody);

        await resend.EmailSendAsync(message);

        // await Task.CompletedTask;
    }

    public async Task SendPasswordResetCodeAsync(User user, string email, string resetCode)
    {
        var subject = "Reset your password";
        var body = $@"
            HI {user.DisplayName},Please confirm your email by clicking the link below.
            <a href='{configuration["ClientAppUrl"]}/reset-password?email={email}&code={resetCode}' >
            Click here to reset.</a>
            If you did not request this, you can ignore this email
        ";

        await SendMailAsync(email, subject, body);
    }

    public Task SendPasswordResetLinkAsync(User user, string email, string resetLink)
    {
        throw new NotImplementedException();
    }
}