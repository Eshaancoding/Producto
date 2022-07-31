import ZenMessage from "../../helper/ZenMessage";

const Failure: React.FC = () => {
    return (
        <ZenMessage 
            title={<>Failure</>} 
            header={<>Think about your session that you have just completed. Did you fail at anything?</>}
            description={<>If you did, that's okay! That's an unavoidable event that happens a lot, and you should learn <strong>how to overcome</strong> it. To do this, first write out all the <strong>good things</strong> that happened during the failure. This time, be <strong>generous</strong> to yourself! Then note on how you reacted <strong>during and after</strong> the failure. Think about if it <strong>affected you, someone else, or your future</strong>. Try to also think about <strong>what happened</strong>. Finally, think about how you can <strong>improve</strong> upon your failure. Be <strong>brutally</strong> honest here and when you are done, schedule your next attempt!</>}
            href="/home"
            minutes={0}
            seconds={45}
        />
    )
}

export default Failure;