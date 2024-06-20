
# Factorial function
def factorial(n):
    """
    Calculates the factorial of a given number n.
    
    Args:
        n (int): The number for which the factorial needs to be calculated.
        
    Returns:
        int: The factorial of n.
    """
    if n == 0:
        return 1
    return n * factorial(n - 1)


# Prime number checker
def is_prime(n):
    """
    Checks if a given number n is prime or not.
    
    Args:
        n (int): The number to be checked for primality.
        
    Returns:
        bool: True if n is prime, False otherwise.
    """
    if n <= 1:
        return False
    for i in range(2, int(n ** 0.5) + 1):  # Optimization: Check only up to square root of n
        if n % i == 0:
            return False
    return True


class Item:
    """
    Represents an item with a weight.
    """
    def __init__(self, weight):
        self.weight = weight


class Box:
    """
    Represents a box with a capacity and a list of items.
    """
    def __init__(self, capacity):
        self.capacity = capacity
        self.items = []

    def can_fit(self, item):
        """
        Checks if an item can fit in the box.
        
        Args:
            item (Item): The item to be checked.
            
        Returns:
            bool: True if the item can fit in the box, False otherwise.
        """
        remaining_capacity = self.capacity - sum(item.weight for item in self.items)
        return remaining_capacity >= item.weight

    def add_item(self, item):
        """
        Adds an item to the box if it can fit.
        
        Args:
            item (Item): The item to be added.
        """
        if self.can_fit(item):
            self.items.append(item)


def pack_items(items, boxes):
    """
    Packs items into boxes using a recursive backtracking approach.
    
    Args:
        items (list): A list of Item objects.
        boxes (list): A list of Box objects.
        
    Returns:
        bool: True if all items can be packed into the boxes, False otherwise.
    """
    if not items:
        return True

    for box in boxes:
        for item in items:
            remaining_items = [i for i in items if i != item]
            if box.can_fit(item) and pack_items(remaining_items, boxes):
                box.add_item(item)
                return True
    return False


# Example usage
items = [Item(5), Item(3), Item(4), Item(1)]
boxes = [Box(10), Box(7)]

if pack_items(items.copy(), boxes):
    print("Items can be packed into the boxes")
    for box in boxes:
        print(f"Box capacity: {box.capacity}, Items: {[item.weight for item in box.items]}")
else:
    print("Items cannot be packed into the boxes")
