namespace Application.Core;

public class PagedList<T, TCursor> //TCursor为游标，T类型的分页游标，例如活动类型按照日期游标分页
{
    public List<T> Items { get; set; } = []; //用于存储项目
    public TCursor? NextCursor { get; set; } //下一个游标，表示获取下一组数据的起始位置
    
}