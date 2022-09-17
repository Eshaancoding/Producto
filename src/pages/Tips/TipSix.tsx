import { Tip } from "./Tip";

export const TipSix: React.FC = () => {
    return (
        <Tip 
            Title="Challenge #6"
            list={
                ["Take inventory of your Cookie Jar. Crack your journal open again. Write it all out. Remember, this is not some breezy stroll through your personal trophy room. Don’t just write down your achievement hit list. Include life obstacles you’ve overcome as well, like quitting smoking or overcoming depression or a stutter. Add in those minor tasks you failed earlier in life, but tried again a second or third time and ultimately succeeded at.",
                "Feel what it was like to overcome those struggles, those opponents, and win. Then get to work. Set ambitious goals before each workout and let those past victories carry you to new personal bests. If it’s a run or bike ride, include some time to do interval work and challenge yourself to beat your best mile split. Or simply maintain a maximum heart rate for a full minute, then two minutes. If you’re at home, focus on pull-ups or push-ups.",
                "Do as many as possible in two minutes. Then try to beat your best. When the pain hits and tries to stop you short of your goal, dunk your fist in, pull out a cookie, and let it fuel you! If you’re more focused on intellectual growth, train yourself to study harder and longer than ever before, or read a record number of books in a given month. Your Cookie Jar can help there too.",
                "Because if you perform this challenge correctly and truly challenge yourself, you’ll come to a point in any exercise where pain, boredom, or self-doubt kicks in, and you’ll need to push back to get through it. The Cookie Jar is your shortcut to taking control of your own thought process. Use it that way!",
                "The point here isn’t to make yourself feel like a hero for the fuck of it. It’s not a hooray-for-me session. It’s to remember what a badass you are so you can use that energy to succeed again in the heat of battle! Post your memories and the new successes they fueled on social media, and include the hashtags: #canthurtme #cookiejar."]
            } 
            prevHref="/TipFive"
            nextHref="/TipSeven"
        />
    )
}