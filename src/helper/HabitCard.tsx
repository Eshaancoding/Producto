import {IonCardHeader, IonCardSubtitle, IonCardTitle, IonFab, IonIcon, IonChip, IonCard, IonCardContent, IonBadge, IonFabButton, useIonToast, useIonViewDidEnter} from '@ionic/react';
import { checkmarkOutline, closeOutline, cogOutline, createOutline } from 'ionicons/icons'
import "./HabitCard.css"
import { useHistory } from 'react-router';
import { Storage } from '@ionic/storage';
import { useState } from 'react';
import { hoursToString } from './DateHelper.js'
import { isPlatform } from '@ionic/react';

function HabitCard (props:any) {
  const history = useHistory()
  const store = new Storage() 
  const [habitToast, dismissToast] = useIonToast() 
  store.create()
  
  function chip (value:number, innerText:string) {
    function displayToast () {
      var dateName = ""
      if (innerText === "Mon") dateName = "Monday"
      if (innerText === "Tue") dateName = "Tuesday"
      if (innerText === "Wed") dateName = "Wednesday"
      if (innerText === "Thur") dateName = "Thursday"
      if (innerText === "Fri") dateName = "Friday"
      if (innerText === "Sat") dateName = "Saturday"
      if (innerText === "Sun") dateName = "Sunday"
      habitToast({ 
        cssClass: "toast",
        buttons: [{text: 'Hide', handler: () => dismissToast() }],
          
        message: "You spent " + hoursToString(value, true) + " on " + dateName,
      })
    }

    if (value > 0) {
      return (
        <IonChip color="success" onClick={displayToast}> {innerText} </IonChip>
      )
    } else {
      return (
        <IonChip onClick={displayToast}> {innerText} </IonChip>
      )
    }
  }

  function TimeDisplay (props:any) {
    function indv (time:string) {
      if (time == null) return "null"
      var split:any = time.split(":")
      if (split.length < 2) return "null" 
      var hours:number = parseInt(split[0])
      var minutes:number = parseInt(split[1])
      var AM_PM = "AM"
      var add_zero = ""
      if (hours > 12) {
        AM_PM = "PM"
        hours -= 12
      }
      if (hours === 12) {
        AM_PM = "PM"
      }
      if (minutes < 10) {
        add_zero = "0"
      }
      if (hours === 0) {
        hours = 12 
        AM_PM = "AM"
      }
      return hours.toString() + ":" + add_zero + minutes.toString() + " " + AM_PM
    }

    if (props.startTime == null || props.endTime == null) {
      return (<></>) 
    } else {
      const indvStart = indv(props.startTime)
      const indvEnd = indv(props.endTime)  
      if (indvStart === "null" || indvEnd === "null") return (<></>)
      return (
        <>
          ({indvStart} to {indvEnd})
        </>
      )
    }
  }

  async function edit () {
    await store.set("habitIdEdit", props.habitIndex)
    if (props.isReminder) {
      history.replace("/editReminder")
    }
    else {
      history.replace("/editHabit")
    }
  }

  return (
    <IonCard id="Card" className={(props.didToday ? "didToday" : "")}>
      <IonCardContent>
        <IonCardTitle>{props.habitName} <TimeDisplay startTime={props.startTime} endTime={props.endTime} /> </IonCardTitle>
        <IonCardSubtitle>
          {/* Description */}
          {props.habitDescription !== "" && props.habitDescription != undefined && <> Description: {props.habitDescription} <br /> </>} 
          {/* Interval */}
          {props.intervalRefl != undefined && props.isReminder === false && <>Reflection every <span className='highlight'> {props.intervalRefl} </span> days.</>}  
          {props.lastRefl != undefined && props.isReminder === false && <> Last reflection date: <span className='highlight'> {props.lastRefl.toDateString()}</span>.<br /> </>}
          {/* Reflection */}
          {(props.HabitOften !== "" && props.SessionsProductive !== "" && props.ReflectionFeeling !== "" && props.HabitOften != undefined && props.SessionsProductive != undefined && props.SessionsProductive != undefined && props.isReminder === false) && 
          <> <br /> Last habit reflection:<br /> 
          <span className='highlight'>{props.HabitOften} <br /> {props.SessionsProductive} <br /> {props.ReflectionFeeling}</span> </>}
        </IonCardSubtitle>
        <IonFabButton id="edit" onClick={edit} size={props.isReminder ? "small" : undefined}>
          <IonIcon icon={cogOutline}></IonIcon>  
        </IonFabButton>  
        
        {props.isReminder === false && <>
          <IonFabButton id="check" onClick={() => {props.MarkAsCompleteCallback(props.habitIndex)}}>
            <IonIcon icon={checkmarkOutline}></IonIcon>  
          </IonFabButton>  
          <br />
          {chip(props.monday, "Mon")}
          {chip(props.tuesday, "Tue")}
          {chip(props.wednesday, "Wed")}
          {chip(props.thursday, "Thur")}
          {chip(props.friday, "Fri")}
          {chip(props.saturday, "Sat")}
          {chip(props.sunday, "Sun")}
          <br /><br />
          <IonBadge class="badge hoursSpent"> {hoursToString(props.totalHours)} </IonBadge>
          <IonBadge class="badge sessions"> {props.totalSessions} sessions </IonBadge>
        </>}

        {isPlatform("ios") && <><br /> <br /><br /></>}
      </IonCardContent>
    </IonCard>
  ) 
}

export default HabitCard; 