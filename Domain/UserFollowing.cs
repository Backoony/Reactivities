namespace Domain;

public class UserFollowing
{
    public required string ObserveId { get; set; }
    public User Observe { get; set; } = null!; //Follower 
    public required  string TargetId { get; set; }
    public User Target { get; set; } = null!; //Followee
}