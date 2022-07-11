import ZenMessage from "../../helper/ZenMessage";
import React from "react";

const SummingUp : React.FC = () => {
    return (
        <ZenMessage
            title={<>All of those steps IS the habit!</>} 
            header={<>Whenever you think about doing a habit, or whenever you want to reward yourself for doing it, then you should think of not only the execution of the habit itself, but also about the <strong>steps that lead you into</strong> the habit, and also the <strong>feelings</strong> that are associated with the habit after you have done it.</>}
            description={<>That way, you are applying reward prediction error over the entire sequence of events to start the habit. You will learn to not only do the habit execution itself, but also know how to start the habit and what you will feel at the end.</>}
            href="/work"
            minutes={0}
            seconds={30}
        />
    )
}

export default SummingUp