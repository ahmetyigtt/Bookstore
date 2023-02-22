using System;
using System.Collections.Generic;

namespace Bookstore.Models;

public partial class Order
{
    public int Id { get; set; }

    public int UserId { get; set; }

    public DateTime Date { get; set; }

    public int TotalPrice { get; set; }

    public string AddressText { get; set; } = null!;

    public int CityId { get; set; }

    public int TownId { get; set; }

    public int Zip { get; set; }
}
