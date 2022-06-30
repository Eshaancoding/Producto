import ZenMessage from '../helper/ZenMessage';

const TaskProcedure: React.FC = () => {
    return (
        <ZenMessage 
            title={(<>Next, <strong>Visualize</strong> what you are going to do <strong>During</strong> the Habit</>)}
            description={(<>An example can be visualizing the exact and specific steps of flipping to the page that you left off, reading a paragraph in the textbook, closing your eyes to remember what you just read, then highlighting the information that you think is important, and repeat until the timer on your computer goes off</>)}
            minutes={0}
            seconds={30}
            href="/taskEnd"
        />
    )
}

export default TaskProcedure;