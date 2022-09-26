import { Tip } from "./Tip";

export const TipSeven: React.FC = () => {
    return (
        <Tip 
            Title="Challenge #7"
            list={
                ["He was running another marathon, in order to compete for the ultimate Badwater Competition. He lost his water bottle, so he had very limited access to water as he went through the course. Even worse, you have to run in the night. One wrong step and his dream of running at the ultimate Badwater Competition, was over. His gas tank was completely empty! He couldn't take one step further.",
                "How do you push yourself when pain is all you feel with every step? What will you do, when each cell of your body is begging you to stop? Well this is what you should do. 'Imagine your human body is like a stock car. We may look different on the outside, but under the hood we all have huge reservoirs of potential and a governor impeding us from reaching our maximum velocity. In a car, the governor limits the flow of fuel and air so it doesn't burn too hot, which places a ceiling on performance. It's a hardware issue; the governor can easily be removed, and if you disable yours, watch your car rocket beyond 130 MPH.' ",
                "The governor knows what we love and hate, but it doesn't have absolute control. The governor can't stop up unless we AGREE with it to quit. Who said that you have to agree? You can disagree! Most of us give up around 40% of maximum effort. That's the governor in action! Once you know that to be true, it's a matter of stretching your pain tolerance, letting go of your identity and all your self-limiting stories, so you can get to that 60, 80 and even 100 percent WITHOUT giving up!",
                "The only way to move beyond your 40 percent is to callous your mind, day after day. Which means you'll have to chase pain like it's your damn job! Over time, you will tolerate the mental and physical suffering because you have learned you could do a lot more than you can!"]
            } 
            prevHref="/TipSix"
            nextHref="/TipEight"
        />
    )
}