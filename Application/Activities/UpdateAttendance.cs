using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class UpdateAttendance
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _context = context;
                _userAccessor = userAccessor;
            }
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                // So first we get activity by requested id and we include icollection of attendees there aswell
                var activity = await _context.Activities
                         .Include(a => a.Attendees)
                         .ThenInclude(u => u.AppUser)
                         .FirstOrDefaultAsync(x => x.Id == request.Id);

                if (activity == null) return null;
                var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUserName());

                if (user == null) return null;

                var hostUserName = activity.Attendees.FirstOrDefault(x => x.IsHost)?.AppUser?.UserName;

                var attendance = activity.Attendees.FirstOrDefault(x => x.AppUser.UserName == user.UserName);

                // the user who is making this request is the host of activity
                if (attendance != null && hostUserName == user.UserName)
                    activity.IsCancelled = !activity.IsCancelled;

                // normal user(attendee) who isnt host of the activity
                if (attendance != null && hostUserName != user.UserName)
                    activity.Attendees.Remove(attendance);

                if (attendance == null)
                {
                    attendance = new ActivityAttendee
                    {
                        AppUser = user,
                        Activity = activity,
                        IsHost = false
                    };

                    activity.Attendees.Add(attendance);
                }

                var result = await _context.SaveChangesAsync() > 0;
                return result ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Probme updating attendance");

            }
        }
    }
}