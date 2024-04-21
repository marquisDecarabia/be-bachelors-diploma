Feature: Create a order

  Scenario: Creating an order (success)
    Given that my user ID is "7e0154e2-aca2-4af6-92b4-bd5c517f5b36"
    And my wallet balance is "217.35" "USD"
    When i request products list
    Then I see product with name is "Lava Lake" and price is 150 "USD" and status is "available"
    When I send a request to create an order with this product
    Then I receive order ID
#    And I can see order details by this ID
    And product status is "sold"
    And my wallet balance is "67.35" "USD"
