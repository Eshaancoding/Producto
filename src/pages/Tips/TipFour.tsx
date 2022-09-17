import { Tip } from "./Tip";

export const TipFour: React.FC = () => {
    return (
        <Tip 
            Title="Challenge #4"
            list={
                ["Choose any competitive situation that you’re in right now. Who is your opponent? Is it your teacher or coach, your boss, an unruly client? No matter how they’re treating you there is one way to not only earn their respect, but turn the tables. Excellence. That may mean acing an exam, or crafting an ideal proposal, or smashing a sales goal. Whatever it is, I want you to work harder on that project or in that class than you ever have before.",
                "Do everything exactly as they ask, and whatever standard they set as an ideal outcome, you should be aiming to surpass that. If your coach doesn’t give you time in the games, dominate practice. Check the best guy on your squad and show the fuck out. That means putting time in off the field. Watching film so you can study your opponent’s tendencies, memorizing plays, and training in the gym. You need to make that coach pay attention. If it’s your teacher, then start doing work of high quality. Spend extra time on your assignments.",
                "Write papers for her that she didn’t even assign! Come early to class. Ask questions. Pay attention. Show her who you are and want to be. If it’s a boss, work around the clock. Get to work before them. Leave after they go home. Make sure they see that shit, and when it’s time to deliver, surpass their maximum expectations.",
                "Whoever you’re dealing with, your goal is to make them watch you achieve what they could never have done themselves. You want them thinking how amazing you are. Take their negativity and use it to dominate their task with everything you’ve got. Take their motherfucking soul! Afterward, post about it on social and add the hashtag #canthurtme #takingsouls."]
            } 
            prevHref="/TipThree"
            nextHref="/TipFive"
        />
    )
}