const QUIZ_TYPE = {
    sigle: "single",
    input: "input",
    multipy: "multipy",
};

const checkAnswer = async (id, variant) => {
    const response = await fetch("https://rebrainme.com/quiz-checker", {
        method: "POST",
        body: JSON.stringify({
            quiz_id: id,
            answer_id: variant,
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
        const radios = document.querySelectorAll(
            "#" + formId + " .quiz-checkbox input"
        );

        form.addEventListener("submit", (e) => {
            e.preventDefault();

            button.innerText = "Загрузка";

            radios.forEach((radio) => {
                if (radio.checked) {
                    checkAnswer(formId, +radio.getAttribute("count")).then(
                        (res) => {
                            button.classList.add("quiz-hide");
                            form.classList.add("completed");

                            if (res.correct) {
                                alertSuccess.classList.remove("quiz-hide");
                            } else {
                                alertError.classList.remove("quiz-hide");
                            }
                        }
                    );
                }
            });
        });
    }

    function quizInput() {
        const input = document.querySelector(".quiz-input");

        form.addEventListener("submit", (e) => {
            e.preventDefault();

            button.classList.add("quiz-hide");
            form.classList.add("completed");

            checkAnswer(formId, input).then((data) => {
                if (data.correct) {
                    alertSuccess.classList.remove("quiz-hide");
                } else {
                    alertError.classList.remove("quiz-hide");
                }
            });
        });
    }

    function quizMultipy() {
        const statuses = {};
        let rightVariantCount = 1;

        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const checkboxs = document.querySelectorAll(
                "#" + formId + " .quiz-checkbox input"
            );
            let statusCount = checkboxs.length;

            button.innerText = "Загрузка";

            checkboxs.forEach((checkbox, i) => {
                checkAnswer(formId, +checkbox.getAttribute("count")).then(
                    (res) => {
                        statuses[i] = {
                            status: res.correct,
                            checked: checkbox.checked,
                        };
                        statusCount--;

                        if (statusCount <= 0) {
                            for (let key in statuses) {
                                if (
                                    statuses[key].status ===
                                        statuses[key].checked &&
                                    statuses[key].status === true
                                ) {
                                    rightVariantCount--;
                                } else if (
                                    statuses[key].status === false &&
                                    statuses[key].checked
                                ) {
                                    rightVariantCount++;
                                }
                            }

                            button.classList.add("quiz-hide");
                            form.classList.add("completed");
                            if (rightVariantCount <= 0) {
                                alertSuccess.classList.remove("quiz-hide");
                            } else {
                                alertError.classList.remove("quiz-hide");
                            }
                        }
                    }
                );
            });
        });
    }
};

const quizForms = document.querySelectorAll("[quiz-form]");

quizForms.forEach((form) =>
    quizForm(form.getAttribute("id"), form.getAttribute("form-type"))
);
