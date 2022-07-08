import ZenMessage from "../helper/ZenMessage";

const TaskNext: React.FC = () => {
  return (
    <ZenMessage 
      title={(<> <strong>Congratulations!</strong> You just finished your task! </>)}
      header={(<> Let's prepare you for the next task!</>)}
      description={<>  
        Positively <strong>anticipate</strong> the 5 minutes <strong>before</strong> the habit and 5 minutes <strong>after</strong> the habit that you want to do.  
        Think about <strong>leaning</strong> into the effort.
        Think about how you will feel <strong>after</strong> the habit, and also how <strong>hard</strong> it is to get the habit started! <strong>Reward</strong> yourself on overcoming the barrier of starting the habit <strong>as you are doing it!</strong> 
        <br /> <br />
        Going to sleep? Make sure to get a <strong>good night's sleep</strong> because sleep is vitally important for <strong>Neuroplasticity</strong>, which is the ability of the brain to grow and learn. In other words, getting your good habits to stick and bad habits to go away will <strong>not happen</strong> if you don't <strong>sleep well!</strong>
      </>}
      minutes={0}
      seconds={30}
      href="/home"
    />

  )
}

export default TaskNext;