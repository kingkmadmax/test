import random

# Directions
DIRECTIONS = ['RIGHT', 'DOWN', 'LEFT', 'UP']

# Game configuration
GRID_SIZE = 4
NUM_PITS = 3

# Cell contents
class Cell:
    def __init__(self):
        self.pit = False
        self.wumpus = False
        self.gold = False
        self.breeze = False
        self.stench = False
        self.glitter = False

# Environment setup
class WumpusWorld:
    def __init__(self):
        self.grid = [[Cell() for _ in range(GRID_SIZE)] for _ in range(GRID_SIZE)]
        self.agent_x = 0
        self.agent_y = 0
        self.direction = 0  # Index in DIRECTIONS
        self.has_arrow = True
        self.has_gold = False
        self.game_over = False
        self.score = 0

        self.place_objects()

    def place_objects(self):
        # Random placement avoiding [0][0]
        def random_empty_cell():
            while True:
                x, y = random.randint(0, 3), random.randint(0, 3)
                if (x, y) != (0, 0) and not any([self.grid[y][x].pit, self.grid[y][x].wumpus, self.grid[y][x].gold]):
                    return x, y

        # Place pits
        for _ in range(NUM_PITS):
            x, y = random_empty_cell()
            self.grid[y][x].pit = True
            for dx, dy in [(-1,0), (1,0), (0,-1), (0,1)]:
                if 0 <= x+dx < GRID_SIZE and 0 <= y+dy < GRID_SIZE:
                    self.grid[y+dy][x+dx].breeze = True

        # Place Wumpus
        x, y = random_empty_cell()
        self.grid[y][x].wumpus = True
        self.wumpus_alive = True
        for dx, dy in [(-1,0), (1,0), (0,-1), (0,1)]:
            if 0 <= x+dx < GRID_SIZE and 0 <= y+dy < GRID_SIZE:
                self.grid[y+dy][x+dx].stench = True

        # Place Gold
        x, y = random_empty_cell()
        self.grid[y][x].gold = True
        self.grid[y][x].glitter = True

    def current_cell(self):
        return self.grid[self.agent_y][self.agent_x]

    def turn_left(self):
        self.direction = (self.direction - 1) % 4
        self.score -= 1

    def turn_right(self):
        self.direction = (self.direction + 1) % 4
        self.score -= 1

    def move_forward(self):
        dx, dy = [(1,0), (0,1), (-1,0), (0,-1)][self.direction]
        new_x = self.agent_x + dx
        new_y = self.agent_y + dy
        if 0 <= new_x < GRID_SIZE and 0 <= new_y < GRID_SIZE:
            self.agent_x = new_x
            self.agent_y = new_y
        self.score -= 1
        self.check_death()

    def check_death(self):
        cell = self.current_cell()
        if cell.pit or (cell.wumpus and self.wumpus_alive):
            print("Agent died!")
            self.score -= 1000
            self.game_over = True

    def grab(self):
        cell = self.current_cell()
        if cell.gold:
            self.has_gold = True
            cell.gold = False
            cell.glitter = False
            print("Gold picked up!")
        self.score -= 1

    def climb(self):
        if self.agent_x == 0 and self.agent_y == 0:
            if self.has_gold:
                self.score += 1000
                print("Agent escaped with the gold!")
            else:
                print("Agent climbed out without gold.")
            self.game_over = True
        self.score -= 1

    def shoot(self):
        if not self.has_arrow:
            print("No arrows left.")
            return
        self.score -= 10
        self.has_arrow = False
        dx, dy = [(1,0), (0,1), (-1,0), (0,-1)][self.direction]
        x, y = self.agent_x, self.agent_y
        while 0 <= x < GRID_SIZE and 0 <= y < GRID_SIZE:
            if self.grid[y][x].wumpus:
                print("Wumpus killed!")
                self.wumpus_alive = False
                return
            x += dx
            y += dy
        print("Arrow missed.")

    def percept(self):
        cell = self.current_cell()
        return {
            "stench": cell.stench and self.wumpus_alive,
            "breeze": cell.breeze,
            "glitter": cell.glitter
        }

# Simple agent behavior
def simple_agent(world):
    print("Initial percepts:", world.percept())

    while not world.game_over:
        percept = world.percept()

        if percept['glitter']:
            world.grab()

        elif world.has_gold and world.agent_x == 0 and world.agent_y == 0:
            world.climb()
            break

        elif world.has_gold:
            world.turn_left()
            world.move_forward()
        else:
            world.move_forward()

        print(f"Agent at ({world.agent_x}, {world.agent_y}), Score: {world.score}")
        print("Percepts:", world.percept())

# Run the simulation
if __name__ == "__main__":
    random.seed(42)  # for reproducibility
    world = WumpusWorld()
    simple_agent(world)
    print("Final score:", world.score)
