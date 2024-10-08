using Microsoft.EntityFrameworkCore;
using HappyHolidays.Core;
using HappyHolidays.Infrastructure.interfaces;
using HappyHolidays.Infrastructure.implementations;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(connectionString));

builder.Services.AddScoped<IPackagesRepo, PackagesRepo>();
builder.Services.AddScoped<IContactUsRepo, ContactUsRepo>();

builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.Preserve;
});

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors((builder =>
{
    builder.WithOrigins("http://localhost:5173")
    .AllowAnyHeader()
    .AllowAnyMethod();
}));

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
