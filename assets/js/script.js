
var toDos = {};

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


$(".saveBtn").on("click", "p", function() {
    
    var myTarget = $(this)
        .closest(".row");
    
    if (myTarget.has("textarea").length > 0 ) {
        console.log("Has Textarea");
        textInput = myTarget.find(".description textarea").first();
        
        var text = textInput.val().trim();
        var textP = $("<p>").text(text);

        textInput.replaceWith(textP);

        var timeBlock = "time-Block-" + myTarget.find(".description").first().attr("time-block");
        console.log(timeBlock);

        toDos[timeBlock] = text;
        console.log(toDos);
    }
    else {
        console.log("Has NO textArea");
    }

  })

// Change time block bg color based on time status (past, present, future)
var timeBlocks = function() {
    descCol = $(".description");
    //console.log(descCol);
    currentTime = moment().format('HH');

    // iterate through each time block column
    for (let i=0; i < descCol.length; i++){
        var timeBlockHour = descCol[i].getAttribute("time-block");
        var classAttr = descCol[i].getAttribute("class");
        
        if (timeBlockHour < currentTime) {
            classAttr = classAttr + " past";
            descCol[i].setAttribute("class", classAttr);
        }
        else if (timeBlockHour === currentTime) {
            classAttr = classAttr + " present";
            descCol[i].setAttribute("class", classAttr);
        }
        else {
            classAttr = classAttr + " future";
            descCol[i].setAttribute("class", classAttr);
        }
    }
};

// Run timeBlocks every 30 minutes to set time block color
setInterval(function () {
    timeBlocks();
  }, 1800000);

timeBlocks();