import { Tip } from "./Tip";

export const TipFive: React.FC = () => {
    return (
        <Tip 
            Title="Challenge #5"
            list={
                ["Underwater training was still has bad suit. Even worse, was the fact that his instructor was beating his mind down to it. He said that to give up and that he was not worth it as a Navy SEAL. David Goggins knew he wasn't wrong. But, was he really going to give up like that? Even after struggling so hard just to stay afloat in the water? How was he going to face not just the water, but also the negativity around him?", 
                "He did a simple thing: callous his mind. 'Remembering what you've been through and how that has strengthened your mindset can lift you out of the negative brain loop and help you bypass those weak, one-second impulses to give in so you can power through obstacles' This is hard, because we think many thoughts per hour. Trying to control it like this is difficult and it's inevitable that some will slip pass. But that doesn't mean you should give up. This is also why Physical training is the perfect time to manage your thought process when you're working out.",
                "However, he sustained major injuries on his knee, and he couldn't continue. So he went right up to the mirror and said, 'I'm afraid. I'm afraid of going through all of that shit again. I'm afraid of day one, week one.' A normal person would give up! As he dialed a number, he couldn't help but to think that he was put on this earth to suffer. He was tired of trying to callous his mind. Not only that, his girlfriend was pregnant, and he was still $30k in debt.",
                "He found a way. He realized that he has been ignoring all of his demons. He is still afraid of this vivid memories of his father and other people brutalizing him. To develop an armored mind - a mindset so calloused and hard that it becomes bulletproof - you need to go to the source of all your fears and insecurities. It's up to you to go back through your past and make peace with yourself by facing those incidents and all of your negative influences. Because at the end, the worst enemy you can meet will ALWAYS be yourself.",
                "In times of battle, he also used self-talk to get through hard times. For example, he said, 'People have a hard time going through BUD/S healthy, and you're going through it on broken legs! Who else would even think of this' I asked. 'Who else would be able to run even one minute on one broken leg, let alone two? Only Goggins! Each step you run from now until the end will only make you harder! That way, he was visualizing not only the end goal (getting through with BUD/s), but also the obstacles in it (two broken legs). Try to visualize both in order to succeed."]
            } 
            prevHref="/TipFour"
            nextHref="/TipSix"
        />
    )
}