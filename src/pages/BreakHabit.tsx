import ZenMessage from "../helper/ZenMessage"
import { Storage } from "@ionic/storage";
import { useIonViewWillEnter } from "@ionic/react";
import { useState } from "react";

const BreakHabit: React.FC = () => {
  const [badHabit, setBadHabit] = useState("") 
  const store = new Storage() 
  store.create()
  
  // get bad habit 
  async function getBadHabit () {
    const habits:any = await store.get("habits")
    var habitString:string = ""
    habits.map(function(object:any, index:number) {
      if (!object["isBadHabit"]) {
        if (habitString === "") habitString += object["title"]
        else habitString += (", " + object["title"])
      }
    })
    setBadHabit(habitString)
  }
    
  useIonViewWillEnter(getBadHabit)

  return (
    <ZenMessage 
      title={<>Visualize a <strong>good</strong> habit that you are going to do <strong>immediately</strong> after the <strong>bad</strong> habit!</>}
      header={<>Your bad habits are: <strong>{badHabit}</strong> <br /></>}
      description={<>
      This technique is uses a method called <strong>Long-Term Depression</strong>, where neurons that fire at differing times would lead to a weaker connection. So, for every bad habit that you do, try to do a good habit <strong>immediately</strong> after the bad habit so you initiate long-term depression 
      <br /> <br /> 
      This method was introduced by Andrew Huberman in the <a href="https://hubermanlab.com">Huberman Lab</a> podcast. In fact, most of the tips here are inspired by his podcasts, so I highly recommend listening to it!
      </>}
      minutes={0}
      seconds={45}
      href="/break"
    />
  ) 
}

export default BreakHabit;