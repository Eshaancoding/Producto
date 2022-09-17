import { Tip } from "./Tip";

export const TipThree: React.FC = () => {
    return (
        <Tip 
            Title="Challenge #3"
            list={
                ["The first step on the journey toward a calloused mind is stepping outside your comfort zone on a regular basis. Dig out your journal again and write down all the things you don’t like to do or that make you uncomfortable. Especially those things you know are good for you. Now go do one of them, and do it again.",
                "In the coming pages, I’ll be asking you to mirror what you just read to some degree, but there is no need for you to find your own impossible task and achieve it on the fast track. This is not about changing your life instantly, it’s about moving the needle bit by bit and making those changes sustainable. That means digging down to the micro level and doing something that sucks every day. Even if it’s as simple as making your bed, doing the dishes, ironing your clothes, or getting up before dawn and running two miles each day.",
                "Once that becomes comfortable, take it to five, then ten miles. If you already do all those things, find something you aren’t doing. We all have areas in our lives we either ignore or can improve upon. Find yours. We often choose to focus on our strengths rather than our weaknesses. Use this time to make your weaknesses your strengths.",
                "Doing things—even small things—that make you uncomfortable will help make you strong. The more often you get uncomfortable the stronger you’ll become, and soon you’ll develop a more productive, can-do dialogue with yourself in stressful situations. Take a photo or video of yourself in the discomfort zone, post it on social media describing what you’re doing and why, and don’t forget to include the hashtags #discomfortzone #pathofmostresistance #canthurtme #impossibletask."]
            } 
            prevHref="/TipTwo"
            nextHref="/TipFour"
        />
    )
}