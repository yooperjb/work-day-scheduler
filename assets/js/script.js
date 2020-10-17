
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

// When save button is clicked
$(".saveBtn").on("click", "p", function() {
    
    // Get closest parent up from saveBtn
    var myTarget = $(this).closest(".row");
    
    // If there is a textarea
    if (myTarget.has("textarea").length > 0 ) {
        console.log("Has Textarea");
        textInput = myTarget.find(".description textarea").first();
        
        var text = textInput.val().trim();
        var textP = $("<p>").text(text);

        textInput.replaceWith(textP);

        var timeBlock = "time-Block-" + myTarget.find(".description").first().attr("time-block");

        toDos[timeBlock] = text;
        localStorage.setItem('toDos', JSON.stringify(toDos));
    }
    else {
        console.log("Has NO textArea");
    }

  })

// Change time block bg color based on time status (past, present, future)
var timeBlocks = function() {
    // get all .desription columns
    descCol = $(".description");
    // grab the current time
    currentTime = moment().format('HH');

    // iterate through each time block column - compare timeblock with current time
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

var loadToDos = function() {
    
    // if nothing in localStorage create empty object
    toDos = JSON.parse(localStorage.getItem('toDos')) || {};
    console.log(toDos);

    $.each(toDos, function(key,val){
        console.log(key,val); //time-block-09 Drink Coffee
        var blockNum = key.slice(-2); // 09
        var descCol = "[time-block='" + blockNum + "'] p";
        console.log(descCol);
        $(descCol).text(val);
    });
    

};

// Run timeBlocks every 30 minutes to set time block color
setInterval(function () {
    timeBlocks();
  }, 1800000);

timeBlocks();
loadToDos();