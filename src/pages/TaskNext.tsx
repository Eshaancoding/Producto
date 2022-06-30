import ZenMessage from "../helper/ZenMessage";

const TaskNext: React.FC = () => {
  return (
    <ZenMessage 
      title={(<> <strong>Congratulations!</strong> You just finished your task!</>)}
      header={<> Before you go, <strong>Visualize</strong> getting into the next task!</>}
      description={(<>An example can be visualizing how you get up from your chair, plop down on your bed, and just think of the achievments and the things that you have done. Then you visualize just relaxing, with no electronics (no high spike of dopmaine) for 10 minutes. Then, you get stand up, go back to your work desk, and then get ready for the next task. You open up Visual Studio Code, pull up the sophomore research project that you have been working on, and then begin typing some code! </>)}
      minutes={0}
      seconds={30}
      href="/home"
    />

  )
}

export default TaskNext;