namespace DogWalker.Models.DTOs;

public class DogDTO
{
    public int Id {get; set;}
    public string Name {get; set;}
    public CityDTO City {get; set;}
    public WalkerDTO Walker {get; set;}
}