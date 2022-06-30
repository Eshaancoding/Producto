import ZenMessage from "../helper/ZenMessage";

const WorkSessionEnd: React.FC = () => {
    return (
        <ZenMessage
            title={<><strong>Congratulations</strong> on finishing the session! <br /> </>} 
            header={<><strong>Think</strong> about the work that you have just done. <br /> Be <strong>proud</strong> of the <strong>effort</strong> that you just put!</>}
            description={<>Being proud of your effort, no matter how small, is one of the most important aspects of gaining a <strong>growth mindset.</strong> So you should celebrate your effort! </> }
            minutes={0}
            seconds={30}
            href="/breakBadHabit"
        />
    )
}

export default WorkSessionEnd;
