
using Bookstore.Data;
using Bookstore.Services;
using Bookstore.Utils;
using BookStore.Data;
using BookStore.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
// Add services to the container.

builder.Services.AddCors(p =>
{
    p.AddPolicy("corspolicy",
                      build =>
                      {
                          build.WithOrigins("*").AllowAnyMethod().AllowAnyHeader();
                      });
});

builder.Services.AddDbContext<BookShopContext>(option =>
    option.UseNpgsql(builder.Configuration.GetConnectionString("ConnectionStrings")));

builder.Services.AddScoped<AccountService>();
builder.Services.AddScoped<AddressService>();
builder.Services.AddScoped<BookService>();
builder.Services.AddScoped<CartService>();
builder.Services.AddScoped<CategoryService>();
builder.Services.AddScoped<FavoriteService>();
builder.Services.AddScoped<PaymentService>();


builder.Services.AddScoped<AccountRepository>();
builder.Services.AddScoped<AddressRepository>();
builder.Services.AddScoped<BookRepository>();
builder.Services.AddScoped<CategoryRepository>();
builder.Services.AddScoped<CartRepository>();
builder.Services.AddScoped<FavoriteRepository>();
builder.Services.AddScoped<PaymentRepository>();

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


app.UseHttpsRedirection();
app.UseCors("corspolicy");
app.UseAuthorization();

app.MapControllers();

app.Run();