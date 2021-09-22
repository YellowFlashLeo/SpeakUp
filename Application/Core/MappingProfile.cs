using System.Linq;
using Application.Activities;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // for edit class
            // From  To
            CreateMap<Activity, Activity>();
            // We want to return ActivityDto instead of Activity, because this gives us an opportunity to:
            // 1) add Ishost bool prop
            // 2) Add ICollection<Profile> Attendees so that we can describe each attendee
            CreateMap<Activity, ActivityDto>()
            // To From
            .ForMember(d => d.HostUsername, o => o.MapFrom(s => s.Attendees.FirstOrDefault(x => x.IsHost).AppUser.UserName));

            CreateMap<ActivityAttendee, Profiles.Profile>()
            .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.AppUser.DisplayName))
            .ForMember(d => d.Username, o => o.MapFrom(s => s.AppUser.UserName))
            .ForMember(d => d.Bio, o => o.MapFrom(s => s.AppUser.Bio));
        }
    }
}