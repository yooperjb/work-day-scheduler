
var toDos = {};
var currentDate = moment().format("MMDDYY");

// Write current day to header
$("#currentDay").text(moment().format('dddd, MMMM Do'));

// when a task description is clicked - convert p to textarea for editing
$(".description").on("click", function() {
    var text = $(this).find("p")
      .text()
      .trim();
  
    // create a new textarea element
    var textInput = $("<textarea>")
      .addClass("form-control")
      .val(text);
    
    $(this).find("p").replaceWith(textInput);
    textInput.trigger("focus");
  });

// When save button is clicked convert textarea to p and set LS
$(".saveBtn").on("click", "p", function() {
    
    // Get closest parent up from saveBtn
    var myTarget = $(this).closest(".row");
    
    // If there is a textarea
    if (myTarget.has("textarea").length > 0 ) {
        
        // target textarea and get value
        textInput = myTarget.find(".description textarea");
        var text = textInput.val().trim();
        
        // create <p> element and assign edited text
        var textP = $("<p>").text(text);
        textInput.replaceWith(textP);

        // get the custom time-block attribute value
        var timeBlock = "time-Block-" + myTarget.find(".description").first().attr("time-block"); // '09'

        // add key: value to toDos object and update localStorage
        toDos[timeBlock] = text;
        localStorage.setItem('toDos-'+currentDate, JSON.stringify(toDos));
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

// load todos from localStorage
var loadToDos = function() {
    
    // get todos from LS if nothing in LS create empty object
    toDos = JSON.parse(localStorage.getItem('toDos-'+ currentDate)) || {};

    // loop over each todo and write to page
    $.each(toDos, function(key,val){
        
        var blockNum = key.slice(-2); // 09
        var descCol = "[time-block='" + blockNum + "'] p"; // [time-block='09' p]
        // find column with corresponding timeblock and write todo
        $(descCol).text(val);
    });
};

// Run timeBlocks every 30 minutes to set time block color
setInterval(function () {
    timeBlocks();
  }, 1800000);

timeBlocks();
loadToDos();