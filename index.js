function input() {
    const inputM = document.querySelectorAll('.input')[0].value;
    const inputN = document.querySelectorAll('.input')[1].value;

    const matrix = createMatrix(inputM, inputN);

    if(inputM && inputN) {
        displayMatrix(matrix)
    }
}

function getRandom() {
    return Math.floor(Math.random() * 900) + 100; 
}

function incrementAmount(id, matrix, colArithmeticsMean, rowSum) {
    const elem = document.getElementById(id);
    let incrementNum;
    let rowIdx = 0;
    let colIdx = 0;

    matrix.forEach((arr, idx) => {
    
        arr.forEach((item, index) => {
            if(item.id === id) {
                rowIdx = idx;
                colIdx = index;
                incrementNum = ++matrix[idx][index]['amount']
            }
        })
    })

    elem.innerHTML = incrementNum;

    changeSumRow(rowSum, rowIdx);
    changeColArithmeticsMean(matrix, colArithmeticsMean, rowIdx, colIdx)
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

function findSumRow(matrix) {
    const elem = document.getElementById('sum-row');
    let sumRow = [];
    let sum;

    for(let i = 0; i < matrix.length; i++) {
        const div = document.createElement('div');
        elem.appendChild(div)

        sum = matrix[i].reduce((acc, item) => acc + item['amount'], 0)
        sumRow.push({sum: sum});

        div.innerHTML = sum;
        div.classList.add('sum-row');
    }

    return sumRow;
}

function findColArithmeticMean(matrix) {
    let colArithmeticMean = [];
    const elem = document.getElementById('col-arr');

    for(let i = 0; i < matrix.length; i++) {
        let sum = 0;
        let arithmeticMean = 0;
        const span = document.createElement('span');
        elem.appendChild(span)

        for(let j = 0; j < matrix[i].length; j++) {
            sum += matrix[j][i]['amount'];
        }
        arithmeticMean =  Math.floor(sum / matrix[i].length);
        colArithmeticMean.push({col: arithmeticMean})

        span.innerHTML = arithmeticMean;
        span.classList.add('col-arr-mean');
    }


    return colArithmeticMean;
}

function changeSumRow(arr, idx) {
    const elemList = document.querySelectorAll('.sum-row');
    let elem;

    for(let i = 0; i < elemList.length; i++) {
        let item = elemList[i];
        if(Number(item.innerHTML) === arr[idx]['sum']) {
            elem = item;
        }
    }
    
    elem.innerHTML = ++arr[idx]['sum'];
}

function changeColArithmeticsMean(matrix, arr, rowIdx, colIdx) {
    const elemList = document.querySelectorAll('.col-arr-mean');
    let colArithmeticMean;
    let sum = 0;
    
    for(let i = 0; i < matrix.length; i++) {
        sum += matrix[i][colIdx]['amount'];
    }

    colArithmeticMean = sum / matrix.length;
    elemList[colIdx].innerHTML = Math.floor(colArithmeticMean)
}

function displayMatrix(matrix) {
    const elem = document.getElementById('matrix');

    for(let i = 0; i < matrix.length; i++) {
        const div = document.createElement('div');
        div.classList.add('row');
        elem.appendChild(div)

        for(let j = 0; j < matrix[i].length; j++) {
            let span = document.createElement('span');
            span.classList.add('object');
            span.id = matrix[i][j]['id']
            span.innerHTML = matrix[i][j]['amount'];
            span.onclick = () => incrementAmount(matrix[i][j]['id'], matrix, colArithmeticsMean, rowSum);
            div.appendChild(span)
        }
    }
    
    const colArithmeticsMean = findColArithmeticMean(matrix);
    const rowSum = findSumRow(matrix);
}