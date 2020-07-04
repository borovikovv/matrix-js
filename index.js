const input = document.getElementById('m_input')
console.log(input.event.value);

function getRandom() {
    return Math.floor(Math.random() * 900) + 100; 
}

function incrementAmount(num) {
    return num++;
}

function createMatrix(m, n) {
    let newId = 1;
    let array = [];

    for(let i = 0; i < m; i++) {
        array[i] = [];
        for(let j = 0; j < n; j++) {
            let number = getRandom();
            array[i][j] = {amount: number, id: newId++};
        }
    }

    return array;
}

const matrix = createMatrix(10, 10);

function findSumRow() {
    let sumRow = [];
    let sum;

    for(let i = 0; i < matrix.length; i++) {
        sum = matrix[i].reduce((acc, item) => acc + item['amount'], 0)
        sumRow.push({sum: sum});
    }

    return sumRow;
}

function findColArithmeticMean() {
    let colArithmeticMean = [];

    for(let i = 0; i < matrix.length; i++) {
        let sum = 0;
        let arithmeticMean = 0;
        for(let j = 0; j < matrix[i].length; j++) {
            sum += matrix[j][i]['amount'];
        }
        arithmeticMean =  Math.floor(sum / matrix[i].length);
        colArithmeticMean.push({col: arithmeticMean})
    }

    return colArithmeticMean;
}

function displayMatrix() {
    const elem = document.getElementById('matrix');

    for(let i = 0; i < matrix.length; i++) {
        const div = document.createElement('div');
        div.classList.add('row');
        elem.appendChild(div)

        for(let j = 0; j < matrix[i].length; j++) {
            let span = document.createElement('span');
            span.classList.add('object');
            span.innerHTML = matrix[i][j]['amount'];
            span.onclick = () => incrementAmount(matrix[i][j]['amount']);
            div.appendChild(span)
        }
    }
}    

displayMatrix();
console.log(findColArithmeticMean())
console.log(findSumRow());