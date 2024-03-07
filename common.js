

  // Initialize variables
var answersArray = [];
var startersYesCount = 0;
var questionsYesCount = 0;
var yesAnswersArray = [];

function saveAnswerAndShowNextQuestion(questionNumber, q, answer, recommendation, a) {
  // Save variables to the array
  answersArray.push({
    'Question Number': questionNumber,
    'Question': q,
    'Answers': recommendation
  });

  // Check the class of the question
  var questionElement = document.getElementById('question-' + questionNumber);
  var questionClass = questionElement.classList.contains('Starters') ? 'Starters' : 'question';

  // Check the answer and update counters accordingly
  if (answer === 'Yes') {
    if (questionClass === 'Starters') {
      startersYesCount++;
      yesAnswersArray.push(a); // Add the name of the question to the array
    } else if (questionClass === 'question') {
      questionsYesCount++;
      yesAnswersArray.push(a); // Add the name of the question to the array
    } else if (questionClass === 'extraquestion') {
      yesAnswersArray.push(a); // Add the name of the question to the array
    }
  }

  // You may implement code here to show the next question
  // based on your current logic
}

// Function to submit questions
function submitQuestions() {
  console.log('submitQuestions called');
  console.log('startersYesCount:', startersYesCount);
  console.log('questionsYesCount:', questionsYesCount);
  sessionStorage.setItem('startersYesCount', JSON.stringify(startersYesCount));
  sessionStorage.setItem('answersArray', JSON.stringify(answersArray));
  sessionStorage.setItem('yesAnswersArray', JSON.stringify(yesAnswersArray));
  var questions = document.querySelectorAll('.question input[type="radio"], .question input[type="checkbox"]');
  var unansweredQuestions = 0;
  var hasYesAnswer = false;  // Variable to track if there's any 'Yes' answer

  questions.forEach(function (question) {
    var groupName = question.getAttribute('name');
    var isChecked = document.querySelector('input[name="' + groupName + '"]:checked');

    console.log('Question:', question);
    console.log('GroupName:', groupName);
    console.log('IsChecked:', isChecked);
// Next line commented due to it throwing null ptr exception
//    console.log(isChecked.value);
    if (!isChecked) {
      unansweredQuestions++;
    } else {
      // Check if the answer is 'Yes'
      if (isChecked.value === 'Yes') {
        hasYesAnswer = true;
        yesAnswersArray.push(question.getAttribute('data-question')); // Add the name of the question to the array
      }
    }
  });

  console.log('unansweredQuestions:', unansweredQuestions);
  console.log('hasYesAnswer:', hasYesAnswer);
  if (unansweredQuestions === 0) {
    // If there's any 'Yes' answer, display combined alert
    if (hasYesAnswer && startersYesCount > 0 && startersYesCount < 5) {
      alert('Level of CHW Involvement:\nLow\n\nTriggers:\n' + yesAnswersArray.join('\n'));
    } else if (hasYesAnswer && startersYesCount > 4 && startersYesCount < 12) {
      alert('Level of CHW Involvement:\nMedium\n\nTriggers:\n' + yesAnswersArray.join('\n'));
    } else if (hasYesAnswer && startersYesCount >= 12) {
      alert('Level of CHW Involvement:\nHigh\n\nTriggers:\n' + yesAnswersArray.join('\n'));
    } else {
      alert('No CHW Involvement Required');
    }

    // Save the array to sessionStorage
    console.log('Saving to sessionStorage:', answersArray);

    // Add console logs for debugging
    console.log('Preparing to download CSV');

    // Save the array to a CSV file

    // Add console logs for debugging
    console.log('CSV download triggered');

    // Redirect to Sure.html
    window.location.href = 'Sure.html';
  } else {
    alert('Please answer all questions before submitting.');
  }
}




