import ZenMessage from "../helper/ZenMessage";

const TaskEnd: React.FC = () => {
    return (
        <ZenMessage 
            title={(<>Finally, <strong>Visualize</strong> how you are going to <strong>Feel</strong> after the habit. </>)}
            description={(<>What are you going to do after the habit is completed? An example can be visualizing the happiness you feel after you have accomplished something, and working towards your new goal and becoming a better self. Imagine the useful benefits that doing this habit <strong>daily</strong> will do to your life, and others around you.</>)}
            minutes={0}
            seconds={30}
            href="/work"
        />
    )
}

export default TaskEnd;