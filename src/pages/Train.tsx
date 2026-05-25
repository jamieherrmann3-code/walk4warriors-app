import { useState } from "react";

const weeklySteps = [
  "Week 1: Try walking 10–15 minutes up to 3x this week",
  "Week 2: Try walking 15 minutes up to 3x",
  "Week 3: Try walking 20 minutes up to 3x",
  "Week 4: Try walking 25 minutes up to 3x",
  "Week 5: Try walking 30 minutes up to 3x",
  "Week 6: Consider adding one longer walk, around 40 minutes",
  "Week 7: Try a few shorter walks and one longer walk if you feel ready",
  "Week 8: Optional milestone — try a 5K distance",
  "Week 9: Try walking 35 minutes up to 3x",
  "Week 10: Try walking 40 minutes up to 3x",
  "Week 11: Optional — one 5K walk plus one longer walk",
  "Week 12: Try walking 45 minutes up to 3x",
  "Week 13: Optional milestone — try 7–8K",
  "Week 14: Try walking 50 minutes up to 3x",
  "Week 15: Optional milestone — try a 10K training walk",
  "Week 16: Try walking 60 minutes 1–3x",
  "Week 17: Optional longer walk — 10–12K if you feel ready",
  "Week 18: Maintain movement that feels good",
];

function Train() {
  const [checkedWeeks, setCheckedWeeks] = useState<boolean[]>(() =>
    JSON.parse(localStorage.getItem("checkedWeeks") || "[]")
  );

  const [showFullPlan, setShowFullPlan] = useState(false);

  const completedCount = checkedWeeks.filter(Boolean).length;
  const progressPercent = Math.round(
    (completedCount / weeklySteps.length) * 100
  );

  const currentWeekIndex = Math.min(completedCount, weeklySteps.length - 1);

  function toggleWeek(index: number) {
    const updated = [...checkedWeeks];
    updated[index] = !updated[index];

    setCheckedWeeks(updated);
    localStorage.setItem("checkedWeeks", JSON.stringify(updated));
  }

  function resetWeeklyProgress() {
    setCheckedWeeks([]);
    localStorage.removeItem("checkedWeeks");
  }

  return (
    <div className="card">
      <h2>Steps Toward September</h2>

      <p className="section-intro">
        Optional ideas to help you get moving — do what works for you.
      </p>

      <div className="progress-summary">
        <p>
          {completedCount} of {weeklySteps.length} steps checked
        </p>

        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {completedCount === weeklySteps.length && (
        <div className="completion-message">
          <h3>❤️ Thank You for Walking With Us</h3>

          <p>Thanks for preparing with us along the way.</p>

          <p>Whether you completed one step or all 18, every effort matters.</p>

          <p>
            We’ll see you on September 19.
            <br />
            <strong>Every step saves lives.</strong>
          </p>
        </div>
      )}

      <div className="current-week-card">
        <h3>This Week</h3>

        <label>
          <input
            type="checkbox"
            checked={checkedWeeks[currentWeekIndex] || false}
            onChange={() => toggleWeek(currentWeekIndex)}
          />
          <span>{weeklySteps[currentWeekIndex]}</span>
        </label>
      </div>

      <div className="train-buttons">
        <button
          onClick={() => setShowFullPlan(!showFullPlan)}
          className="secondary-button"
        >
          {showFullPlan ? "Hide Full Plan" : "View Full 18-Week Plan"}
        </button>

        <button onClick={resetWeeklyProgress} className="secondary-button">
          Reset Progress
        </button>
      </div>

      {showFullPlan && (
        <div className="challenge-list">
          {weeklySteps.map((week, index) => (
            <div key={index} className="challenge">
              <label>
                <input
                  type="checkbox"
                  checked={checkedWeeks[index] || false}
                  onChange={() => toggleWeek(index)}
                />
                <span>{week}</span>
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Train;