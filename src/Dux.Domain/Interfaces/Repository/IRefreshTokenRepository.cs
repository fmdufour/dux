namespace Dux.Domain.Interfaces
{
    public interface IRefreshTokenRepository : IGenericRepository<RefreshToken>
    {
        RefreshToken GetRefreshToken(string id);
        RefreshToken GetBySubjectAndId(string subject, string id);
    }
}