const root = document.documentElement;
const transactionTypeSelect = document.querySelector("#transaction-type")
const transactionKindSelect = document.querySelector("#transaction-kind")
const amount = document.querySelector('#amount')
const firstPageContainer = document.querySelector(".first-page-container")
const secondPageContainer = document.querySelector(".second-page-container")
const addTransaction = document.querySelector(".add-transaction")
const styleWhite = document.querySelector(".style-white")
const styleDark = document.querySelector(".style-dark");
const revenuesList = document.querySelector("#revenuesList");
const expensesList = document.querySelector("#expensesList");
const addPosition = document.querySelector('.add-position');
const deleteAll = document.querySelector('.delete-all');
const availableMoney = document.querySelector('#available-money');

let editMode = false;

class Transaction {
    constructor(type, amount) {
        this.type = type;
        this.amount = amount
    }
};

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
        pl: "zakupy",
        en: 'shopping'
    }, {
        pl: "rachunki",
        en: 'bills'
    }, {
        pl: "kredyt",
        en: 'credit'
    }]
};

const transactions = {
    expenses: [],
    revenues: []
};


function removeChildren(parent, selector) {
    parent.querySelectorAll(selector).forEach(child => child.remove())
};
const setOptions = () => {
    const transactionType = transactionTypeSelect.value;

    function createOption(option) {
        const newOption = document.createElement('option');
        newOption.textContent = option.pl;
        newOption.value = option.pl;
        newOption.dataset.englishName = option.en;
        transactionKindSelect.appendChild(newOption);
    }
    // clearSelect()
    removeChildren(transactionKindSelect, 'option');
    switch (transactionType) {
        case "revenue":
            transactionOptions.revenue.forEach(option => {
                createOption(option);
            });
            break;
        case "expense":
            transactionOptions.expense.forEach(option => {
                createOption(option);
            });
            break;

        default:
            break;
    }
};
setOptions()

function showAddTransaction() {
    function add() {
        firstPageContainer.classList.add('opaque');
        secondPageContainer.style.display = "block";
        editMode = true;
    }
    add();

    function addListener() {
        document.addEventListener('click', detectClickOutsideSecondContainer);
    }
    setTimeout(addListener, 100);
};

const hideAddTransaction = () => {
    firstPageContainer.classList.remove('opaque');
    secondPageContainer.style.display = "none";
    editMode = false;
    document.removeEventListener('click', detectClickOutsideSecondContainer);
};


function detectClickOutsideSecondContainer(e) {
    if (!editMode) {
        return;
    } else {
        const classList = [];
        e.path.forEach(path => {
            if (path.className === undefined) return;
            const classNames = path.className.split(' ');
            classNames.forEach(className => classList.push(className));
        })
        if (!classList.includes('second-page-container')) {
            hideAddTransaction()
        } else {
            return;
        }
    }
};

function renderTransactions() {
    function createLi(type, amount) {
        const newLi = document.createElement('li');
        newLi.classList.add("transaction-list-element");
        newLi.innerHTML = `<i class="fas fa-money-bill-wave-alt"></i> <span class="transaction-type">${type};</span> <span>wartość: </span><span>${amount}</span>`;
        return newLi;
    }
    removeChildren(expensesList, 'li');
    removeChildren(revenuesList, 'li');

    transactions.expenses.forEach(el => {
        const newLi = createLi(el.type, el.amount);
        expensesList.appendChild(newLi);
    })
    transactions.revenues.forEach(el => {
        const newLi = createLi(el.type, el.amount);
        revenuesList.appendChild(newLi);
    })
    availableMoney.textContent = sumTransactions();

};
renderTransactions()

function addNewTransaction(transactionType, transactionKind, amount) {

    switch (transactionType) {
        case 'revenue':
            transactions.revenues.push(new Transaction(transactionKind, amount));
            break;
        case 'expense':
            transactions.expenses.push(new Transaction(transactionKind, amount));
            break;

        default:
            break;
    }

    renderTransactions();

};

function deleteAllTransactions() {
    transactions.revenues.length = 0;
    transactions.expenses.length = 0;
    renderTransactions();
};

function sumTransactions() {
    let revenues = 0;
    let expenses = 0;
    let sum = 0;
    transactions.revenues.forEach(obj => revenues += +obj.amount);
    transactions.expenses.forEach(obj => expenses += +obj.amount);
    console.log(revenues, expenses);

    sum = revenues - expenses;
    return sum;
};

transactionTypeSelect.addEventListener('change', setOptions);

addTransaction.addEventListener('click', showAddTransaction);

styleWhite.addEventListener('click', () => {
    setTimeout(() => {
        root.style.setProperty('--font-color', "rgb(24, 20, 20)");
        root.style.setProperty('--background-color', "rgb(236, 236, 225)");
    }, 50)

});

styleDark.addEventListener('click', () => {
    setTimeout(() => {
        root.style.setProperty('--font-color', "rgb(200, 200, 200)");
        root.style.setProperty('--background-color', "rgb(24, 20, 20)");
    }, 50)
});



addPosition.addEventListener('click', (e) => {
    e.preventDefault();
    addNewTransaction(transactionTypeSelect.value, transactionKindSelect.value, amount.value);
    hideAddTransaction();
});

deleteAll.addEventListener('click', (e) => {
    e.preventDefault();
    deleteAllTransactions();
});