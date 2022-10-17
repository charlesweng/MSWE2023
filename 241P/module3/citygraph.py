import argparse


class City:
  def __init__(self, name, population):
    self.name = name
    self.population = population
    self.connected_cities = []
  
  def __hash__(self):
    return hash(id(self))
    # return hash(tuple([self.name, self.population]))

  def __eq__(self, other):
    if isinstance(other, City):
      return self.name == other.name and \
        self.population == other.population
    return False
  
  def __ne__(self, other):
    return not self.__eq__(other)

  def __str__(self):
    return f'{self.name}:{self.population}'

def construct_graph(city_pop_filename, road_net_filename, cities, city_name_to_city):
  with open(city_pop_filename) as f:
    for line in f:
      city_pop = line.strip().split(":")
      city = City(city_pop[0].strip(), int(city_pop[1].strip()))
      cities.append(city)
      city_name_to_city[city.name] = city
  with open(road_net_filename) as f:
    for line in f:
      edges = line.strip().split(":")
      edges[0] = edges[0].strip()
      edges[1] = edges[1].strip()
      for city in cities:
        if city.name == edges[0]:
          city.connected_cities.append(city_name_to_city[edges[1]])
        elif city.name == edges[1]:
          city.connected_cities.append(city_name_to_city[edges[0]])

def bfs(city):
    q = [city]
    visited = set([city])
    while q:
      c = q.pop(0)
      for ct in c.connected_cities:
        if ct not in visited:
          visited.add(ct)
          q.append(ct)
    return visited

def connected_islands(cities):
  islands = 0
  island_map = {}
  visited = set()
  for city in cities:
    if city not in visited:
      islands += 1
      visited_islands = bfs(city)
      visited = visited.union(visited_islands)
      island_map[islands] = list(visited_islands)
  return island_map
  
def number_of_islands(cities):
  return len(connected_islands(cities))

def population_of_islands(cities):
  island_map = connected_islands(cities)
  result = []
  for k, v in island_map.items():
    population = 0
    for ct in v:
      population += ct.population
    result.append([list(map(lambda x: x.name, v)), population])
    # result.append([k, population])
  return result

# https://www.baeldung.com/cs/graph-number-of-shortest-paths
# https://www.geeksforgeeks.org/minimum-number-of-edges-between-two-vertices-of-a-graph/
def unique_highways(cities, city1, city2):
  distance = {}
  # paths = {}
  for city in cities:
    distance[city]=float("inf")
    # paths[city] = 0
  q = [city1]
  distance[city1] = 0
  # paths[city1] = 1
  visited = set([city1])
  while q:
    c = q.pop(0)
    for ct in c.connected_cities:
      if ct not in visited:
        # distance[ct] = distance[c] + 1
        q.append(ct)
        visited.add(ct)
      if distance[ct] > distance[c] + 1:
        distance[ct] = distance[c] + 1
        # paths[ct] = paths[c]
      # elif distance[ct] == distance[c] + 1:
      #   paths[ct] = paths[ct] + paths[c]
  # return paths[city2]
  return distance[city2]

def main():
  parser = argparse.ArgumentParser(description="City graph")
  parser.add_argument("-c", "--city-population", dest="city_population", type=str, required=True, help="File containing city:population")
  parser.add_argument("-r", "--road-network", dest="road_network", type=str, required=True, help="File containing cityname:cityname")
  args = parser.parse_args()
  city_pop_filename = args.city_population
  road_net_filename = args.road_network
  cities = []
  city_name_to_city = {}
  construct_graph(city_pop_filename, road_net_filename, cities, city_name_to_city)
  print("Finding population of each island: ")
  print(population_of_islands(cities))
  print("Finding number of islands: ")
  print(number_of_islands(cities))
  print("Number of unique highways from {} to {} is: ".format(cities[0], cities[2]))
  print(unique_highways(cities, cities[0], cities[2]))
  # print("Minimum unique highways from {} to {} is: ".format(city_name_to_city["A"], city_name_to_city["C"]))
  # print(unique_highways(cities, city_name_to_city["A"], city_name_to_city["C"]))

if __name__ == "__main__":
  main()