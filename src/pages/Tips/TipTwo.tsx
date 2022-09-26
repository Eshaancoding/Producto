import { Tip } from "./Tip";

export const TipTwo: React.FC = () => {
    return (
        <Tip 
            Title="Challenge #2"
            list={
                ["David Goggins was at a really low point of his life. He failed all of his studies, but he wanted to in the Air Force. In other words, he had dreams but in his current behavior, he wouldn't get in at all. So, after he got the report card in, he looked in the bathroom mirror and took a good look. He hated what he was seeing in the mirror. He genuinely disliked himself, and all the things that he did. So instead of punching himself, he lectured to himself.",
                "He said things truthfully right to his own face. He said that he stands for nothing, that he is an embarrassment. He said that he is dumb as hell, and that the fact that he has goals is hilarious. He then screamed, \"You don't see people in the military sagging their pants! You need to stop talking like a wanna-be-gangster. None of this shit is gonna cut it! No more taking the easy way out!\" He wrote his goals on Post-Its notes, and tagged them in the mirror. Those Post-its notes included \"Make your bed like you're in the military every day!\", \"Pull up your pants!\", \"Shave your head every morning!\", \"Cut the grass\", etc.",
                "He did not sugarcoat it. He said it loud and clear. Yes, truth hurts. But avoiding them is just going to be lead to your downfall. In truth, you are stopping you. You have to tell the truth about the real reasons for your limitations and you will turn that negativity, which is real, into jet fuel."]
            } 
            prevHref="/TipOne"
            nextHref="/TipThree"
        />
    )
}