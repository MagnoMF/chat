using System.Collections.Concurrent;
using ChatSocketDotnet.Models;

namespace ChatSocketDotnet.DataService;

public class SharedDb 
{
    private readonly ConcurrentDictionary<string, UserConnection> _connections = new ConcurrentDictionary<string, UserConnection>();

    public ConcurrentDictionary<string, UserConnection> connections => _connections;
}