document.addEventListener("DOMContentLoaded", function () {
    // Pagrindiniai puslapio elementai, su kuriais dirbs JavaScript
    const form = document.getElementById("collab-form");
    const btnStyle = document.getElementById("btn-style");
    const btnToggle = document.getElementById("btn-toggle");
    const dataContainer = document.getElementById("data-container");
    const tableBody = document.getElementById("data-body");
    const tableTitle = document.getElementById("table-title");

    // 1 punktas: formos validacija
    form.addEventListener("submit", function (e) {
        e.preventDefault(); // Sustabdomas standartinis formos siuntimas

        let isValid = true;

        // Išvalomos anksčiau rodytos klaidos
        document.querySelectorAll(".text-danger").forEach((el) => {
            el.style.display = "none";
            el.innerHTML = "";
        });

        // Paimamos visų formos laukų reikšmės
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

        // Tikrinama, ar privalomi laukai nėra tušti
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

        // Tikrinama, ar biudžetas yra sveikas teigiamas skaičius
        const biudzetasNum = Number(biudzetas);
        if (biudzetas === "" || !Number.isInteger(biudzetasNum) || biudzetasNum <= 0) {
            showError(
                "biudzetas-error",
                "Biudžetas turi būti įvestas kaip sveikas teigiamas skaičius (pvz., 100)."
            );
            isValid = false;
        }

        // 2 punktas: asinchroninis duomenų siuntimas į serverį
        if (isValid) {
            // Paruošiamas JSON objektas siuntimui
            const formData = {
                title: vardas,
                body: zinute,
                email: email,
                phone: telefono,
                deadline: terminas,
                suma: biudzetasNum,
                projectType: tipas,
                tool: irankis,
                consent: sutinku
            };

            // Siunčiami duomenys į testinį API
            fetch("https://jsonplaceholder.typicode.com/posts", {
                method: "POST",
                body: JSON.stringify(formData),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
                .then((response) => response.json())
                .then((data) => {
                    alert("Duomenys sėkmingai išsiųsti ir gauti atgal!");

                    // Gauti duomenys pridedami į lentelę
                    addRowToTable(data);

                    // Forma išvaloma po sėkmingo siuntimo
                    form.reset();
                })
                .catch((error) => console.error("Klaida:", error));
        }
    });

    // Funkcija klaidų parodymui prie konkretaus lauko
    function showError(elementId, message) {
        const errorEl = document.getElementById(elementId);
        errorEl.innerHTML = message;
        errorEl.style.display = "block";
    }

    // Funkcija naujai eilutei pridėti į lentelę
    function addRowToTable(data) {
        const tr = document.createElement("tr");

        // Projekto tipo reikšmės pavertimas į vartotojui suprantamą tekstą
        let tipasText = "";
        if (data.projectType === "map") {
            tipasText = "Žemėlapis";
        } else if (data.projectType === "visualization") {
            tipasText = "Vizualizacija";
        }

        // Įrankio reikšmės pavertimas į vartotojui suprantamą tekstą
        let irankisText = "";
        if (data.tool === "keplergl") {
            irankisText = "KeplerGL";
        } else if (data.tool === "qgis") {
            irankisText = "QGIS";
        } else if (data.tool === "arcgis") {
            irankisText = "ArcGIS";
        }

        // Naujos eilutės HTML turinys
        tr.innerHTML = `
            <td>${data.title}</td>
            <td>${data.email}</td>
            <td>${data.phone}</td>
            <td>${data.deadline}</td>
            <td>${data.suma} €</td>
            <td>${tipasText}</td>
            <td>${irankisText}</td>
            <td>${data.body}</td>
            <td>
                <!-- 3 punktas: mygtukas eilutės ištrynimui -->
                <button class="btn btn-danger btn-sm btn-delete" type="button">Delete</button>
            </td>
        `;

        // Eilutė pridedama į lentelės turinį
        tableBody.appendChild(tr);

        // Priskiriamas naujos eilutės trynimo funkcionalumas
        tr.querySelector(".btn-delete").addEventListener("click", function () {
            tr.remove();
        });
    }

    // 4 punktas: viso puslapio temos keitimas
    btnStyle.addEventListener("click", function () {
        // Įjungiama arba išjungiama rožinė tema
        document.body.classList.toggle("pink-theme");

        // Keičiamas paties mygtuko tekstas ir išvaizda pagal aktyvią temą
        if (document.body.classList.contains("pink-theme")) {
            btnStyle.textContent = "Grąžinti žalią temą";
            btnStyle.style.backgroundColor = "#b85c75";
            btnStyle.style.color = "white";
            btnStyle.style.borderColor = "#b85c75";
        } else {
            btnStyle.textContent = "Change style (Rožinė tema)";
            btnStyle.style.backgroundColor = "#626f47";
            btnStyle.style.color = "white";
            btnStyle.style.borderColor = "#626f47";
        }
    });

    // 5 punktas: lentelės parodymas ir paslėpimas
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