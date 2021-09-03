namespace Application.Core
{
    // helper method to handle API errors on Application layer (in Application -> Activities -> Create,Delete etc...)
    public class Result<T>
    {
        public bool isSuccess { get; set; }
        public T Value { get; set; }
        public string Error { get; set; }
        public static Result<T> Success(T value) => new Result<T> { isSuccess = true, Value = value };
        public static Result<T> Failure(string error) => new Result<T> { isSuccess = false, Error = error };
    }
}