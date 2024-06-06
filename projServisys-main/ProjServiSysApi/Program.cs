using Microsoft.EntityFrameworkCore;
using ProjServiSys.Persistence;
using ProjServiSys.Application;
using ProjServiSys.Domain.Identity;
using ProjServiSys.Domain;
using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.OpenApi.Models;
using ProjServiSys.Application.Contratos;
using ProjServiSys.Persistence.Contratos;
using System.Text.Json.Serialization;
using Swashbuckle.AspNetCore.SwaggerGen;
using Microsoft.OpenApi.Any;
using System.Text.RegularExpressions;


var builder = WebApplication.CreateBuilder(args);


// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle

builder.Services.AddIdentityCore<User>(options =>
{
    options.Password.RequireDigit = false;
    options.Password.RequireNonAlphanumeric = false;
    options.Password.RequireLowercase = false;
    options.Password.RequireUppercase = false;
    options.Password.RequiredLength = 4;
})
.AddRoles<Role>()
.AddRoleManager<RoleManager<Role>>()
.AddSignInManager<SignInManager<User>>()
.AddRoleValidator<RoleValidator<Role>>()
.AddEntityFrameworkStores<DbServiSysApiContext>()
.AddDefaultTokenProviders();


builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(option =>
{
    option.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["TokenKey"])),
        ValidateIssuer = false,
        ValidateAudience = false
    };
});


builder.Services.AddAuthorization(options =>{
    options.AddPolicy("SolicitantePolicy", policy => policy.RequireRole("Solicitante"));
    options.AddPolicy("CoordenadorTIPolicy", policy => policy.RequireRole("Coordenador_TI"));
    options.AddPolicy("tecnicoPolicy", policy => policy.RequireRole("Tecnico"));
    options.AddPolicy("AdminPolicy", policy => policy.RequireRole("Administrador"));
});


builder.Services.AddControllers()
    .AddJsonOptions(options => { options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles; 
        options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter()); });

builder.Services.AddCors();
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

builder.Services.AddScoped<IOrdemServicoService, OrdemServicoService>();
builder.Services.AddScoped<IOrdemServicoPersist, OrdemServicoPersist>();
builder.Services.AddScoped<ILancamentoService, LancamentoService>();
builder.Services.AddScoped<ILancamentoPersist, LancamentoPersist>();
builder.Services.AddScoped<IGeralPersist, GeralPersist>();

builder.Services.AddScoped<IUserPersist, UserPersist>();
builder.Services.AddScoped<ITokenService, TokenService>();
builder.Services.AddScoped<IAccountService, AccountService>();





// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen( options =>
{
    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = @"JWT Authorization header usano Bearer. Entre com 'Bearer' [espaço] então coloque seu token.
                        Exemplo: 'Bearer 12345abcdef'",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer"
    });

    options.AddSecurityRequirement(new OpenApiSecurityRequirement()
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                },
                Scheme = "oauth2",
                Name = "Bearer",
                In = ParameterLocation.Header
            },
            new List<string>()
        }
    });

    options.SchemaFilter<EnumSchemaFilter>();
});

builder.Services.AddDbContext<DbServiSysApiContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});
builder.Services.AddApplicationInsightsTelemetry();

var app = builder.Build();


app.UseSwagger();
app.UseSwaggerUI();


app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.UseCors(x => x.AllowAnyHeader()
                 .AllowAnyMethod()
                 .AllowAnyOrigin());

app.MapControllers();

app.Run();


public class EnumSchemaFilter : ISchemaFilter
{
    public void Apply(OpenApiSchema schema, SchemaFilterContext context)
    {
        if (context.Type.IsEnum)
        {
            schema.Type = "string";
            schema.Enum = Enum.GetNames(context.Type)
                .Select(name => new OpenApiString(name))
                .Cast<IOpenApiAny>()
                .ToList();
        }
    }

}
