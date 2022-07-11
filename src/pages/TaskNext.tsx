import ZenMessage from "../helper/ZenMessage";

const TaskNext: React.FC = () => {
  return (
    <ZenMessage 
      title={(<> <strong>Congratulations!</strong> You just finished your task! </>)}
      header={(<> Think about the habit execution of the next habit! (Remember, this includes 10 minutes before and after the actual habit!)</>)}
      description={<>  
        Going to sleep? Make sure to get a <strong>good night's sleep</strong> because sleep is vitally important for <strong>Neuroplasticity</strong>, which is the ability of the brain to grow and learn. In other words, getting your good habits to stick and bad habits to go away will <strong>not happen</strong> if you don't <strong>sleep well!</strong>
      </>}
      minutes={0}
      seconds={30}
      href="/home"
    />

  )
}

export default TaskNext;