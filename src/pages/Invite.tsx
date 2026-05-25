function Invite() {
  const inviteMessage = `
I’m participating in Walk 4 Warriors on September 19, 2026 in Madison, WI.

Join me in raising awareness for Veteran suicide prevention and supporting local organizations helping Veterans in need.

Every step saves lives.

Register here:
https://walk-4-warriors.netlify.app/
`;

  function copyInviteMessage() {
    navigator.clipboard.writeText(inviteMessage);

    alert("Invite message copied!");
  }

  function shareOnFacebook() {
    const url = encodeURIComponent(
      "https://walk-4-warriors.netlify.app/"
    );

    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      "_blank"
    );
  }

  return (
    <div className="invite-page">
      <section className="card invite-hero">
        <h2>Invite Others to Walk</h2>

        <p className="section-intro">
          Help spread awareness and invite others to join the mission.
        </p>
      </section>

      <section className="card">
        <h2>Share the Mission</h2>

        <p className="invite-message-preview">
          “Every step saves lives.”
        </p>

        <div className="invite-buttons">
          <button onClick={shareOnFacebook}>
            Share on Facebook
          </button>

          <button
            onClick={copyInviteMessage}
            className="secondary-button"
          >
            Copy Invite Message
          </button>
        </div>
      </section>

      <section className="card">
        <h2>Invite Message</h2>

        <div className="invite-message-box">
          <p>
            I’m participating in Walk 4 Warriors on September 19, 2026 in
            Madison, WI.
          </p>

          <p>
            Join me in raising awareness for Veteran suicide prevention and
            supporting local organizations helping Veterans in need.
          </p>

          <p>
            <strong>Every step saves lives.</strong>
          </p>

          <p>
            Register here:
            <br />
            https://walk-4-warriors.netlify.app/
          </p>
        </div>
      </section>
    </div>
  );
}

export default Invite;