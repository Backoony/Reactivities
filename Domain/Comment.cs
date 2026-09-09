
namespace Domain;
public class Comment
{
    public string Id { set; get;} = Guid.NewGuid().ToString();
    public required string Body { get; set; } 
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    //nav props

    public required string UserId { get; set; }
    public User User { get; set; } = null!; //空包容运算符,压制可空警告，运行时无操作,不会影响迁移
    
    public required string ActivityId { get; set; }
    public Activity Activity { get; set; } = null!;
}