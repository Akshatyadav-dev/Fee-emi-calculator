function handleEnter(event) {
    if (event.key === 'Enter') {
        calculate();
    }
}

function calculate() {
    let fee = parseFloat(document.getElementById("fee").value);
    if (!fee) return;

    let emi = Math.round(fee / 15);
    let down = Math.round(emi * 3);

    document.getElementById("downPayment").innerText =
        "3 EMIs at Admission = ₹" + down;

    let totalEmi12 = Math.round(emi * 12);
    document.getElementById("emiTitle").innerText =
        "Finance Amount (EMI 12 Months) : ₹" + totalEmi12;

    let allMonths = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    let start = (new Date().getMonth() + 1) % 12;

    let months = [];
    for (let i = 0; i < 12; i++) {
        months.push(allMonths[(start + i) % 12]);
    }

    let html = "<table>";
    let due = document.getElementById("dueDate").value;

    for (let i = 0; i < 12; i += 3) {
        html += "<tr>";

        for (let j = 0; j < 3; j++) {
            let idx = i + j;
            let amt = emi;

            if (idx === 0) {
                let total = Math.round(amt + 443);

                html += `<td><span>
                    ${months[idx]} EMI : ₹${amt}<br>
                    ₹443 mandate charge + GST<br>
                    Amount : ₹${total}<br>
                    Due Date: ${due} ${months[idx]}
                </span></td>`;
            } else {
                html += `<td><span>
                    ${months[idx]} EMI : ₹${amt}<br>
                    Due Date: ${due} ${months[idx]}
                </span></td>`;
            }
        }

        html += "</tr>";
    }

    html += "</table>";
    document.getElementById("emiList").innerHTML = html;
}

function downloadPDF() {
    const btn = document.querySelector('.btn');
    btn.style.display = 'none';

    const element = document.querySelector('.container');

    html2pdf().from(element).save().then(() => {
        btn.style.display = 'block';
    });
}