import { Tip } from "./Tip";

export const TipSeven: React.FC = () => {
    return (
        <Tip 
            Title="Challenge #7"
            list={
                ["The main objective here is to slowly start to remove the governor from your brain. First, a quick reminder of how this process works. In 1999, when I weighed 297 pounds, my first run was a quarter mile. Fast forward to 2007, I ran 205 miles in thirty-nine hours, nonstop. I didn’t get there overnight, and I don’t expect you to either. Your job is to push past your normal stopping point.",
                "Whether you are running on a treadmill or doing a set of push-ups, get to the point where you are so tired and in pain that your mind is begging you to stop. Then push just 5 to 10 percent further. If the most push-ups you have ever done is one hundred in a workout, do 105 or 110. If you normally run thirty miles each week, run 10 percent more next week. This gradual ramp-up will help prevent injury and allow your body and mind to slowly adapt to your new workload.",
                "It also resets your baseline, which is important because you’re about to increase your workload another 5 to 10 percent the following week, and the week after that. There is so much pain and suffering involved in physical challenges that it’s the best training to take command of your inner dialogue, and the newfound mental strength and confidence you gain by continuing to push yourself physically will carry over to other aspects in your life.",
                "You will realize that if you were underperforming in your physical challenges, there is a good chance you are underperforming at school and work too. The bottom line is that life is one big mind game. The only person you are playing against is yourself. Stick with this process and soon what you thought was impossible will be something you do every fucking day of your life. I want to hear your stories. Post on social. Hashtags: #canthurtme #The40PercentRule #dontgetcomfortable."]
            } 
            prevHref="/TipSix"
            nextHref="/TipEight"
        />
    )
}