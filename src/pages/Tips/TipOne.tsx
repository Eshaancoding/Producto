import { Tip } from "./Tip";

export const TipOne: React.FC = () => {
    return (
        <Tip 
            Title="Challenge #1"
            list={
                ["My bad cards arrived early and stuck around a while, but everyone gets challenged in life at some point. What was your bad hand? What kind of bullshit did you contend with growing up? Were you beaten? Abused? Bullied? Did you ever feel insecure? Maybe your limiting factor is that you grew up so supported and comfortable, you never pushed yourself? What are the current factors limiting your growth and success? Is someone standing in your way at work or school? Are you underappreciated and overlooked for opportunities? What are the long odds you’re up against right now? Are you standing in your own way?",
                "Break out your journal—if you don’t have one, buy one, or start one on your laptop, tablet, or in the notes app on your smart phone—and write them all out in minute detail. Don’t be bland with this assignment. I showed you every piece of my dirty laundry. If you were hurt or are still in harm’s way, tell the story in full. Give your pain shape. Absorb its power, because you are about to flip that shit.",
                "You will use your story, this list of excuses, these very good reasons why you shouldn’t amount to a damn thing, to fuel your ultimate success. Sounds fun right? Yeah, it won’t be. But don’t worry about that yet. We’ll get there. For now, just take inventory.",
                "Once you have your list, share it with whoever you want. For some, it may mean logging onto social media, posting a picture, and writing out a few lines about how your own past or present circumstances challenge you to the depth of your soul. If that’s you, use the hashtags #badhand #canthurtme. Otherwise, acknowledge and accept it privately. Whatever works for you. I know it’s hard, but this act alone will begin to empower you to overcome."]
            } 
            nextHref="/TipTwo"
        />
    )
}