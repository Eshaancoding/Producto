import ZenMessage from "../../helper/ZenMessage";

const CookieJar: React.FC = () => {
    return (
        <ZenMessage 
            title={<>Cookie Jar</>}
            header={<>Whenever you need a little bit of motivation, remember your latest success and let it fuel you to success!</>}
            description={<>Remember to also include <strong>overcoming</strong> your recent opponents or struggles. Think about <strong>what was the problem</strong> and how did you feel when you <strong>overcomed it!</strong> In times of motivation, this is a great method to gain a lot of motivation! </>}
            minutes={0}
            seconds={30}
            href="/work"
        />
    )
}

export default CookieJar;