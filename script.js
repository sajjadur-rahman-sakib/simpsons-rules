document.getElementById('calculateBtn').addEventListener('click', calculate);

function evaluateFunction(func, x) {
    let expression = func.replace(/x/g, `(${x})`);
    return eval(expression);
}

function trapezoidalRule(func, a, b, n) {
    let h = (b - a) / n;
    let sum = evaluateFunction(func, a) + evaluateFunction(func, b);
    for (let i = 1; i < n; i++) {
        sum += 2 * evaluateFunction(func, a + i * h);
    }

    return (h / 2) * sum;
}

function simpsonsRule(func, a, b, n) {
    if (n % 2 !== 0) {
        n++; 
    }
    
    let h = (b - a) / n;
    let sum = evaluateFunction(func, a) + evaluateFunction(func, b);
    for (let i = 1; i < n; i++) {
        sum += (i % 2 === 0 ? 2 : 4) * evaluateFunction(func, a + i * h);
    }

    return (h / 3) * sum;
}

function calculate() {
    let func = document.getElementById('function').value;
    let a = parseFloat(document.getElementById('a').value);
    let b = parseFloat(document.getElementById('b').value);
    let n = parseInt(document.getElementById('n').value);
    let trueValue = parseFloat(document.getElementById('trueValue').value);

    if (n < 2) {
        alert("Number of intervals (n) must be at least 2.");
        return;
    }

    let trapResult = trapezoidalRule(func, a, b, n);
    let simpResult = simpsonsRule(func, a, b, n);
    let trapError = Math.abs(trueValue - trapResult);
    let simpError = Math.abs(trueValue - simpResult);

    document.getElementById('trapResult').innerText = `Trapezoidal Rule Result: ${trapResult.toFixed(5)}`;
    document.getElementById('trapError').innerText = `Trapezoidal Rule Error: ${trapError.toFixed(5)}`;
    document.getElementById('simpResult').innerText = `Simpson’s Rule Result: ${simpResult.toFixed(5)}`;
    document.getElementById('simpError').innerText = `Simpson’s Rule Error: ${simpError.toFixed(5)}`;

    plotGraph(func, a, b, n);
}

function plotGraph(func, a, b, n) {
    let xValues = [];
    let yValues = [];
    let step = (b - a) / 100;
    for (let x = a; x <= b; x += step) {
        xValues.push(x);
        yValues.push(evaluateFunction(func, x));
    }

    let trace = {
        x: xValues,
        y: yValues,
        mode: 'lines',
        name: 'Function',
        line: { color: '#4CAF50' }
    };

    Plotly.newPlot('plot', [trace], {
        title: 'Function Plot',
        xaxis: { title: 'x' },
        yaxis: { title: 'f(x)' },
        margin: { t: 50, r: 20, l: 40, b: 40 }
    });
}
