const QUIZ_TYPE = {
    default: "default",
    input: "input",
    multipy: "multipy",
};

const checkAnswer = async (id, variant) => {
    const response = await fetch("https://rebrainme.com/quiz-checker", {
        method: "POST",
        body: JSON.stringify({
            quiz_id: id,
            answer_ids: variant,
        }),
    });

    return response.json();
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
        case QUIZ_TYPE.default:
            quizCheckboxRadio();
            break;
        case QUIZ_TYPE.input:
            quizInput();
            break;
    }

    function quizInput() {
        const input = document.querySelector("#" + formId + " .quiz-input");

        form.addEventListener("submit", (e) => {
            e.preventDefault();

            checkAnswer(formId, [input.value]).then((data) => {
                const result = data.correct[input.value];
                showAlerts(result);
                if (result) {
                    comleteQuiz();
                }
            });
        });
    }

    function quizCheckboxRadio() {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const checkboxs = document.querySelectorAll(
                "#" + formId + " .quiz-checkbox input"
            );
            const checkboxAtributesAll = [];
            const selected = [];

            checkboxs.forEach((checkbox) => {
                const id = checkbox.getAttribute("id");

                checkboxAtributesAll.push(id);

                if (checkbox.checked) {
                    selected.push(id);
                }
            });

            btnLoading();

            checkAnswer(formId, checkboxAtributesAll).then((res) => {
                if (res.status === "ok") {
                    const correctAnswers = new Set();

                    for (let answer in res.correct) {
                        if (res.correct[answer]) {
                            correctAnswers.add(answer);

                            document
                                .querySelector(
                                    "#" +
                                        formId +
                                        " .quiz-checkbox input#" +
                                        answer
                                )
                                .parentElement.setAttribute(
                                    "checkbox-success",
                                    ""
                                );
                        }
                    }

                    comleteQuiz();
                    showAlerts(
                        selected.length === correctAnswers.size &&
                            selected.every((id) => correctAnswers.has(id))
                    );
                }
            });
        });
    }

    function showAlerts(condition) {
        if (condition) {
            alertError.classList.add("quiz-hide");
            alertSuccess.classList.remove("quiz-hide");
        } else {
            alertSuccess.classList.add("quiz-hide");
            alertError.classList.remove("quiz-hide");
        }
    }

    function btnLoading() {
        button.innerText = "Проверка";
    }

    function comleteQuiz() {
        button.classList.add("quiz-hide");
        form.classList.add("completed");
    }
};

const quizForms = document.querySelectorAll("[quiz-form]");

if (quizForms) {
    quizForms.forEach((form) =>
        quizForm(form.getAttribute("id"), form.getAttribute("form-type"))
    );
}

const showBtns = document.querySelectorAll("[show-hide-block]");

if (showBtns) {
    showBtns.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            const block = document.querySelector(
                `[hide-block="${btn.getAttribute("show-hide-block")}"]`
            );

            block.classList.add("show-hide-block");

            setTimeout(() => {
                window.scrollTo({
                    top: block.offsetTop + +btn.getAttribute("topPixel"),
                    behavior: "smooth",
                });
            }, 100);
        });
    });
}
