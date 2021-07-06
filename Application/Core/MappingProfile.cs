using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // for edit class
            CreateMap<Activity,Activity>();
        }
    }
}