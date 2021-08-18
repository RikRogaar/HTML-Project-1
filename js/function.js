document.addEventListener('DOMContentLoaded', function() {
 
  document.getElementsByTagName('form')[0].onsubmit = function(evt) {
    evt.preventDefault(); // Preventing the form from submitting
    checkWord(); // Do your magic and check the entered word/sentence
    window.scrollTo(0,150);
  }
 
  // Get the focus to the text input to enter a word right away.
  document.getElementById('terminalTextInput').focus();
 
  // Getting the text from the input
  var textInputValue = document.getElementById('terminalTextInput').value.trim();
 
  //Getting the text from the results div
  var textResultsValue = document.getElementById('terminalReslutsCont').innerHTML;
 
  // Clear text input
  var clearInput = function(){
    document.getElementById('terminalTextInput').value = "";
  }
 
  // Scrtoll to the bottom of the results div
  var scrollToBottomOfResults = function(){
    var terminalResultsDiv = document.getElementById('terminalReslutsCont');
    terminalResultsDiv.scrollTop = terminalResultsDiv.scrollHeight;
  }
 
  // Scroll to the bottom of the results
  scrollToBottomOfResults();
 
  // Add text to the results div
  var addTextToResults = function(textToAdd){
    document.getElementById('terminalReslutsCont').innerHTML += "<p>" + textToAdd + "</p>";
    scrollToBottomOfResults();
  }

  var addImageToResults = function(imageToAdd){
    document.getElementById('terminalReslutsCont').innerHTML += "<img src=" + imageToAdd + ">";
    scrollToBottomOfResults();
  }
 
  // Getting the list of keywords for help & posting it to the screen
  var postHelpList = function(){
    // Array of all the help keywords
    var helpKeyWords = [
      "- Open + website URL om het te openen in browser. (bv. ppen google.nl)",
      "- Google + woorden om direct in google te zoeken. (bv. Google noorderpoort)",
      "- YouTube + woorden om direct op youtube te zoeken. (bv. Youtube HTML)",
      "- Wiki + woorden om direct op wikipedia te zoeken. (bv. Wiki Groningen)",
      "- 'Tijd' laat je de tijd zien.",
      "- 'Datum' Laat je de datum zien.",
      "- 'Info' Laat je de info zien over deze site.",
      "- 'help' laat je deze lijst met commando's zien.",
      "- 'foto' laat je een foto zien."    
      ].join('<br>');
    addTextToResults(helpKeyWords);
  }
 
  // Getting the time and date and post it depending on what you request for
  var getTimeAndDate = function(postTimeDay){
    var timeAndDate = new Date();
    var timeHours = timeAndDate.getHours();
    var timeMinutes = timeAndDate.getMinutes();
    var dateDay = timeAndDate.getDate();
    console.log(dateDay);
    var dateMonth = timeAndDate.getMonth() + 1; // Because JS starts counting months from 0
    var dateYear = timeAndDate.getFullYear(); // Otherwise we'll get the count like 98,99,100,101...etc.
 
    if (timeHours < 10){ // if 1 number display 0 before it.
      timeHours = "0" + timeHours;
    }
 
    if (timeMinutes < 10){ // if 1 number display 0 before it.
      timeMinutes = "0" + timeMinutes;
    }
 
    var currentTime = timeHours + ":" + timeMinutes;
    var currentDate = dateDay + "/" + dateMonth + "/" + dateYear;
 
    if (postTimeDay == "time"){
      addTextToResults(currentTime);
    }
    if (postTimeDay == "date"){
      addTextToResults(currentDate);
    }
  }
 
  // Opening links in a new window
  var openLinkInNewWindow = function(linkToOpen){
    window.open(linkToOpen, '_blank');
    clearInput();
  }
 
  // Having a specific text reply to specific strings
  var textReplies = function() {
    switch(textInputValueLowerCase){
      // replies
 
      case "info":
        clearInput();
        addTextToResults("De basis code van https://github.com/PwithNiko851/Rblx/blob/master/source%2Ccode.txt. Heb zelf veranderd om te benodigheden te voorzien");
        break;

 
      case "hallo":
      case "hoi":
        clearInput();
        addTextToResults("Hallo!");
        break;
      // replies 
 
      case "youtube":
        clearInput();
        addTextToResults("Type youtube + something to search for.");
        break;
 
      case "google":
        clearInput();
        addTextToResults("Type google + something to search for.");
        break;
 
        case "wiki":
        case "wikipedia":
          clearInput();
          addTextToResults("Type wiki + something to search for.");
          break;  
 
      case "tijd":
        clearInput();
        getTimeAndDate("time");
        break;
 
      case "datum":
        clearInput();
        getTimeAndDate("date");
        break;

      case "help":
      case "?":
        clearInput();
        postHelpList();
        break;

      case "foto":
        clearInput();
        addImageToResults("resources/birb.jpg");
        break;
 
      default:
      clearInput();
      addTextToResults("<p><i>Deze command " + "<b>" + textInputValue + "</b>" + " is niet gevonden. Typ <b>help</b> om alle commando's te laten zien.</i></p>");
      break;
    }
  }
 
// Main function to check the entered text and assign it to the correct function
  var checkWord = function() {
    textInputValue = document.getElementById('terminalTextInput').value.trim(); //get the text from the text input to a variable
    textInputValueLowerCase = textInputValue.toLowerCase(); //get the lower case of the string
 
    if (textInputValue != ""){ //checking if text was entered
      addTextToResults("<p class='userEnteredText'>> " + textInputValue + "</p>");
      if (textInputValueLowerCase.substr(0,5) == "open ") { //if the first 5 characters = open + space
        openLinkInNewWindow('http://' + textInputValueLowerCase.substr(5));
        addTextToResults("<i>De URL " + "<b>" + textInputValue.substr(5) + "</b>" + " is geopent in een nieuwe tabblad.</i>");
      } else if (textInputValueLowerCase.substr(0,8) == "youtube ") {
        openLinkInNewWindow('https://www.youtube.com/results?search_query=' + textInputValueLowerCase.substr(8));
        addTextToResults("<i>De URL " + "<b>" + textInputValue.substr(8) + "</b>" + " is geopent in een nieuwe tabblad.</i>");
      } else if (textInputValueLowerCase.substr(0,7) == "google ") {
        openLinkInNewWindow('https://www.google.nl/search?q=' + textInputValueLowerCase.substr(7));
        addTextToResults("<i>De URL " + "<b>" + textInputValue.substr(7) + "</b>" + " is geopent in een nieuwe tabblad.</i>");
      } else if (textInputValueLowerCase.substr(0,5) == "wiki "){
        openLinkInNewWindow('https://nl.wikipedia.org/w/index.php?search=' + textInputValueLowerCase.substr(5));
        addTextToResults("<i>De URL" + "<b>" + textInputValue.substr(5) + "</b>" + " is geopent in een nieuwe tabblad,</i>");
      } else{
        textReplies();
      }
    }
  };
 
});