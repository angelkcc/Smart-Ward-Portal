class AppError extends Error
{
    public status:"error"|"fail";
    public success:boolean;
    public details?:{message:string, path:string}[];
    constructor(public message:string, public statusCode:number, details?:{message:string, path:string}[])
    {
        super(message);
        this.statusCode=statusCode;
        this.details=details;

        this.status= String(statusCode).startsWith("4")?"fail":"error";
        this.success= false;
        Error.captureStackTrace(this,AppError);
    }
}
export default AppError;