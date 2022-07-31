import ZenMessage from "../../helper/ZenMessage";

const AccountabilityMirror: React.FC = () => {
    return (
        <ZenMessage 
            title={<>Accountability Mirror</>}
            header={<>Look into your Accountability Mirror</>}
            description={<>Look into your accountability mirror! Look at yourself, and then look at all the goals that you want to acheve. All of your goals should be posted on your accountability mirror. Also look at your <strong>failures!</strong> What did you do last time that made the attempt unsuccessful? What can you do to make sure the mistake doesn't happen again? <strong>Think</strong> about these questions as you are staring yourself! <br /> <br /> The accountability mirror is basically where you tact post-it notes onto the mirror. On these post it notes, you would write your insecurities, failures, and goals. Do not be <strong>bland</strong> with this assigment! Try to be as <strong>honest</strong> as possible, and this means owning up to the the hard things in life. You have to first <strong>admit</strong> it in order to <strong>improve</strong> it!</>}
            minutes={0}
            seconds={45}
            href="/CookieJar"
        />
    )
}

export default AccountabilityMirror;