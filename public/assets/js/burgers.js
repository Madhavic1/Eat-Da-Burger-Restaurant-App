// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function(){
    //Submit button click event
    $("#submitBtn").on("click",function(){
        var newBurger ={burger_name : $("#burger-name").val().trim()};
       if(newBurger.burger_name === "")
       {
           alert('Enter a burger name to devour!!')
            return;
       }
        //send the POST request
        $.ajax("/api/burgers",{
            type : "POST",
            data : newBurger
        }).then(function(){
            console.log("created a new Burger item ");
            location.reload();
        });
    });
    //devour button click event
    $(".devourBtn").on("click",function(){
        var id = $(this).data("id");
        var devour = true;
        var newDevourState = {
            devoured : devour
        }
        //Update devoured status of record with id , with true using ajax PUT request 
        $.ajax("api/burgers/"+id,{
            type : "PUT",
            data : newDevourState
        }).then(function(){
            console.log("Devoured status changed to "+devour);
            location.reload()
        });
    });
});
