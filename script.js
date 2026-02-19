const teamASelect = document.getElementById("teamA");
const teamBSelect = document.getElementById("teamB");

const logoA = document.getElementById("logoA");
const logoB = document.getElementById("logoB");

const teamNameA = document.getElementById("teamNameA");
const teamNameB = document.getElementById("teamNameB");

const resultDiv = document.getElementById("result");

let logoMap = {};
const placeholderLogo = "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg";

function addOption(select, value) {
  const opt = document.createElement("option");
  opt.value = value;
  opt.textContent = value;
  select.appendChild(opt);
}

async function loadTeams() {
  try {
    const res = await fetch("https://www.thesportsdb.com/api/v1/json/3/search_all_teams.php?l=English%20Premier%20League");
    const data = await res.json();

    const teams = data.teams;

    teams.forEach(team => {
      const name = team.strTeam;
      const logo = team.strTeamBadge || placeholderLogo;

      logoMap[name] = logo;

      addOption(teamASelect, name);
      addOption(teamBSelect, name);
    });

  } catch (err) {
    alert("Failed to load teams. Check internet.");
    console.error(err);
  }
}

teamASelect.addEventListener("change", () => {
  const team = teamASelect.value;
  teamNameA.innerText = team;
  logoA.src = logoMap[team] || placeholderLogo;
});

teamBSelect.addEventListener("change", () => {
  const team = teamBSelect.value;
  teamNameB.innerText = team;
  logoB.src = logoMap[team] || placeholderLogo;
});

function predict() {
  const teamA = teamASelect.value;
  const teamB = teamBSelect.value;

  if (!teamA || !teamB) {
    alert("Select both teams");
    return;
  }

  const r = Math.random();

  let result;
  if (r < 0.4) result = `${teamA} will WIN 🏆`;
  else if (r < 0.7) result = `Match will be DRAW 🤝`;
  else result = `${teamB} will WIN 🏆`;

  resultDiv.innerText = result;
}

// Load teams on start
loadTeams();










