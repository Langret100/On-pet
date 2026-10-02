/*
 * 마이 다마고치(외부 펫 게임) -> 모아루 메신저 랭킹 브리지
 * - 서버/API를 직접 호출하지 않습니다.
 * - 모아루에서 별도 창으로 열렸을 때 opener에 종합 점수만 전달합니다.
 * - 메신저가 기존 '마이다마고치' 랭킹 채널로 기록합니다.
 */
(() => {
  const SAVE_KEY = "mathPetLife.save.v9";
  const GAME_NAME = "마이다마고치";
  const DOMAINS = ["덧셈","뺄셈","곱셈","나눗셈","분수","소수","도형","그래프/자료","비율/비례","혼합계산"];
  const LAST_SENT_KEY = "mathPet.moaruRanking.lastSubmittedScore.v2";
  let lastSent = Number(localStorage.getItem(LAST_SENT_KEY) || 0) || 0;
  let submitLock = false;

  function loadState() {
    try { return JSON.parse(localStorage.getItem(SAVE_KEY) || "null"); }
    catch { return null; }
  }

  function mainPet(state) {
    if (!state || !Array.isArray(state.pets) || !state.pets.length) return null;
    return state.pets.find(p => p && p.id === state.mainPetId) || state.pets[0] || null;
  }

  function number(value) {
    const n = Number(value);
    return Number.isFinite(n) ? n : 0;
  }

  function totalScore(state) {
    const p = mainPet(state);
    if (!p) return 0;
    const vals = [number(p.attack), number(p.defense), number(p.hp) / 2, number(p.agility), number(p.intelligence), number(p.evolution)];
    const avg = vals.reduce((a, b) => a + b, 0) / vals.length;
    const spread = Math.max(...vals) - Math.min(...vals);
    const titles = Array.isArray(p.titles) ? p.titles.length : 0;
    const totalQuestions = number(p.totalQuestions);
    const growth = Math.round(number(p.level) * 12 + avg * 10 + number(p.stage) * 70 + number(p.bond) * 2 + titles * 12 + Math.max(0, 50 - spread * 2) + totalQuestions * 0.15);

    const accuracy = totalQuestions > 0 ? number(p.correct) / totalQuestions : 0;
    const mastery = p.mastery && typeof p.mastery === "object" ? p.mastery : {};
    const breadth = DOMAINS.filter(d => number(mastery[d]?.count) > 0).length;
    const masteryLevels = DOMAINS.reduce((sum, d) => sum + number(mastery[d]?.level), 0);
    const wrongReview = Object.values(mastery).reduce((sum, m) => sum + number(m?.wrongReview), 0);
    const study = Math.round(totalQuestions * 1.2 + accuracy * 180 + number(p.bestStreak) * 5 + breadth * 18 + masteryLevels * 5 + wrongReview * 2);

    const wins = number(p.wins), battles = number(p.battles);
    const battle = Math.round(wins * 22 + number(p.bestWinStreak) * 12 + Math.max(0, wins - (battles - wins)) * 8);
    return Math.max(0, Math.round(growth + study + battle));
  }

  function canReachMessenger() {
    try { return Boolean(window.opener && !window.opener.closed); }
    catch { return false; }
  }

  function submitIfImproved() {
    if (submitLock || !canReachMessenger()) return false;
    const score = totalScore(loadState());
    if (score <= 0 || score <= lastSent) return false;
    submitLock = true;
    try {
      window.opener.postMessage({ type: "GAME_SCORE", gameName: GAME_NAME, score, source: "MATH_PET" }, "*");
      lastSent = score;
      localStorage.setItem(LAST_SENT_KEY, String(score));
      return true;
    } catch {
      return false;
    } finally {
      setTimeout(() => { submitLock = false; }, 500);
    }
  }

  window.MathPetMoaruRanking = { submit: submitIfImproved, score: () => totalScore(loadState()) };

  // 주기 전송 없음. 사용자가 게임을 떠날 때, 실제 최고점이 상승한 경우에만 한 번 전송합니다.
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") submitIfImproved();
  });
  window.addEventListener("pagehide", submitIfImproved);
  window.addEventListener("beforeunload", submitIfImproved);
})();
