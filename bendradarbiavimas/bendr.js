document.addEventListener("DOMContentLoaded", function () {
    
    const form = document.getElementById("collab-form");
    const btnStyle = document.getElementById("btn-style");
    const btnToggle = document.getElementById("btn-toggle");
    const dataContainer = document.getElementById("data-container");
    const tableBody = document.getElementById("data-body");
    const tableTitle = document.getElementById("table-title");

    // 1 PUNKTAS: Formos validacija
    form.addEventListener("submit", function (e) {
        e.preventDefault(); // Sustabdome standartinį formos siuntimą

        let isValid = true;

        // Išvalome senas klaidas
        document.querySelectorAll(".text-danger").forEach(el => {
            el.style.display = "none";
            el.innerHTML = "";
        });

        const vardas = document.getElementById("vardas").value.trim();
        const email = document.getElementById("email").value.trim();
        const telefono = document.getElementById("telefono").value.trim();
        const terminas = document.getElementById("terminas").value;
        const biudzetas = document.getElementById("biudzetas").value.trim();
        const zinute = document.getElementById("zinute").value.trim();
        const sutinku = document.getElementById("sutinku").checked;
        const tipasElement = document.querySelector('input[name="tipas"]:checked');
        const tipas = tipasElement ? tipasElement.value : "";
        const irankis = document.getElementById("irankis").value;

        // a. Tikriname, ar tušti
        if (vardas === "") {
            showError("vardas-error", "Vardas privalo būti užpildytas.");
            isValid = false;
        }

        if (email === "") {
            showError("email-error", "El. paštas privalo būti užpildytas.");
            isValid = false;
        }

        if (telefono === "") {
            showError("telefono-error", "Telefono numeris privalo būti užpildytas.");
            isValid = false;
        } else if (!/^[0-9]+$/.test(telefono)) {
            showError("telefono-error", "Telefono numeris turi būti sudarytas tik iš skaičių.");
            isValid = false;
        }

        if (terminas === "") {
            showError("terminas-error", "Pageidaujamas terminas privalo būti pasirinktas.");
            isValid = false;
        }

        if (zinute === "") {
            showError("zinute-error", "Žinutė privalo būti užpildyta.");
            isValid = false;
        }

        if (tipas === "") {
            showError("tipas-error", "Pasirinkite projekto tipą.");
            isValid = false;
        }

        if (!sutinku) {
            showError("sutinku-error", "Turite sutikti, kad su jumis būtų susisiekta.");
            isValid = false;
        }

        // b. Tikriname, ar biudžetas yra SVEIKAS ir TEIGIAMAS skaičius
        const biudzetasNum = Number(biudzetas);
        if (biudzetas === "" || !Number.isInteger(biudzetasNum) || biudzetasNum <= 0) {
            showError("biudzetas-error", "Biudžetas turi būti įvestas kaip sveikas teigiamas skaičius (pvz., 100).");
            isValid = false;
        }

        // 2 PUNKTAS: Asinchroninis komunikavimas su serveriu (Fetch API)
        if (isValid) {
            // Konvertuojame į JSON objektą
            const formData = {
                title: vardas,
                body: zinute,
                email: email,
                phone: telefono,
                deadline: terminas,
                userId: biudzetasNum,
                projectType: tipas,
                tool: irankis,
                consent: sutinku
            };

            // Siunčiame duomenis į jsonplaceholder API
            fetch("https://jsonplaceholder.typicode.com/posts", {
                method: "POST",
                body: JSON.stringify(formData),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
            })
            .then(response => response.json())
            .then(data => {
                alert("Duomenys sėkmingai išsiųsti ir gauti atgal!");
                // Pridedame gautus duomenis į HTML lentelę
                addRowToTable(data);
                form.reset(); // Išvalome formą
            })
            .catch(error => console.error("Klaida:", error));
        }
    });

    // Funkcija klaidų rodymui HTML tekstu
    function showError(elementId, message) {
        const errorEl = document.getElementById(elementId);
        errorEl.innerHTML = message;
        errorEl.style.display = "block";
    }

    // Funkcija lentelės eilutės pridėjimui
    function addRowToTable(data) {
        const tr = document.createElement("tr");

        let tipasText = "";
        if (data.projectType === "map") {
            tipasText = "Žemėlapis";
        } else if (data.projectType === "visualization") {
            tipasText = "Vizualizacija";
        }

        let irankisText = "";
        if (data.tool === "keplergl") {
            irankisText = "KeplerGL";
        } else if (data.tool === "qgis") {
            irankisText = "QGIS";
        } else if (data.tool === "arcgis") {
            irankisText = "ArcGIS";
        }

        tr.innerHTML = `
            <td>${data.id}</td>
            <td>${data.title}</td>
            <td>${data.email}</td>
            <td>${data.phone}</td>
            <td>${data.deadline}</td>
            <td>${data.userId} €</td>
            <td>${tipasText}</td>
            <td>${irankisText}</td>
            <td>${data.body}</td>
            <td>
                <!-- 3 PUNKTAS: Mygtukas Delete elementų ištrynimui -->
                <button class="btn btn-danger btn-sm btn-delete" type="button">Delete</button>
            </td>
        `;

        tableBody.appendChild(tr);

        // Priskiriame trynimo funkcionalumą naujam mygtukui
        tr.querySelector(".btn-delete").addEventListener("click", function () {
            tr.remove(); // Ištrina HTML elementą (lentelės eilutę)
        });
    }

        
    // 4 PUNKTAS: HTML elemento stiliaus pakeitimas (Temos keitimas visam puslapiui)
    btnStyle.addEventListener("click", function () {
        // Toggle prideda klasę, jeigu jos nėra, arba nuima, jeigu ji yra
        document.body.classList.toggle("pink-theme");
        
        // Pakeičiame paties mygtuko išvaizdą ir tekstą
        if (document.body.classList.contains("pink-theme")) {
            btnStyle.textContent = "Grąžinti žalią temą";
            btnStyle.style.backgroundColor = "#b85c75";
            btnStyle.style.color = "white";
            btnStyle.style.borderColor = "#b85c75";
        } else {
            btnStyle.textContent = "Change style (Rožinė tema)";
            btnStyle.style.backgroundColor = "#626f47"; // Jūsų tamsiai žalia
            btnStyle.style.color = "white";
            btnStyle.style.borderColor = "#626f47";
        }
    });

    // 5 PUNKTAS: HTML elemento parodymas/paslėpimas (Show/Hide)
    btnToggle.addEventListener("click", function () {
        if (dataContainer.style.display === "none") {
            dataContainer.style.display = "block";
            btnToggle.textContent = "Hide (Paslėpti)";
        } else {
            dataContainer.style.display = "none";
            btnToggle.textContent = "Show (Parodyti)";
        }
    });

});