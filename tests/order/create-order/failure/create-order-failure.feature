Feature: Create an order (failure)


  Scenario Outline: Creating an order (failure)
    Given that my user ID is "11299efa-a2ee-4f65-857e-2fff02d2446e"
    And my wallet balance is "119.91" "USD"
    When i request products list
    Then I see product with name is "<NAME>" and price is "<PRICE>" "USD" and status is "<STATUS>"
    When I send a request to create an order with this product
    Then I receive error response
    And response message is "<ERROR_MESSAGE>" and code is "<ERROR_CODE>" and error is "<ERROR_TYPE>"

    Examples:

      | NAME          | PRICE  | STATUS      | ERROR_MESSAGE                    | ERROR_CODE | ERROR_TYPE  |
      | Coffee Lake   | 35     | sold        | Product is unavailable           | 409        | Conflict    |
      | Ice Lake      | 275.39 | available   | Not enough funds to buy product  | 400        | Bad Request |