function submitExtra() {
  console.log('submitQuestions called');
  console.log('startersYesCount:', startersYesCount);
  console.log('questionsYesCount:', questionsYesCount);
  var questions = document.querySelectorAll('.extraquestion input[type="radio"], .question input[type="checkbox"]');
  var unansweredQuestions = 0;
  var hasYesAnswer = false;  // Variable to track if there's any 'Yes' answer

  questions.forEach(function (question) {
    var groupName = question.getAttribute('name');
    var isChecked = document.querySelector('input[name="' + groupName + '"]:checked');

    console.log('Question:', question);
    console.log('GroupName:', groupName);
    console.log('IsChecked:', isChecked);
    console.log(isChecked.value);
    if (!isChecked) {
      unansweredQuestions++;
    } else {
      // Check if the answer is 'Yes'
      if (isChecked.value === 'Yes') {
        hasYesAnswer = true;
        yesAnswersArray.push(question.getAttribute('data-question')); // Add the name of the question to the array
      }
    }
  });

  console.log('unansweredQuestions:', unansweredQuestions);
  console.log('hasYesAnswer:', hasYesAnswer);
  if (unansweredQuestions === 0) {
    // If there's any 'Yes' answer, display combined alert
    if (hasYesAnswer && startersYesCount === 4) {
      alert('Level of CHW Involvement:\nLow\n\nTriggers:\n' + yesAnswersArray.join('\n'));
    } else if (hasYesAnswer && startersYesCount === 8) {
      alert('Level of CHW Involvement:\nMedium\n\nTriggers:\n' + yesAnswersArray.join('\n'));
    } else if (hasYesAnswer && startersYesCount >= 12) {
      alert('Level of CHW Involvement:\nHigh\n\nTriggers:\n' + yesAnswersArray.join('\n'));
    } else {
      alert('No CHW Involvement Required');
      yesAnswersArray.join('\n');
    }

    // Save the array to sessionStorage
    console.log('Saving to sessionStorage:', answersArray);

    // Add console logs for debugging
    console.log('Preparing to download CSV');

    // Save the array to a CSV file
    saveArrayToCSV(answersArray);

    // Add console logs for debugging
    console.log('CSV download triggered');

    // Redirect to Sure.html
    window.location.href = 'ThankYou.html';
  } else {
    alert('Please answer all questions before submitting.');
  }
}

// Function to submit Sure
function submitSure() {
  console.log('submitSure called');
  var sureAnswer = document.querySelector('input[name="q500"]:checked');

  if (sureAnswer) {
    if (sureAnswer.value === 'No') {
      // User is not satisfied, redirect to ExtraQuestions.html with answersArray as a query parameter
      sessionStorage.setItem('answersArray', JSON.stringify(answersArray));
      var answersArrayParam = encodeURIComponent(JSON.stringify(answersArray));
      alert("Please answer additional questions");
      window.location.href = 'ExtraQuestions.html';
    } else {
      // User is satisfied, proceed with the existing logic
      submitQuestions();
      saveArrayToCSV(answersArray);
      window.location.href = 'ThankYou.html';
    }
  } else {
    alert('Please answer the satisfaction question before submitting.');
  }
}

function submitSure1() {
  console.log('submitSure called');
  var sureAnswer = document.querySelector('input[name="q500"]:checked');
  saveArrayToCSV(answersArray);
  if (sureAnswer) {
    if (sureAnswer.value === 'No') {
      // User is not satisfied, redirect to ExtraQuestions.html with answersArray as a query parameter
      sessionStorage.setItem('answersArray', JSON.stringify(answersArray));
      var answersArrayParam = encodeURIComponent(JSON.stringify(answersArray));
      window.location.href = 'Questions.html';
    } else {
      // User is satisfied, proceed with the existing logic
      submitQuestions();
      window.location.href = 'ThankYou.html';
    }
  } else {
    alert('Please answer the satisfaction question before submitting.');
  }
}


