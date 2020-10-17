
// Write current day to header
$("#currentDay").text(moment().format('dddd, MMMM Do'));

// when a task description is clicked - convert p to textarea for editing
$(".description").on("click", function() {
    var text = $(this).find("p")
      .text()
      .trim();
    console.log(this);
    console.log(text);
  
    // create a new textarea element
    var textInput = $("<textarea>")
      .addClass("form-control")
      .val(text);
    
    $(this).find("p").replaceWith(textInput);
    textInput.trigger("focus");
  });

// when save button is clicked
$(".saveBtn").on("click", "p", function() {
    var textInput = $(".description textarea");
    var text = textInput.val().trim();
    var textP = $("<p>")
        .text(text);

    textInput.replaceWith(textP);
    console.log(text);

  })