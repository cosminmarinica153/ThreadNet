using AutoMapper;
using backend.Dto;
using backend.Models;

namespace backend.Helpers
{
    public class MappingProfiles: Profile
    {
        public MappingProfiles()
        {
            CreateMap<User, UserDto>();
            CreateMap<Category, CategoryDto>();
            CreateMap<ThreadComponent, ThreadDto>();
            CreateMap<Comment, CommentDto>();
            CreateMap<CommentReply, CommentReplyDto>();

            CreateMap<UserDto, User>();
            CreateMap<CategoryDto, Category>();
            CreateMap<ThreadDto, ThreadComponent>();
            CreateMap<CommentDto, Comment>();
            CreateMap<CommentReplyDto, CommentReply>();

            CreateMap<Comment, UserCommentDto>();
            CreateMap<CommentReply, UserCommentDto>()
                .ForMember(dest => dest.Thread, opt => opt.MapFrom(src => src.Comment.Thread));

            CreateMap<CommentInteractions, UserCommentInteractions>();
            CreateMap<CommentReplyInteractions, UserCommentInteractions>();

            CreateMap<CreateUserDto, User>();
            CreateMap<CreateCategoryDto, Category>();
            CreateMap<CreateThreadDto, ThreadComponent>();
            CreateMap<CreateCommentDto, Comment>();
            CreateMap<CreateCommentReplyDto, CommentReply>();
            CreateMap<FollowerDto, Follower>();
            CreateMap<FavouriteCategoyDto, FavouriteCategory>();
            CreateMap<FavouriteThreadDto, FavouriteThread>();

            CreateMap<VoteDto, VoteThread>()
                .ForMember(dest => dest.ThreadId, opt => opt.MapFrom(src => src.ContentId));
            CreateMap<VoteDto, VoteComment>()
                .ForMember(dest => dest.CommentId, opt => opt.MapFrom(src => src.ContentId)); ;
            CreateMap<VoteDto, VoteCommentReply>()
                .ForMember(dest => dest.CommentReplyId, opt => opt.MapFrom(src => src.ContentId)); ;

            CreateMap<object, Follower>();
            CreateMap<object, VoteThread>();
            CreateMap<object, VoteComment>();
            CreateMap<object, VoteCommentReply>();
            CreateMap<object, FavouriteCategory>();
            CreateMap<object, FavouriteThread>();

            CreateMap<User, ContentUserDto>();

            CreateMap<ThreadComponent, NoRFRThreadDto>();
            CreateMap<Comment, NoRFRCommentDto>();
            CreateMap<CommentReply, NoRFRCommentReplyDto>();

        }
    }
}
