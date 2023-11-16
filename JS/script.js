/*
I tried to have some fun with this. If the passive aggressiveness isn't your form
of humour, I do apologize!
*/

//defer not necessary as the script is wrapped in the content loaded event listener
document.addEventListener("DOMContentLoaded", () => {
  const myStudentId = document.getElementById("myStudentId");
  const submitButton = document.getElementById("submit");

  myStudentId.textContent = "200551988";

  function addTextAfterDelay() {
    const h2Element = document.getElementById("prompt");
    h2Element.innerHTML += "<br> Order faster!";
  }

  function alertAfterDelay() {
    alert(`Dude, you're taking forever! Order already.`);
  }

  class Pizza {
    constructor(quantity, size, toppings) {
      this.quantity = quantity;
      this.size = size;
      this.toppings = toppings;
    }
  }

  function collectFormData(event) {
    var output = document.getElementById("orderDetails");
    output.style.display = "block";
    //display form results on page without page reloading
    event.preventDefault();
    const toppings = [];
    const quantity = document.getElementById("quantityInput").value;
    const size = document.getElementById("sizeSelect").value;

    //adding all checked checkboxes to an array
    const checkboxes = document.querySelectorAll(
      'input[name="topping"]:checked'
    );
    checkboxes.forEach((checkbox) => {
      toppings.push(checkbox.value);
    });

    const pizza = new Pizza(quantity, size, toppings);

    //validate toppings
    if (toppings.length == 0) {
      document.getElementById('orderText').textContent = `Oh yeah? You're gonna order a pizza with no toppings? Grow some taste buds and put something on the pizza.`;
      return;
    }

    //validate size
    if (size === "") {
      document.getElementById('orderText').textContent = `*sigh* Do you wanna tell us what size you're ordering? Or should we just guess?`;
      return;
    }

    

    // Validate the quantity input
    if (quantity > 0 && !isNaN(quantity)) {
        if (pizza.toppings.length > 1) {
          //pop the last element of the toppings array and store it in a variable
          const lastTopping = pizza.toppings.pop();
          //join all other toppings with a comma into a string
          const allToppings = pizza.toppings.join(', ');
          //join the last topping with the remainder
          pizza.toppings = `${allToppings} and ${lastTopping}`;
        } else {
          //only one topping is selected. The string becomes just that one element (nothing else to join)
          pizza.toppings = pizza.toppings[0];
        }

        //ternary operator to use plural or not
        let pizzaOrPizzas = pizza.quantity === '1' ? 'pizza' : 'pizzas';
        const orderText = `You ordered ${pizza.quantity} ${pizza.size} ${pizzaOrPizzas} with ${pizza.toppings}.`;
        document.getElementById('orderText').textContent = orderText;
        //if the user tries to order negative pizzas
      } else if (quantity < 0 && !isNaN(quantity)){
        document.getElementById('orderText').textContent = `You can't order a negative number of pizzas, genius.`;
      }
      //if no quantity or 0 pizzas are entered
      else if (quantity == 0){
        document.getElementById('orderText').textContent = `How are you going to order 0 pizzas? Think it through, Einstein.`;
      }
      //if anything other than a number is entered
      else{
        document.getElementById('orderText').textContent = `Really? You want to order "${pizza.quantity}" number of pizzas? Come back when you want to get serious.`;
      }
        
  }

  // Set a timeout for 30 seconds
  setTimeout(addTextAfterDelay, 3000);
  // 60 second timeout 
  setTimeout(alertAfterDelay, 10000);

  //form data collected on button click
  submitButton.addEventListener("click", collectFormData)
});
