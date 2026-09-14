using System;
using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Persistence;

public class AppDbContext(DbContextOptions options) : IdentityDbContext<User>(options) //调用基类构造函数,如果基类没有无参构造函数，子类构造必须显式写base(xxx)把参数传给基类构造
{
    public required DbSet<Activity> Activities { get; set; }

    public required DbSet<ActivityAttendee> ActivityAttendees { get; set; }

    public required DbSet<Photo> Photos { get; set; }

    public required DbSet<Comment> Comments { get; set; }

    public required DbSet<UserFollowing> UserFollowings { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);    //调用基类的重写方法当父类的 ConfigureConventions 里面写了全局配置，子类又重写了这个方法。如果你希望保留父类里面定义的约定规则，就必须手动调用

        builder.Entity<ActivityAttendee>(x => x.HasKey(a => new { a.ActivityId, a.UserId }));

        builder.Entity<ActivityAttendee>().HasOne(x => x.User).WithMany(x => x.Activities).HasForeignKey(x => x.UserId);

        builder.Entity<ActivityAttendee>().HasOne(x => x.Activity).WithMany(x => x.Attendees).HasForeignKey(x => x.ActivityId);

        builder.Entity<UserFollowing>(x =>
        {
            x.HasKey(k => new { k.ObserveId, k.TargetId }); //设置主键
            x.HasOne(o => o.Observe).WithMany(f => f.Followings).HasForeignKey(o => o.ObserveId).OnDelete(DeleteBehavior.Cascade);  //配置一对多关系
            x.HasOne(o => o.Target).WithMany(f => f.Followers).HasForeignKey(o => o.TargetId).OnDelete(DeleteBehavior.Cascade); //配置一对多关系
        });

        var dateTimeConverter = new ValueConverter<DateTime,DateTime>(
            v => v.ToUniversalTime(),  //入库转换，转换为世界协调世界
            v => DateTime.SpecifyKind(v, DateTimeKind.Utc)  //读库转换  告诉读出来的时间为世界协调时间，打上标记
        );

        foreach (var entityType in builder.Model.GetEntityTypes()) //拿到当前模型所有实体元数据
        {
            foreach (var property in entityType.GetProperties())  //实体的所有属性元数据
            {
                if (property.ClrType == typeof(DateTime))    //属性的clr类型
                {
                    property.SetValueConverter(dateTimeConverter);   //给属性附值转换器
                }
            }
        }

        //可以通过override ConfigureConventions
    }

    //在解决方案运行
    //dotnet ef migrations add CommentEntityAdded -p Persistence -s API
    //命令    添加迁移          迁移名称            依赖项目        运行项目
    //dotnet ef database drop -p Persistence -s API 删除数据库
    
}
