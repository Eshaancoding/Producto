import "./RandomQuote.css"

const RandomQuote: React.FC = () => {
  let random_num = Math.floor(Math.random() * 8);
  if (random_num === 0) {
    return (
      <p id="Quote">“Productivity isn't about being a workhorse. Keeping busy or burning the midnight oil... It's more about <strong>priorities, planning, and fiercely protecting your time.</strong>" <br /> — Gary Keller</p>
    )
  }
  else if (random_num === 1) {
    return (
      <p id="Quote">“<strong>Every</strong> action you take is a <strong>vote</strong> for the person you wish to become.” <br /> — James Clear, Atomic Habits</p>
    )
  }
  else if (random_num === 2) {
    return (
      <p id="Quote">“You have <strong>power over your mind</strong> — not outside events. Realize this and you will find great strength.” <br /> — Marcus Aurelius</p>
    )
  }
  else if (random_num === 3) {
    return (
      <p id="Quote"> “We suffer more often in <strong>imagination</strong> than in <strong>reality.</strong>” <br /> — Seneca </p>       
    )
  }
  else if (random_num === 4) {
    return (
      <p id="Quote"> “It is a shame for a man to grow old without seeing the <strong>beauty and strength of which his body</strong> is capable”  <br /> - Socrates </p>
    )
  }
  else if (random_num === 5) {
    return (
      <p id="Quote"> "The <strong>happiness</strong> of your life depends upon the <strong>quality</strong> of your thoughts" <br /> - Marcus Aurelius </p>
    )
  }
  else if (random_num === 6) {
    return (
      <p id="Quote"> "Wealth consists <strong>not in having great possessions</strong>, but in having <strong>few wants</strong>." <br /> - Epictetus </p>
    )
  }
  else if (random_num === 7) {
    return (
      <p id="Quote"> "Do not indulge in dreams of <strong>having what you have not</strong>, but reckon up the chief of the <strong>blessings you do possess</strong>, and then thankfully remember how you would <strong>crave for them if they were not yours.</strong>" <br /> - Marcus Aurelius  </p>
    )
  }
  else {
    return (
        <p></p>
    )
  } 
}

export default RandomQuote;