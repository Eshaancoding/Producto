import ZenMessage from "../helper/ZenMessage";

function VisualizeIntroHabit () {
    return (
        <ZenMessage 
            title={(<><strong>Visualize</strong> how you are going get <strong>Into</strong> the habit!</>)} 
            description={(<>An example can be visualizing the exact and specific steps of getting out of your bed, walking to your cupboard, pulling the textbook that you want to read, setting it down to the table and flip to the page that you left off</>)} 
            minutes={0}
            seconds={30}
            href="/taskProcedure"
        /> 
    )
}

export default VisualizeIntroHabit;