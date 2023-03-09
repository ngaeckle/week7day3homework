const row = document.getElementById('tbody')
let year = 0
let round = 0
function addRow(num,name,nation,sponsor,points, row){
    row.innerHTML += `
    <tr>
        <th scope="row">${num}</th>
        <td>${name}</td>
        <td>${nation}</td>
        <td>${sponsor}</td>
        <td>${points}</td>
    </tr>
    `
}

async function getData(year, round){
    const response = await fetch(`https://ergast.com/api/f1/${year}/${round}/driverStandings.json`)
    const data = await response.json()
    return data
}

async function fun(position, row, year, round){
    const data = await getData(year, round)
    const first_name = data.MRData.StandingsTable.StandingsLists[0].DriverStandings[position].Driver.givenName
    const last_name = data.MRData.StandingsTable.StandingsLists[0].DriverStandings[position].Driver.familyName
    const name = first_name + " " + last_name
    const nation = data.MRData.StandingsTable.StandingsLists[0].DriverStandings[position].Driver.nationality
    const sponsor = data.MRData.StandingsTable.StandingsLists[0].DriverStandings[position].Constructors[0].name
    const points = data.MRData.StandingsTable.StandingsLists[0].DriverStandings[position].points
    addRow(position + 1,name,nation,sponsor,points, row)
}

const infoForm = document.getElementById('infoForm')

infoForm.addEventListener('submit', function(e){
    row.innerHTML = ''
    e.preventDefault()
    const passedround = infoForm.querySelector('#infoRound')
    round = passedround.value
    const passedyear = infoForm.querySelector('#infoYear')
    year = passedyear.value
    for (let i=0; i < 20; i++){
        fun(i, row, year, round)
    }
})

//fun(0, row, year, round)
//fun(1, row)
//fun(2, row)
