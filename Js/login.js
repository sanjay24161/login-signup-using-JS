const emailEl = document.querySelector("#email");
const passwordEl = document.querySelector("#password");
const _Submit = document.querySelector("#submit");
const form = document.querySelector("#signup");
const create = document.querySelector("#create");

// onclick event
_Submit.addEventListener("click", async (event) => {
  event.preventDefault();
  //validation
  let isEmailValid = checkEmail(),
    isPasswordValid = checkPassword();

  let isFormValid = isEmailValid && isPasswordValid;

  // submit to the server if the form is valid
  if (isFormValid === false) {
    return false;
  }

  var _newList = {
    email_id: emailEl.value,
    password: passwordEl.value,
  };

  let url = "http://localhost:4400/api/login";

  try {
    let { data } = await axios.post(url, _newList);
    let { status, message } = data;
    if (status) {
      window.location.replace("./sample.html");
    } else {
      alert(message);
    }
  } catch (error) {
    alert("Connection / Server Error");
    console.log(error);
  }
});

create.addEventListener("click", (event) => {
  event.preventDefault();
  window.location.replace("./signUp.html");
});

//validation
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

// password validation
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
      case "email":
        checkEmail();
        break;
      case "password":
        checkPassword();
        break;
    }
  })
);
