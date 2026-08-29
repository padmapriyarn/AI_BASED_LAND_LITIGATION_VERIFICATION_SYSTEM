async function addRecord() {
    const district = document.getElementById("district").value;
    const village = document.getElementById("village").value;
    const survey = document.getElementById("survey").value;
    const owner = document.getElementById("owner").value;
    const patta = document.getElementById("patta").value;
    const area = document.getElementById("area").value;

    const response = await fetch("http://localhost:5000/api/add-land", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            district,
            village,
            survey,
            owner,
            patta,
            area
        })
    });

    const data = await response.json();

    document.getElementById("message").innerHTML = data.message;
}