function updateTable() {
    save();
    
    document.querySelectorAll("tr").forEach( (tr) => tr.remove() );
    
    const table = document.getElementById("table");
    const table_header = document.createElement("tr");
    const table_header_player = document.createElement("th");
    table_header_player.textContent = "Player";
    const table_header_buyin = document.createElement("th");
    table_header_buyin.textContent = "Buy In";
    const table_header_cashout = document.createElement("th");
    table_header_cashout.textContent = "Cash Out";
    table_header.appendChild(table_header_player);
    table_header.appendChild(table_header_buyin);
    table_header.appendChild(table_header_cashout);
    table.append(table_header);
    
    players.forEach((player, index) => {
        const row = document.createElement("tr");

        const tdName = document.createElement("td");
        tdName.textContent = player.name;

        const tdBuyIn = document.createElement("td");
        if (player.buyIn != 0) {
            tdBuyIn.textContent = player.buyIn / 100;
        }
        const btnBuyIn = document.createElement("button");
        btnBuyIn.textContent = "+";
        btnBuyIn.addEventListener("click", () => modifyBuyIn(index));
        tdBuyIn.appendChild(btnBuyIn);

        const tdCashOut = document.createElement("td");
        if (player.cashOut != 0) {
            tdCashOut.textContent = player.cashOut / 100;
        }
        const btnCashOut = document.createElement("button");
        btnCashOut.textContent = "+";
        btnCashOut.addEventListener("click", () => modifyCashOut(index));
        tdCashOut.appendChild(btnCashOut);

        row.append(tdName);
        row.append(tdBuyIn);
        row.append(tdCashOut);

        table.appendChild(row);
    });

    const addRow = document.createElement("tr");
    const tdAddPlayer = document.createElement("td");
    const btnAddPlayer = document.createElement("button");
    btnAddPlayer.textContent = "+";
    btnAddPlayer.addEventListener("click", () => addPlayer());
    tdAddPlayer.appendChild(btnAddPlayer);
    const tdAddEmpty1 = document.createElement("td");
    const tdAddEmpty2 = document.createElement("td");
    addRow.appendChild(tdAddPlayer);
    addRow.appendChild(tdAddEmpty1);
    addRow.appendChild(tdAddEmpty2);
    table.appendChild(addRow);
}

function addPlayer() {
    const name = prompt("Enter new player's name");
    if (name == "") return;
    for (let i = 0; i < players.length; i++) {
        if (players[i].name == name) {
            alert("Player with this name already exists");
            return;
        }
    }
    players.push({ name: name, buyIn: 0, cashOut: 0});
    updateTable();
}

function modifyBuyIn(index) {
    if (players.length <= index) return;
    
    let amount = parseFloat(prompt("Enter buy in amount"));
    if (amount == 0) return;

    amount *= 100;

    if (!Number.isInteger(amount)) {
        alert("Inputs are numbers only with 2 decimal places");
        return;
    }

    if (players[index].buyIn + amount < 0) {
        alert("Total buy in would go negative");
        return;
    }

    players[index].buyIn += amount;
    updateTable();
}

function modifyCashOut(index) {
    if (players.length <= index) return;
    
    let amount = parseFloat(prompt("Enter cash out amount"));
    if (amount == 0) return;

    amount *= 100;

    if (!Number.isInteger(amount)) {
        alert("Inputs are numbers only with 2 decimal places");
        return;
    }

    if (players[index].cashOut + amount < 0) {
        alert("Total cash out would go negative");
        return;
    }

    players[index].cashOut += amount;
    updateTable();
}

updateTable();
