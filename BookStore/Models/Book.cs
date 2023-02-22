using System;
using System.Collections.Generic;

namespace Bookstore.Models;

public partial class Book
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string Image { get; set; } = null!;

    public int Price { get; set; }

    public int CategoryId { get; set; }
}
