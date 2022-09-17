import { Tip } from "./Tip";

export const TipNine: React.FC = () => {
    return (
        <Tip 
            Title="Challenge #9"
            list={
                ["This one’s for the unusual motherfuckers in this world. A lot of people think that once they reach a certain level of status, respect, or success, that they’ve made it in life. I’m here to tell you that you always have to find more. Greatness is not something that if you meet it once it stays with you forever. That shit evaporates like a flash of oil in a hot pan. If you truly want to become uncommon amongst the uncommon, it will require sustaining greatness for a long period of time. It requires staying in constant pursuit and putting out unending effort.",
                "This may sound appealing but will require everything you have to give and then some. Believe me, this is not for everyone because it will demand singular focus and may upset the balance in your life. That’s what it takes to become a true overachiever, and if you are already surrounded by people who are at the top of their game, what are you going to do differently to stand out? It’s easy to stand out amongst everyday people and be a big fish in a small pond. It is a much more difficult task when you are a wolf surrounded by wolves.",
                "This means not only getting into Wharton Business School, but being ranked #1 in your class. It means not just graduating BUD/S, but becoming Enlisted Honor Man in Army Ranger School then going out and finishing Badwater. Torch the complacency you feel gathering around you, your coworkers, and teammates in that rare air. Continue to put obstacles in front of yourself, because that’s where you’ll find the friction that will help you grow even stronger. Before you know it, you will stand alone. #canthurtme #uncommonamongstuncommon."]
            }
            nextHref="/TipTen"
            prevHref="/TipEight"
        />
    )
}