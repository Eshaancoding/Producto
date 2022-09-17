import { Tip } from "./Tip";

export const TipTwo: React.FC = () => {
    return (
        <Tip 
            Title="Challenge #2"
            list={
                ["It’s time to come eyeball to eyeball with yourself, and get raw and real. This is not a self-love tactic. You can’t fluff it. Don’t massage your ego. This is about abolishing the ego and taking the first step toward becoming the real you! I tacked Post-It notes on my Accountability Mirror, and I’ll ask you to do the same. Digital devices won’t work. Write all your insecurities, dreams, and goals on Post-Its and tag up your mirror. If you need more education, remind yourself that you need to start working your ass off because you aren’t smart enough! Period, point blank.",
                "If you look in the mirror and see someone who is obviously overweight, that means you’re fucking fat! Own it! It’s okay to be unkind with yourself in these moments because we need thicker skin to improve in life. Whether it’s a career goal (quit my job, start a business), a lifestyle goal (lose weight, get more active), or an athletic one (run my first 5K, 10K, or marathon), you need to be truthful with yourself about where you are and the necessary steps it will take to achieve those goals, day by day.",
                "Each step, each necessary point of self-improvement, should be written as its own note. That means you have to do some research and break it all down. For example, if you are trying to lose forty pounds, your first Post-It may be to lose two pounds in the first week. Once that goal is achieved, remove the note and post the next goal of two to five pounds until your ultimate goal is realized.",
                "Whatever your goal, you’ll need to hold yourself accountable for the small steps it will take to get there. Self-improvement takes dedication and self-discipline. The dirty mirror you see every day is going to reveal the truth. Stop ignoring it. Use it to your advantage. If you feel it, post an image of yourself staring into your tagged-up Accountability Mirror on social media with the hashtags #canthurtme #accountabilitymirror."]
            } 
            prevHref="/TipOne"
            nextHref="/TipThree"
        />
    )
}