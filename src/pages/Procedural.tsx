import ZenMessage from "../helper/ZenMessage" 

const Procedural: React.FC = () => {
    return (
        <ZenMessage 
            title={<> Think about the <strong>specific</strong> steps to <strong>get into</strong> the habit and <strong>execute</strong> the habit </>}
            header={<> You <strong>don't</strong> have to be on a lotus position! You could simply think about the <strong>procedure</strong> without even closing your eyes. </>}
            description={<> Your brain will activate a bunch of neurons associated with the behavior that you are thinking about. This can make the connection between the neurons <strong>stronger</strong>, and therefore make it easier to get into the habit and complete the habit. Remember that the more <strong>specific</strong> the procedure is, the more <strong>likely</strong> that you will do it.
            <br /> <br />
            An example can be getting ready to practice ACT. My procedure to get into the habit and execute the habit is: 
            1. Put my feet on the floor and out of the bed 
            2. Walk over to my desk 
            3. Sit on the chair 
            4. Close all apps on my computer 
            5. Grab the Reading ACT Book 
            6. Place it on the desk 
            7. Get a pencil
            8. Turn to page 23
            9. Read about sentence structure
            10. Try to remember the information by saying it to yourself a few times
            11. etc. 
            </>}
            minutes={0}        
            seconds={30}
            href="/taskSpotlight"
        />
    ) 
}

export default Procedural; 