function save() {
    document.cookie = `kamatomat=${encodeURIComponent(JSON.stringify(players))}; path=/; max-age=31536000`;
}

function getCookie() {
  const match = document.cookie.match(new RegExp('(^| )' + "kamatomat" + '=([^;]+)'));
  return match ? decodeURIComponent(match[2]) : null;
}

function clearData() {
    document.cookie = "kamatomat=; path=/; max-age=0";
    players = [];
    updateTable();
}

const saved = getCookie("kamatomat");
let players = saved ? JSON.parse(saved) : [];

