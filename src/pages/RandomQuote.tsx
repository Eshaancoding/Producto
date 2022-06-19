const RandomQuote: React.FC = () => {
  let random_num = Math.floor(Math.random() * 6);
  if (random_num == 0) {
    return (
      <p id="Quote">“Productivity isn't about being a workhorse. Keeping busy or burning the midnight oil... It's more about priorities, planning, and fiercely protecting your time." <br /> — Gary Keller</p>
    )
  }
  else if (random_num == 1) {
    return (
      <p id="Quote">“Every action you take is a vote for the person you wish to become.” <br /> — James Clear, Atomic Habits</p>
    )
  }
  else if (random_num == 2) {
    return (
        <p id="Quote">“The best way to predict the future is to create it.” <br /> — Peter Drucker</p>
    )
  }
  else if (random_num == 3) {
    return (
        <p id="Quote">“You have power over your mind — not outside events. Realize this and you will find great strength.” <br /> — Marcus Aurelius</p>
    )
  }
  else if (random_num == 4) {
    return (
        <p id="Quote"> “We suffer more often in imagination than in reality.” <br /> — Seneca </p>       
    )
  }
  else if (random_num == 5) {
    return (
        <p id="Quote"> “It is a shame for a man to grow old without seeing the beauty and strength of which his body is capable”  <br /> - Socrates </p>
    )
  }
  else {
    return (
        <p></p>
    )
  } 
}

export default RandomQuote;