/* ==========================================================================
   NBA Center Court Engine - script.js
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ------------------------------------------------------------------------
  // Feature 1: Theme/Night Mode Toggle (Works on all pages)
  // ------------------------------------------------------------------------
  const themeBtn = document.getElementById('btn-theme-toggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      document.body.classList.toggle('theme-dark');
      if (document.body.classList.contains('theme-dark')) {
        themeBtn.textContent = '☀️ Day Mode';
        alert("Switched to Night Court Theme!");
      } else {
        themeBtn.textContent = '💡 Night Mode';
      }
    });
  }

  // ------------------------------------------------------------------------
  // Feature 2: MINI-GAME 1 - Free Throw Shootout
  // ------------------------------------------------------------------------
  let ftScore = 0;
  let ftShotsLeft = 5;
  let needlePos = 0;
  let needleDir = 1;
  let needleInterval = null;
  let isNeedleActive = false;

  const ftNeedle = document.getElementById('ft-needle');
  const ftBall = document.getElementById('ft-ball');
  const btnShootFt = document.getElementById('btn-shoot-ft');
  const ftScoreEl = document.getElementById('ft-score');
  const ftShotsEl = document.getElementById('ft-shots');

  function startNeedle() {
    if (isNeedleActive || !ftNeedle) return;
    isNeedleActive = true;
    needleInterval = setInterval(() => {
      needlePos += 2.5 * needleDir;
      if (needlePos >= 100) { needlePos = 100; needleDir = -1; }
      else if (needlePos <= 0) { needlePos = 0; needleDir = 1; }
      ftNeedle.style.left = `${needlePos}%`;
    }, 16);
  }

  if (btnShootFt) {
    startNeedle();

    btnShootFt.addEventListener('click', () => {
      if (ftShotsLeft <= 0) {
        resetFreeThrowGame();
        return;
      }

      if (!isNeedleActive) return;

      clearInterval(needleInterval);
      isNeedleActive = false;
      ftShotsLeft--;
      if (ftShotsEl) ftShotsEl.textContent = ftShotsLeft;

      // Target zone is 40% to 60%
      if (needlePos >= 40 && needlePos <= 60) {
        ftScore += 2;
        if (ftScoreEl) ftScoreEl.textContent = ftScore;
        ftBall.style.transform = "translateY(-130px) scale(0.5)";
      } else {
        const xOffset = needlePos < 40 ? "-100px" : "100px";
        ftBall.style.transform = `translate(${xOffset}, -80px) scale(0.5) rotate(45deg)`;
      }

      setTimeout(() => {
        ftBall.style.transform = "none";
        if (ftShotsLeft > 0) {
          startNeedle();
        } else {
          btnShootFt.textContent = "PLAY AGAIN";
          alert(`Game Over! Final Free Throw Score: ${ftScore} Points`);
        }
      }, 1200);
    });
  }

  function resetFreeThrowGame() {
    ftScore = 0;
    ftShotsLeft = 5;
    if (ftScoreEl) ftScoreEl.textContent = ftScore;
    if (ftShotsEl) ftShotsEl.textContent = ftShotsLeft;
    btnShootFt.textContent = "SHOOT FREE THROW";
    startNeedle();
  }

  // ------------------------------------------------------------------------
  // Feature 3: MINI-GAME 2 - 3-Point Rapid Fire Contest
  // ------------------------------------------------------------------------
  let tpScore = 0;
  let tpTimeLeft = 15;
  let tpTimerInterval = null;
  let isTpActive = false;

  const btnStartTp = document.getElementById('btn-start-tp');
  const tpTarget = document.getElementById('tp-target');
  const tpArena = document.getElementById('tp-arena');
  const tpScoreEl = document.getElementById('tp-score');
  const tpTimerEl = document.getElementById('tp-timer');
  const tpMsg = document.getElementById('tp-msg');

  if (btnStartTp) {
    btnStartTp.addEventListener('click', () => {
      if (isTpActive) return;
      startThreePointGame();
    });
  }

  function startThreePointGame() {
    tpScore = 0;
    tpTimeLeft = 15;
    isTpActive = true;

    if (tpScoreEl) tpScoreEl.textContent = tpScore;
    if (tpTimerEl) tpTimerEl.textContent = `${tpTimeLeft}s`;
    if (tpMsg) tpMsg.style.display = 'none';
    if (btnStartTp) btnStartTp.disabled = true;

    moveTpTarget();

    tpTimerInterval = setInterval(() => {
      tpTimeLeft--;
      if (tpTimerEl) tpTimerEl.textContent = `${tpTimeLeft}s`;

      if (tpTimeLeft <= 0) {
        endThreePointGame();
      }
    }, 1000);
  }

  function moveTpTarget() {
    if (!isTpActive || !tpTarget || !tpArena) return;

    const maxX = tpArena.clientWidth - 60;
    const maxY = tpArena.clientHeight - 60;

    const randX = Math.max(10, Math.floor(Math.random() * maxX));
    const randY = Math.max(10, Math.floor(Math.random() * maxY));

    tpTarget.style.left = `${randX}px`;
    tpTarget.style.top = `${randY}px`;
    tpTarget.style.display = 'block';
  }

  if (tpTarget) {
    tpTarget.addEventListener('click', () => {
      if (!isTpActive) return;
      tpScore += 3;
      if (tpScoreEl) tpScoreEl.textContent = tpScore;
      moveTpTarget();
    });
  }

  function endThreePointGame() {
    clearInterval(tpTimerInterval);
    isTpActive = false;

    if (tpTarget) tpTarget.style.display = 'none';
    if (tpMsg) {
      tpMsg.textContent = `TIME'S UP! FINAL 3-POINT SCORE: ${tpScore} PTS`;
      tpMsg.style.display = 'block';
    }
    if (btnStartTp) {
      btnStartTp.disabled = false;
      btnStartTp.textContent = "PLAY AGAIN";
    }
  }

  // ------------------------------------------------------------------------
  // Feature 4: Interactive Player Card Highlight Modal
  // ------------------------------------------------------------------------
  const highlightBtns = document.querySelectorAll('.btn-card-modal');
  highlightBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const playerName = btn.closest('.player-info')?.querySelector('h3')?.textContent || 'Player';
      alert(`⭐ Loading career highlights reel for ${playerName}...`);
    });
  });

});
