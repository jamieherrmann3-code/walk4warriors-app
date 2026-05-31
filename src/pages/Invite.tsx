function Invite() {
  const inviteMessage = `
I’m participating in Walk 4 Warriors on September 19, 2026 in Madison, WI.

Join me in raising awareness of the tragic reality of Veteran suicide and support Veterans in need through donations to local organizations serving our Veteran community.

Every step saves lives.

Register here:
https://w4wvfw1318.redpodium.com/walk-4-warriors
`;

  function copyInviteMessage() {
    navigator.clipboard.writeText(inviteMessage);
    alert("Invite message copied!");
  }

  function shareOnFacebook() {
    const url = encodeURIComponent(
      "https://w4wvfw1318.redpodium.com/walk-4-warriors"
    );

    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      "_blank"
    );
  }

  return (
    <div className="invite-page">
      <div className="page-title">
        <h1>Invite Others to Walk</h1>

        <p className="section-intro">
          Help spread awareness and invite others to join the mission.
        </p>
      </div>

      <section className="card">
        <h2>Share the Mission</h2>

        <p className="invite-message-preview">
          Every step saves lives.
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
            Join me in raising awareness of the tragic reality of Veteran
            suicide and support Veterans in need through donations to local
            organizations serving our Veteran community.
          </p>

          <p>
            <strong>Every step saves lives.</strong>
          </p>

          <p>
  Register here:
  <br />
  <a
    href="https://w4wvfw1318.redpodium.com/walk-4-warriors"
    target="_blank"
    rel="noopener noreferrer"
  >
    Register for Walk 4 Warriors
  </a>
</p>
        </div>
      </section>
    </div>
  );
}

export default Invite;