function saveArrayToCSV(arr) {
  try {
    // Convert the array to CSV using PapaParse
    var csvData = Papa.unparse(arr);

    // Create a Blob object containing the CSV data
    var blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' });

    // Create a link element to trigger the download
    var link = document.createElement('a');
    link.href = URL.createObjectURL(blob);

    // Generate the CSV file name
    var csvFileName = generateCSVFileName();
    link.download = csvFileName;

    // Append the link to the document and trigger the download
    document.body.appendChild(link);
    link.click();

    // Remove the link from the document
    document.body.removeChild(link);
  } catch (error) {
    console.error('Error during CSV generation:', error);
  }
}


function saveArrayToCSVExtra(arr) {
  // Convert the array to CSV using PapaParse
  var csvData = Papa.unparse(arr);

  // Create a Blob object containing the CSV data
  var blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' });

  // Create a link element to trigger the download
  var link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'extra_responses.csv';

  // Append the link to the document and trigger the download
  document.body.appendChild(link);
  link.click();

  // Remove the link from the document
  document.body.removeChild(link);
}

var startersYesCount = parseInt(sessionStorage.getItem('startersYesCount')) || 0;
console.log('startersYesCount on page load:', startersYesCount);

// Function to submit Starters
function submitStarters() {
  console.log('submitStarters called');

  var questions = document.querySelectorAll('.Starters input[type="radio"]');
  var unansweredQuestions = 0;

  questions.forEach(function (question) {
    var groupName = question.getAttribute('name');
    var isChecked = document.querySelector('input[name="' + groupName + '"]:checked');

    if (!isChecked) {
      unansweredQuestions++;
    } else {
      // Check if the answer is 'Yes'
      if (isChecked.value === 'Yes') {
        startersYesCount++;
         // Add the name of the question to the array
      }
    }
  });

  if (unansweredQuestions === 0) {
    // Save startersYesCount to sessionStorage
    sessionStorage.setItem('startersYesCount', JSON.stringify(startersYesCount));
    sessionStorage.setItem('answersArray', JSON.stringify(answersArray));
    sessionStorage.setItem('yesAnswersArray', JSON.stringify(yesAnswersArray));
    // Alert for 'No Involvement' or redirect to 'Questions.html'
    if (startersYesCount < 4) {
      console.log(startersYesCount);
      window.location.href = 'Sure1.html';
      alert("No Involvement\nNo personal health triggers");
    } else {
      // Display the names of questions answered 'Yes'
      // Redirect to 'Questions.html'
      alert("Please answer some additional questions");
      window.location.href = 'Questions.html';
    }
  } else {
    alert('Please answer all questions before submitting.');
  }
}


// Function to capture registration details
function captureRegistrationDetails() {
  var firstName = document.getElementById('firstName').value;
  var lastName = document.getElementById('lastName').value;

  // Check if both first and last names are provided
  if (firstName && lastName) {
    // Save first and last names to sessionStorage
    sessionStorage.setItem('firstName', firstName);
    sessionStorage.setItem('lastName', lastName);
  } else {
    alert('Please provide both first and last names.');
  }
}

// Function to generate CSV file name
function generateCSVFileName() {
  var selectedCaseworkerID = sessionStorage.getItem('selectedCaseworkerID');
  var selectedCommunityID = sessionStorage.getItem('selectedCommunityID');
  var UserID = sessionStorage.getItem('userUserID');

  // Check if both first and last names are available
  if (selectedCaseworkerID && selectedCommunityID && UserID) {
    return selectedCommunityID + '' + selectedCaseworkerID + '' + UserID + '_questionnaire_responses.csv';
  } else {
    // Handle the case where names are not available
    return 'questionnaire_responses.csv';
  }
}

// Function to save array to CSV with the generated file name


// Function to submit registration details and questions
function submitRegistrationAndQuestions() {
  // Capture registration details
  captureRegistrationDetails();

  // Your existing logic for submitting questions
  submitStarters();
}

// Add event listener for the registration form submission
document.getElementById('registrationForm').addEventListener('submit', function (event) {
  event.preventDefault();
  submitRegistrationAndQuestions();
});
