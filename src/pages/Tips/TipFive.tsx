import { Tip } from "./Tip";

export const TipFive: React.FC = () => {
    return (
        <Tip 
            Title="Challenge #5"
            list={
                ["It’s time to visualize! Again, the average person thinks 2,000–3,000 thoughts per hour. Rather than focusing on bullshit you cannot change, imagine visualizing the things you can. Choose any obstacle in your way, or set a new goal, and visualize overcoming or achieving it.",
                "Before I engage in any challenging activity, I start by painting a picture of what my success looks and feels like. I’ll think about it every day and that feeling propels me forward when I’m training, competing, or taking on any task I choose. But visualization isn’t simply about daydreaming of some trophy ceremony— real or metaphorical. You must also visualize the challenges that are likely to arise and determine how you will attack those problems when they do. That way you can be as prepared as possible on the journey. When I show up for a foot race now, I drive the entire course first, visualizing success but also potential challenges, which helps me control my thought process.",
                "You can’t prepare for everything but if you engage in strategic visualization ahead of time, you’ll be as prepared as you possibly can be. That also means being prepared to answer the simple questions. Why are you doing this? What is driving you toward this achievement? Where does the darkness you’re using as fuel come from? What has calloused your mind? You’ll need to have those answers at your fingertips when you hit a wall of pain and doubt.",
                "To push through, you’ll need to channel your darkness, feed off it, and lean on your calloused mind. Remember, visualization will never compensate for work undone. You cannot visualize lies. All the strategies I employ to answer the simple questions and win the mind game are only effective because I put in work.",
                "It’s a lot more than mind over matter. It takes relentless self-discipline to schedule suffering into your day, every day, but if you do, you’ll find that at the other end of that suffering is a whole other life just waiting for you. This challenge doesn’t have to be physical, and victory doesn’t always mean you came in first place. It can mean you’ve finally overcome a lifelong fear or any other obstacle that made you surrender in the past. Whatever it is, tell the world your story about how you created your #armoredmind and where it’s taken you."]
            } 
            prevHref="/TipFour"
            nextHref="/TipSix"
        />
    )
}