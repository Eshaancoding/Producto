import ZenMessage from "../helper/ZenMessage";

const UsefulPage: React.FC = () => {
    return (
        <ZenMessage 
            title={<>What is this app <strong>used</strong> for?</>}
            header={<>It's mainly for practicing and developing tools to build and break habits</>}
            description={<>One can fall under the impression that the app is needed to build habits and break habits, and therefore if you try to do these things without the app, then you will not succeed. This is not what the app is about. It's more about telling you and practicing the tools to build and break habits, so then in the future, you could apply habit-breaking or habit-building easily without the need of an electronic app. It's basically trying to develop habit autonomy for not just your regular habit, but also the habit of constantly improving the habits that you are currently doing. That way, you are improving yourself all the time. <br /> <br /> 
            This means that you should use the app to its <strong>fullest potential</strong>; logging down every single habit that you want to improve and doing multiple sessions per day. However, once you have learned <i>the habit of building and breaking habits</i>, you no longer have to use this app anymore and best of all, you gain the ability to do achieve your most ambitious goals with ease.
            </>}
            removeCountdown={true}
        />

    )
}

export default UsefulPage;