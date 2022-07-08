import ZenMessage from "../helper/ZenMessage";

const TaskSpotlight: React.FC = () => {
    return (
        <ZenMessage 
            title={<>Habit Spotlighting</>} 
            header={<>
                Positively <strong>anticipate</strong> the 5 minutes <strong>before</strong> the habit and 5 minutes <strong>after</strong> the habit that you want to do. <br /> 
                Think about <strong>leaning</strong> into the effort.<br /> 
                Think about how you will feel <strong>after</strong> the habit, and also how <strong>hard</strong> it is to get the habit started! <br />
                <strong>Reward</strong> yourself on overcoming the barrier of starting the habit <strong>as you are doing it!</strong>
            </>}
            description={<> 
                This is not self-talk because you are admitting that the <strong>habit is hard!</strong> You are not lying to yourself. You have to say to yourself that although you do not like the habit during execution, you do like it after you have done the good habit. Essentially, you are applying reward prediction error to the entire sequence of things that are involved in getting into the habit, getting through the habit, and getting out of the habit execution.
                <br /> <br />
            </>}
            minutes={0}
            seconds={45}
            href="/work"
        /> 
    )
}

export default TaskSpotlight