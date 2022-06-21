const QUIZ_TYPE = {
    sigle: "single",
    input: "input",
    multipy: "multipy",
};

const quizForm = (formId, formType) => {
    const form = document.getElementById(formId);
    const button = document.querySelector("#" + formId + " .quiz-button");
    const alertSuccess = document.querySelector(
        "#" + formId + " .quiz-alert[alert-success]"
    );
    const alertError = document.querySelector(
        "#" + formId + " .quiz-alert[alert-error]"
    );

    switch (formType) {
        case QUIZ_TYPE.sigle:
            quizSingle();
            break;
        case QUIZ_TYPE.input:
            quizInput();
            break;
        case QUIZ_TYPE.multipy:
            quizMultipy();
            break;
    }

    function quizSingle() {
        const radio = document.querySelector(
            "#" + formId + " .quiz-checkbox input[checkbox-success]"
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
    }

    function quizInput() {
        
    }

    function quizMultipy() {
        const checkboxsError = document.querySelectorAll(
            "#" + formId + " .quiz-checkbox input[checkbox-error]"
        );
        const checkboxsSuccess = document.querySelectorAll(
            "#" + formId + " .quiz-checkbox input[checkbox-success]"
        );
        let statusOne,
            statusSecond,
            statusThird = true;

        form.addEventListener("submit", (e) => {
            e.preventDefault();

            statusOne = checkboxsSuccess[0].checked;
            statusSecond = checkboxsSuccess[1].checked;

            checkboxsError.forEach((checkbox) => {
                if (checkbox.checked) {
                    statusThird = false;
                }
            });

            button.classList.add("quiz-hide");

            if (statusOne && statusSecond && statusThird) {
                alertSuccess.classList.remove("quiz-hide");
            } else {
                alertError.classList.remove("quiz-hide");
            }
        });
    }
};

const quizForms = document.querySelectorAll("[quiz-form]");

quizForms.forEach((form) =>
    quizForm(form.getAttribute("id"), form.getAttribute("form-type"))
);
