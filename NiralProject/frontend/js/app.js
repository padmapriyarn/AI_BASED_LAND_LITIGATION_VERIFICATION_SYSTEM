async function searchLand() {
    const district = document.getElementById("district").value.toLowerCase();
    const village = document.getElementById("village").value.toLowerCase();
    const survey = document.getElementById("survey").value;

    const resultDiv = document.getElementById("result");
    const searchBtn = document.querySelector(".container button");
    resultDiv.innerHTML = `
        <div class="loading-box">
            <div class="loader"></div>
            <h3>Searching Land Records...</h3>
            <p>தகவல்கள் தேடப்படுகிறது. தயவுசெய்து காத்திருக்கவும்...</p>
        </div>
    `;
    searchBtn.disabled = true;
    searchBtn.innerHTML = "Searching...";
    await new Promise(resolve => setTimeout(resolve, 2000));
    const response = await fetch("http://localhost:5000/api/land");
    const data = await response.json();

    const land = data.find(item =>
    item.survey_number === survey &&
    item.district.toLowerCase() === district &&
    item.village.toLowerCase() === village
    );

    if (land) {
        searchBtn.disabled = false;
        searchBtn.innerHTML = "Search / தேடு";

        let statusColor = "green";
        if (land.status === "Closed") {
             statusColor = "green";
        }

        if (land.status === "Rejected") {
            statusColor = "red";
        }

        if (land.status === "Pending") {
            statusColor = "orange";
        }
            resultDiv.innerHTML = `
                <div class="result-card">

                <div class="report-header">

                <div>

                <h2>
                📋 Land Verification Report /
                நில சரிபார்ப்பு அறிக்கை
                </h2>

                <p class="gov-name">
                Government of Tamil Nadu<br>
                தமிழ்நாடு அரசு
                </p>

                </div>

                <img src="assets/qr.png"
                class="qr-code">

                </div>

                <table class="result-table">

                <tr>
                <td>👤 Owner Name / உரிமையாளர் பெயர்</td>
                <td>${land.owner_name}</td>
                </tr>

                <tr>
                <td>📍 District / மாவட்டம்</td>
                <td>${land.district}</td>
                </tr>

                <tr>
                <td>🏡 Village / கிராமம்</td>
                <td>${land.village}</td>
                </tr>

                <tr>
                <td>📑 Survey Number / சர்வே எண்</td>
                <td>${land.survey_number}</td>
                </tr>

                <tr>
                <td>📝 Patta Number / பட்டா எண்</td>
                <td>${land.patta_number}</td>
                </tr>

                <tr>
                <td>🌾 Land Area / நில அளவு</td>
                <td>${land.land_area}</td>
                </tr>

                <tr>
                <td>🏞 Land Type / நில வகை</td>
                <td>${land.land_type}</td>
                </tr>

                </table>

                ${
                land.case_number
                ?
                `
                <div class="result-row">
                    <span class="result-label">⚖ Case Number / வழக்கு எண்</span>
                    <span class="result-value">${land.case_number}</span>
                </div>

                <div class="result-row">
                    <span class="result-label">🏛 Court Name / நீதிமன்றம்</span>
                    <span class="result-value">${land.court_name}</span>
                </div>

                <div class="result-row">
                    <span class="result-label">📂 Case Type / வழக்கு வகை</span>
                    <span class="result-value">${land.case_type}</span>
                </div>
                `
                :
                `
                <div class="safe-badge">
                ✅ No Litigation Found / நில வழக்கு இல்லை
                </div>
                `
                }

                <div class="result-row">
                    <span class="result-label">📌 Status / நிலை</span>

                    <span class="result-value" style="color:${statusColor};font-weight:bold;">
                        ${land.status}
                    </span>
                </div>

                <br>

                <div class="verify-box">

                <h3>✅ Verification Details / சரிபார்ப்பு விவரங்கள்</h3>

                <p><b>Verification ID / சரிபார்ப்பு எண் :</b> LV-${land.id}</p>

                <p><b>Verified On / சரிபார்க்கப்பட்ட தேதி :</b>
                ${new Date().toLocaleString()}
                </p>

                <p><b>Authority / அதிகாரம் :</b>
                Tamil Nadu Land Records Department
                </p>

                <p><b>Document Status / ஆவண நிலை :</b>
                <span class="verified">✔ Digitally Verified</span>
                </p>

                </div>

                <button onclick='analyzeRisk(${JSON.stringify(land)})' class="ai-btn">
                🤖 AI Risk Analysis / AI அபாய பகுப்பாய்வு
                </button>

                <div id="aiResult"></div>

                </div>
            `;


        
    } else {
        searchBtn.disabled = false;
        searchBtn.innerHTML = "Search / தேடு";
        
        resultDiv.innerHTML = `
            <p style="color:red;">
                No Record Found / பதிவு கிடைக்கவில்லை
            </p>

        `;
    }
}

async function analyzeRisk(land) {

    const aiDiv = document.getElementById("aiResult");

    aiDiv.innerHTML = `
        <p style="color:blue;">
            AI analyzing land risk...
        </p>
    `;

    try {

        const response = await fetch("http://localhost:5000/api/ai-check", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(land)
        });

        const data = await response.json();

        const aiText = data.choices[0].message.content;
        const lines = aiText.split("\n").filter(line => line.trim() !== "");
        const risk = lines[0] || "";
        const reason = lines.slice(1, 3).join("<br>");
        const recommendation = lines.slice(3).join("<br>");

        aiDiv.innerHTML = `
            <div class="ai-box">

            <h2>🤖 AI Litigation Analysis / AI அபாய பகுப்பாய்வு</h2>

            <div class="ai-report">

            <h3>🟢 Risk Level / அபாய நிலை</h3>
            <p>${risk}</p>

            <hr>

            <h3>📝 Reason / காரணம்</h3>
            <p>${reason}</p>

            <hr>

            <h3>💡 Recommendation / பரிந்துரை</h3>
            <p>${recommendation}</p>

            </div>

            </div>
        `;

    } catch (error) {

        aiDiv.innerHTML = `
            <p style="color:red;">
                AI Analysis Failed
            </p>
        `;
    }
}