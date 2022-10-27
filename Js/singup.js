// array
var userList = [];

const _FirstName = document.querySelector("#username");
const _LastName = document.querySelector("#lname");
const _Phone = document.querySelector("#phone");
const emailEl = document.querySelector("#email");
const passwordEl = document.querySelector("#password");
const confirmPasswordEl = document.querySelector("#confirm-password");
const _Submit = document.querySelector("#submit");
const form = document.querySelector("#signup");
const already = document.querySelector("#already");

// onclick event
_Submit.addEventListener("click", async (event) => {
  event.preventDefault();

  //validation
  let isUsernameValid = checkUsername(),
    isLastNameValid = checkLastName(),
    isPhoneValid = checkPhone(),
    isEmailValid = checkEmail(),
    isPasswordValid = checkPassword(),
    isConfirmPasswordValid = checkConfirmPassword();

  let isFormValid =
    isUsernameValid &&
    isLastNameValid &&
    isPhoneValid &&
    isEmailValid &&
    isPasswordValid &&
    isConfirmPasswordValid;

  // submit to the server if the form is valid
  if (isFormValid === false) {
    return false;
  }
  let url = "http://localhost:4400/api/signup";
  // to list the input data
  var _newList = {
    fullname: _FirstName.value,
    lname: _LastName.value,
    mobile_number: _Phone.value,
    email_id: emailEl.value,
    password: passwordEl.value,
  };
  // to push data into array
  userList.push(_newList);
  console.log(userList);

  try {
    let { data } = await axios.post(url, _newList);
    let { status, message } = data;
    if (status) {
      window.location.replace("./login.html");
    } else {
      alert(message);
    }
  } catch (error) {
    alert("Connection / Server Error");
    console.log(error);
  }
});

// onclick event
already.addEventListener("click", (event) => {
  event.preventDefault();
  window.location.replace("./login.html");
});

// firstname validation
const checkUsername = () => {
  let valid = false;
  const min = 3,
    max = 25;
  const username = _FirstName.value.trim();
  if (!isRequired(username)) {
    showError(_FirstName, "Username cannot be blank");
  } else if (!isBetween(username.length, min, max)) {
    showError(
      _FirstName,
      `Username must be between ${min} and ${max} characters.`
    );
  } else {
    showSuccess(_FirstName);
    valid = true;
  }
  return valid;
};

// lastname validation
const checkLastName = () => {
  let valid = false;
  const min = 1,
    max = 5;
  const lname = _LastName.value.trim();
  if (!isRequired(lname)) {
    showError(_LastName, "LastName cannot be blank");
  } else if (!isBetween(lname.length, min, max)) {
    showError(
      _LastName,
      `LastName must be between ${min} and ${max} characters.`
    );
  } else {
    showSuccess(_LastName);
    valid = true;
  }
  return valid;
};

// phone number validation
const checkPhone = () => {
  let valid = false;
  const min = 10,
    max = 12;
  const phone = _Phone.value.trim();
  if (!isRequired(phone)) {
    showError(_Phone, "Phone cannot be blank");
  } else if (!isBetween(phone.length, min, max)) {
    showError(_Phone, `Phone must be between ${min} and ${max} characters.`);
  } else {
    showSuccess(_Phone);
    valid = true;
  }
  return valid;
};

// email validation
const checkEmail = () => {
  let valid = false;
  const email = emailEl.value.trim();
  if (!isRequired(email)) {
    showError(emailEl, "Email cannot be blank.");
  } else if (!isEmailValid(email)) {
    showError(emailEl, "Email is not valid.");
  } else {
    showSuccess(emailEl);
    valid = true;
  }
  return valid;
};

// strong validation in regular expression
const isEmailValid = (email) => {
  const re = /^([a-zA-Z0-9\._]+)@([a-zA-Z0-9])+.([a-z]+)(.[a-z]+)$/g;
  return re.test(email);
};

//password validation
const checkPassword = () => {
  let valid = false;

  const password = passwordEl.value.trim();

  if (!isRequired(password)) {
    showError(passwordEl, "Password cannot be blank.");
  } else if (!isPasswordSecure(password)) {
    showError(
      passwordEl,
      "Password must has at least 8 characters that include at least 1 lowercase character, 1 uppercase characters, 1 number, and 1 special character in (!@#$%^&*)"
    );
  } else {
    showSuccess(passwordEl);
    valid = true;
  }

  return valid;
};

//confirm password validation
const checkConfirmPassword = () => {
  let valid = false;
  // check confirm password
  const confirmPassword = confirmPasswordEl.value.trim();
  const password = passwordEl.value.trim();

  if (!isRequired(confirmPassword)) {
    showError(confirmPasswordEl, "Please enter the password again");
  } else if (password !== confirmPassword) {
    showError(confirmPasswordEl, "The password does not match");
  } else {
    showSuccess(confirmPasswordEl);
    valid = true;
  }

  return valid;
};

// strong validation in regular expression
const isPasswordSecure = (password) => {
  const re = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  );
  return re.test(password);
};

//to check the value from the input
const isRequired = (value) => (value === "" ? false : true);
const isBetween = (length, min, max) =>
  length < min || length > max ? false : true;

//show the error
const showError = (input, message) => {
  // get the form-field element
  const formField = input.parentElement;
  // add the error class
  formField.classList.remove("success");
  formField.classList.add("error");
  // show the error message
  const error = formField.querySelector(".prblm");
  error.innerHTML = message;
};

//remove the error
const showSuccess = (input) => {
  // get the form-field element
  const formField = input.parentElement;
  // remove the error class
  formField.classList.remove("error");
  formField.classList.add("success");
  // hide the error message
  const error = formField.querySelector(".prblm");
  error.textContent = "";
};

//error time out
const debounce = (fn, delay = 500) => {
  let timeoutId;
  return (...args) => {
    // cancel the previous timer
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    // setup a new timer
    timeoutId = setTimeout(() => {
      fn.apply(null, args);
    }, delay);
  };
};

form.addEventListener(
  "input",
  debounce(function (e) {
    switch (e.target.id) {
      case "username":
        checkUsername();
        break;
      case "lname":
        checkLastName();
        break;
      case "phone":
        checkPhone();
        break;
      case "email":
        checkEmail();
        break;
      case "password":
        checkPassword();
        break;
      case "confirm-password":
        checkConfirmPassword();
        break;
    }
  })
);
