using Microsoft.EntityFrameworkCore;
using ProjectCourse.Database;

var builder = WebApplication.CreateBuilder(args);

string connection = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<ApplicationContext>(options => options.UseNpgsql(connection));
builder.Services.AddControllers();
builder.Services.AddCors();

var app = builder.Build();

app.UseRouting();
app.UseHttpsRedirection();
app.UseCors(builder => {
    builder.WithHeaders().AllowAnyHeader();
    builder.WithOrigins("http://localhost:5173");
    builder.WithMethods().AllowAnyMethod();
});
app.UseEndpoints(endpoints => endpoints.MapControllers());

app.Run();
