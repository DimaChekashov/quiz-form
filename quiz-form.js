const QUIZ_TYPE = {
    sigle: "single",
    input: "input",
    multipy: "multipy",
};

const quizForm = (formId) => {
    const form = document.getElementById(formId);
    const radio = document.querySelector(
        "#" + formId + " .quiz-checkbox input[checkbox-success]"
    );
    const button = document.querySelector("#" + formId + " .quiz-button");
    const alertSuccess = document.querySelector(
        "#" + formId + " .quiz-alert[alert-success]"
    );
    const alertError = document.querySelector(
        "#" + formId + " .quiz-alert[alert-error]"
    );

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        button.classList.add("quiz-hide");

        if (radio.checked) {
            alertSuccess.classList.remove("quiz-hide");
        } else {
            alertError.classList.remove("quiz-hide");
        }
    });
};

quizForm("paris-town");

// console.log(
//     document.querySelectorAll("[quiz-form]")[0].getAttribute("form-type")
// );
