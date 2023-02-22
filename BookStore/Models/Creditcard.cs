using System;
using System.Collections.Generic;

namespace Bookstore.Models;

public partial class Creditcard
{
    public string Name { get; set; } = null!;

    public string Number { get; set; } = null!;

    public string Expiry { get; set; } = null!;

    public string Cvc { get; set; } = null!;
}
