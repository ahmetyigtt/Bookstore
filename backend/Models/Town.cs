using System;
using System.Collections.Generic;

namespace Bookstore.Models;

public partial class Town
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public int CityId { get; set; }
}
