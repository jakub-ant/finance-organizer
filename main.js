const root = document.documentElement;
const transactionTypeSelect = document.querySelector("#transaction-type")
const transactionKindSelect = document.querySelector("#transaction-kind")
const firstPageContainer = document.querySelector(".first-page-container")
const secondPageContainer = document.querySelector(".second-page-container")
const addTransaction = document.querySelector(".add-transaction")
const styleWhite = document.querySelector(".style-white")
const styleDark = document.querySelector(".style-dark")

let editMode = false

const transactionOptions = {
    revenue: [{
        pl: "wypłata",
        en: 'salary'
    }, {
        pl: "zasiłek",
        en: 'allowance'
    }, {
        pl: "stypendium",
        en: 'stipend'
    }],
    expense: [{
        pl: "zakupu",
        en: 'shopping'
    }, {
        pl: "rachunki",
        en: 'bills'
    }, {
        pl: "kredyt",
        en: 'credit'
    }]
}



function clearSelect() {
    transactionKindSelect.querySelectorAll('option').forEach(option => option.remove())
}
const setOptions = () => {
    const transactionType = transactionTypeSelect.value;

    function createOption(option) {
        const newOption = document.createElement('option');
        newOption.textContent = option.pl;
        newOption.value = option.en;
        transactionKindSelect.appendChild(newOption);
    }
    clearSelect()
    switch (transactionType) {
        case "revenue":
            transactionOptions.revenue.forEach(option => {
                createOption(option)
            })
            break;
        case "expense":
            transactionOptions.expense.forEach(option => {
                createOption(option)
            })
            break;

        default:
            break;
    }
}
setOptions()


function showAddTransaction() {
    function add() {
        firstPageContainer.classList.add('opaque')
        secondPageContainer.style.display = "block"
        editMode = true
    }
    add()

    function addListener() {
        document.addEventListener('click', detectClickOutsideSecondContainer)
    }
    setTimeout(addListener, 100)
}

const hideAddTransaction = () => {
    firstPageContainer.classList.remove('opaque');
    secondPageContainer.style.display = "none";
    editMode = false
    document.removeEventListener('click', detectClickOutsideSecondContainer)
}

transactionTypeSelect.addEventListener('change', setOptions)

function detectClickOutsideSecondContainer(e) {
    if (!editMode) return
    const classList = [];
    e.path.forEach(path => {
        if (path.className === undefined) return
        const classNames = path.className.split(' ');
        classNames.forEach(className => classList.push(className))
    })
    if (!classList.includes('second-page-container')) hideAddTransaction()
}



addTransaction.addEventListener('click', showAddTransaction)


styleWhite.addEventListener('click', () => {
    setTimeout(() => {
        root.style.setProperty('--font-color', "rgb(24, 20, 20)");
        root.style.setProperty('--background-color', "rgb(236, 236, 225)");
    }, 50)

})

styleDark.addEventListener('click', () => {
    setTimeout(() => {
        root.style.setProperty('--font-color', "rgb(200, 200, 200)");
        root.style.setProperty('--background-color', "rgb(24, 20, 20)");
    }, 50)
})