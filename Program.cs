using DogWalker.Models;
using DogWalker.Models.DTOs;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
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

List<City> cities = new List<City>
{
    new City { Id = 1, Name = "Wano" },
    new City { Id = 2, Name = "Dressrosa" },
    new City { Id = 3, Name = "Whole Cake Island" },
    new City { Id = 4, Name = "Alabasta" },
    new City { Id = 5, Name = "Logue Town" },
};

List<Walker> walkers = new List<Walker>
{
    new Walker { Id = 1, Name = "Monkey D. Garp" },
    new Walker { Id = 2, Name = "Gol D. Roger" },
    new Walker { Id = 3, Name = "Silvers Rayleigh" },
    new Walker { Id = 4, Name = "Scopper Gaban" },
    new Walker { Id = 5, Name = "Edward Newgate" },
};

List<WalkerCity> walkerCities = new List<WalkerCity>
{
    new WalkerCity { Id = 1,  WalkerId = 1, CityId = 1 }, 
    new WalkerCity { Id = 2,  WalkerId = 1, CityId = 3 }, 
    new WalkerCity { Id = 3,  WalkerId = 2, CityId = 1 }, 
    new WalkerCity { Id = 4,  WalkerId = 2, CityId = 2 }, 
    new WalkerCity { Id = 5,  WalkerId = 3, CityId = 2 }, 
    new WalkerCity { Id = 6,  WalkerId = 3, CityId = 4 }, 
    new WalkerCity { Id = 7,  WalkerId = 4, CityId = 3 }, 
    new WalkerCity { Id = 8,  WalkerId = 4, CityId = 5 }, 
    new WalkerCity { Id = 9,  WalkerId = 5, CityId = 1 }, 
    new WalkerCity { Id = 10, WalkerId = 5, CityId = 4 }, 
};

List<Dog> dogs = new List<Dog>
{
    new Dog { Id = 1,  Name = "Luffy",  CityId = 1, WalkerId = 1 },
    new Dog { Id = 2,  Name = "Zoro",    CityId = 1, WalkerId = 2 }, 
    new Dog { Id = 3,  Name = "Sanji", CityId = 2, WalkerId = 3 }, 
    new Dog { Id = 4,  Name = "Nami",    CityId = 3, WalkerId = 4 }, 
    new Dog { Id = 5,  Name = "Chopper",    CityId = 1, WalkerId = 5 }, 
    new Dog { Id = 6,  Name = "Nico Robin",    CityId = 4, WalkerId = null }, 
    new Dog { Id = 7,  Name = "Franky",   CityId = 2, WalkerId = null }, 
    new Dog { Id = 8,  Name = "Brook",    CityId = 3, WalkerId = null }, 
    new Dog { Id = 9,  Name = "Jibe",  CityId = 5, WalkerId = null }, 
    new Dog { Id = 10, Name = "Usopp",   CityId = 4, WalkerId = 3  }, 
};

app.MapGet("/api/dogs", () =>
{
    return dogs.Select(dog =>
    {
        City city = cities.FirstOrDefault(c => c.Id == dog.CityId);
        Walker walker = walkers.FirstOrDefault(w => w.Id == dog.WalkerId);

        return new DogDTO
        {
            Id = dog.Id,
            Name = dog.Name,
            City = new CityDTO
            {
                Id = city.Id,
                Name = city.Name
            },
            Walker = walker == null ? null : new WalkerDTO
            {
                Id = walker.Id,
                Name = walker.Name
            }
        };
    });
});

app.MapGet("/api/hello", () =>
{
    return new { Message = "Welcome to DeShawn's Dog Walking" };
});


app.Run();
