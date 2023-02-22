using System;
using System.Collections.Generic;

namespace Bookstore.Models;

public partial class Orderitem
{
    public int OrderId { get; set; }

    public int BookId { get; set; }

    public int TotalPrice { get; set; }

    public int Quantity { get; set; }

    public int Id { get; set; }
}
