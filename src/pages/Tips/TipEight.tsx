import { Tip } from "./Tip";

export const TipEight: React.FC = () => {
    return (
        <Tip 
            Title="Challenge #8"
            list={
                ["Schedule it in! It’s time to compartmentalize your day. Too many of us have become multitaskers, and that’s created a nation of half-asses. This will be a three-week challenge. During week one, go about your normal schedule, but take notes. When do you work? Are you working nonstop or checking your phone (the Moment app will tell you)? How long are your meal breaks? When do you exercise, watch TV, or chat to friends? How long is your commute? Are you driving? I want you to get super detailed and document it all with timestamps.",
                "This will be your baseline, and you’ll find plenty of fat to trim. Most people waste four to five hours on a given day, and if you can learn to identify and utilize it, you’ll be on your way toward increased productivity. In week two, build an optimal schedule. Lock everything into place in fifteen-to thirty-minute blocks. Some tasks will take multiple blocks or entire days. Fine.",
                "When you work, only work on one thing at a time, think about the task in front of you and pursue it relentlessly. When it comes time for the next task on your schedule, place that first one aside, and apply the same focus. Make sure your meal breaks are adequate but not open-ended, and schedule in exercise and rest too. But when it’s time to rest, actually rest. No checking email or bullshitting on social media.",
                "If you are going to work hard you must also rest your brain. Make notes with timestamps in week two. You may still find some residual dead space. By week three, you should have a working schedule that maximizes your effort without sacrificing sleep. Post photos of your schedule, with the hashtags #canthurtme #talentnotrequired."]
            } 
            prevHref="/TipSeven"
            nextHref="/TipNine"
        />
    )
}