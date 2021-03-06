using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class List
    {
        public class Query : IRequest<Result<List<ActivityDto>>> { }
        public class Handler : IRequestHandler<Query, Result<List<ActivityDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<List<ActivityDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                // This is way with Eager loading and it makes sql query too noisy

                // var activities = await _context.Activities
                // .Include(a => a.Attendees)   // to get joinTable
                // .ThenInclude(u => u.AppUser)   // to get related entities to Attendees
                // .ToListAsync(cancellationToken);

                // // .Map<ap where to> (from where)
                // var activitiesToReturn = _mapper.Map<List<ActivityDto>>(activities);

                // Much more efficient an dprofessional approach is to use AutoMapper.ProjectTo
                // it will simply do the mapping based on provided rules in MappingProfile

                var activities = await _context.Activities
                .ProjectTo<ActivityDto>(_mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken);
                return Result<List<ActivityDto>>.Success(activities);
            }
        }
    }
}