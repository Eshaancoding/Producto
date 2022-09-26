import { Tip } from "./Tip";

export const TipSix: React.FC = () => {
    return (
        <Tip 
            Title="Challenge #6"
            list={
                ["David Goggins decided to run an marathon, for support of Operation Red Wings. The problem is is that he didn't have any prior experience. Yes, he undergone brutal training by becoming a Navy SEAL member, but running an ultra-marathon, was exceedingly hard and requires intense training. It was on mile 70 that he took the blow. He was walking way too slowly, and his legs were covered in dried blood. He though of this the entire time he was running the race. 'Who in this entire worked would still be in this fight? Why do you run this ultra-marathon without even preparing for it?' ", 
                "These are the questions that won't appear when you are in a warm shower or in a blanket. No, this questions will appear when you are in pain. Answer this, continuing to put yourself in pain, and you can be literally unstoppable. But what was David Goggin's answer to his question. Why was he doing this, with little to none training at all? Because he was unstoppable.", 
                "He remembered the great experiences of his past. Passing ASVAB test as a senior and getting into BUD/S. Dropping 100 pounds in under 3 months, conquering his fear of water, graduating BUD/S at the top of his class. All of those were his memories that he greatly cherished, and he used those memories to push through at the pain.",
                "Those weren't mere flashbacks. He was tapping into the emotional state that he felt during those victories, and then accessing his sympathetic nervous system once again to push through the pain. This concept is used whenever you need a reminder of who you are and what you are capable of."]
            } 
            prevHref="/TipFive"
            nextHref="/TipSeven"
        />
    )
}