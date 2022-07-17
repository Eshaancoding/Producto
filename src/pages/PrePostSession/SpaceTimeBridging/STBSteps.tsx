import ZenMessage from "../../../helper/ZenMessage";

export const STBStepOne = function (props:any) {
    return (
        <ZenMessage 
            title={<>Close your eyes, and breath 3 times slowly</>}
            minutes={0}
            seconds={15}
            href="/STBStepTwo"
        />
    )
}

export const STBStepTwo = function (props:any) {
    return (
        <ZenMessage 
            title={<>Open your eyes and focus on a part of your body <br /> ex: like your hand.</>}
            minutes={0}
            seconds={15}
            href="/STBStepThree"
        />
    )
}

export const STBStepThree = function (props:any) {
    return (
        <ZenMessage 
            title={<>Breath slow and focus on something in your environment <br /> Ex: a point on a wall </>}
            minutes={0}
            seconds={15}
            href="/STBStepFour"
        />
    )
}

export const STBStepFour = function (props:any) {
    return (
        <ZenMessage 
            title={<>Then try to focus on something that is the farthest distance from you <br /> Ex: looking at the horizon.</>}
            minutes={0}
            seconds={15}
            href="/STBStepFive"
        />
    )
}

export const STBStepFive = function (props:any) {
    return (
        <ZenMessage 
            title={<>Close your eyes again and breath slowly 3 times</>}
            minutes={0}
            seconds={15}
            href="/work"
        />
    )
}