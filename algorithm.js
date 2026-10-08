const toCents = (euros) => Math.round(euros * 100);
const fmt = (cents) => (cents / 100).toFixed(2);

function findSubset(losers, target) {
  const n = losers.length;
  for (let mask = (1 << n) - 1; mask > 0; mask--) {
    let sum = 0;
    for (let i = 0; i < n; i++) {
      if ((mask >> i) & 1) sum -= losers[i].net;
    }
    if (sum === target) return losers.filter((_, i) => (mask >> i) & 1);
  }
  return null;
}

// players: [{ name, buyIn, cashOut }] in cents
// returns: [{ from, to, amount }] in cents
function settle(players) {
  const nets = players
    .map((p) => ({ name: p.name, net: p.cashOut - p.buyIn }))
    .filter((p) => p.net !== 0);

  const off = nets.reduce((s, p) => s + p.net, 0);
  if (off !== 0) throw new Error(`Chips don't add up, off by ${fmt(off)}`);

  let losers = nets.filter((p) => p.net < 0);
  let winners = nets.filter((p) => p.net > 0);
  const txs = [];

  const pay = (from, to, amount) => {
    from.net += amount;
    to.net -= amount;
    txs.push({ from: from.name, to: to.name, amount });
  };

  // Phase 1: losers whose debts exactly cover one winner's profit.
  for (const w of [...winners].sort((a, b) => b.net - a.net)) {
    const group = findSubset(losers, w.net);
    if (!group) continue;
    for (const l of group) pay(l, w, -l.net);
    losers = losers.filter((l) => !group.includes(l));
    winners = winners.filter((x) => x !== w);
  }

  // Phase 2: greedy, biggest debt pays biggest profit.
  while (winners.length > 0) {
    losers.sort((a, b) => a.net - b.net);
    winners.sort((a, b) => b.net - a.net);
    const l = losers[0];
    const w = winners[0];
    pay(l, w, Math.min(-l.net, w.net));
    if (w.net === 0) winners.shift();
    if (l.net === 0) losers.shift();
  }

  return txs;
}
